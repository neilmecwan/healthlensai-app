import React, { useState } from 'react';
import { Upload, Download, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useDataImport } from '../hooks/useDataImport';

interface FileUpload {
  id: string;
  name: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  records: number;
  updates: number;
  error?: string;
}

const DataImport: React.FC = () => {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const { importData, importing, progress } = useDataImport();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const upload: FileUpload = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toLocaleString(),
      status: 'processing',
      records: 0,
      updates: 0
    };

    setUploads([upload, ...uploads]);

    try {
      const result = await importData(file);
      
      setUploads(prevUploads => 
        prevUploads.map(u => 
          u.id === upload.id
            ? {
                ...u,
                status: result.errors.length ? 'error' : 'completed',
                records: result.records,
                updates: result.updates,
                error: result.errors.join(', ')
              }
            : u
        )
      );
    } catch (error) {
      setUploads(prevUploads =>
        prevUploads.map(u =>
          u.id === upload.id
            ? {
                ...u,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
              }
            : u
        )
      );
    }
  };

  const downloadTemplate = () => {
    const fields = [
      'organization_id',
      'physician_id',
      'clinic_id',
      'patient_id',
      'encounter_id',
      'date_of_service',
      'cpt_code',
      'icd10_codes',
      'charges',
      'payments',
      'adjustments'
    ].join(',');

    const blob = new Blob([fields], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteUpload = (id: string) => {
    setUploads(uploads.filter(upload => upload.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Data Import</h3>
          <p className="text-sm text-gray-600">
            Upload CSV files to import or update billing data
          </p>
        </div>
        <button
          onClick={downloadTemplate}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose File
            </span>
            <input
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={importing}
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Drop your CSV file here or click to browse
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-medium">Recent Uploads</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {uploads.map((upload) => (
            <div key={upload.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {upload.status === 'processing' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  ) : upload.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <h5 className="font-medium">{upload.name}</h5>
                    <p className="text-sm text-gray-500">
                      Uploaded on {upload.uploadDate}
                    </p>
                    {upload.error && (
                      <p className="text-sm text-red-600 mt-1">{upload.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    {upload.status === 'processing' ? (
                      <p className="text-sm font-medium">{Math.round(progress)}% complete</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium">
                          {upload.records} records
                        </p>
                        {upload.updates > 0 && (
                          <p className="text-sm text-gray-500">
                            {upload.updates} updates
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        upload.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : upload.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                    </span>
                    <button
                      onClick={() => deleteUpload(upload.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataImport;