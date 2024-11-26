import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const reports = [
  {
    title: 'Monthly Financial Summary',
    date: '2024-03-01',
    type: 'Financial',
    status: 'Ready'
  },
  {
    title: 'Patient Satisfaction Survey',
    date: '2024-02-28',
    type: 'Patient Care',
    status: 'Processing'
  },
  {
    title: 'Staff Performance Analysis',
    date: '2024-02-25',
    type: 'Operations',
    status: 'Ready'
  },
  {
    title: 'Insurance Claims Report',
    date: '2024-02-20',
    type: 'Financial',
    status: 'Ready'
  }
];

const Reports = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Access and generate clinic reports</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
              <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-4 font-semibold text-gray-600">Report Name</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Type</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right pb-4 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{report.title}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{report.date}</td>
                    <td className="py-4 text-gray-600">{report.type}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'Ready' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 ml-auto ${
                          report.status === 'Ready'
                            ? 'text-blue-600 hover:bg-blue-50'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={report.status !== 'Ready'}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;