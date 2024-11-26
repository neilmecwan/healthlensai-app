import React, { useState } from 'react';
import { Calculator, Eye, EyeOff, Plus, Save, Trash2, Building2, Users } from 'lucide-react';

interface Measure {
  id: string;
  name: string;
  description: string;
  formula: string;
  isVisible: boolean;
  isCustom: boolean;
  category: 'financial' | 'operational' | 'clinical';
  dataElements: string[];
}

const predefinedMeasures: Measure[] = [
  {
    id: '1',
    name: 'Revenue Per Patient (RPP)',
    description: 'Average revenue generated per patient visit',
    formula: '=SUM(Total_Payments)/COUNT(DISTINCT Chart_Number)',
    isVisible: true,
    isCustom: false,
    category: 'financial',
    dataElements: ['Total_Payments', 'Chart_Number']
  },
  {
    id: '2',
    name: 'Average Reimbursement Rate',
    description: 'Percentage of billed charges collected from payers',
    formula: '=(SUM(Insurance_Payments)/SUM(Charges))*100',
    isVisible: true,
    isCustom: false,
    category: 'financial',
    dataElements: ['Insurance_Payments', 'Charges']
  },
  {
    id: '3',
    name: 'Provider Productivity',
    description: 'Number of patients seen per provider',
    formula: '=COUNT(DISTINCT Chart_Number)/COUNT(DISTINCT Servicing_Provider_NPI)',
    isVisible: true,
    isCustom: false,
    category: 'operational',
    dataElements: ['Chart_Number', 'Servicing_Provider_NPI']
  }
];

const MeasureConfig: React.FC = () => {
  const [measures, setMeasures] = useState<Measure[]>(predefinedMeasures);
  const [showNewMeasureForm, setShowNewMeasureForm] = useState(false);
  const [newMeasure, setNewMeasure] = useState<Partial<Measure>>({
    category: 'financial',
    isVisible: true,
    isCustom: true
  });

  const toggleMeasureVisibility = (id: string) => {
    setMeasures(measures.map(measure => 
      measure.id === id ? { ...measure, isVisible: !measure.isVisible } : measure
    ));
  };

  const handleNewMeasureSubmit = () => {
    if (newMeasure.name && newMeasure.formula) {
      setMeasures([...measures, {
        ...newMeasure,
        id: Date.now().toString(),
        isCustom: true,
        isVisible: true,
        dataElements: [], // Would be parsed from formula in real implementation
      } as Measure]);
      setShowNewMeasureForm(false);
      setNewMeasure({ category: 'financial', isVisible: true, isCustom: true });
    }
  };

  const deleteMeasure = (id: string) => {
    setMeasures(measures.filter(measure => measure.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">KPI Measures Configuration</h3>
          <p className="text-sm text-gray-600">Manage and customize dashboard metrics</p>
        </div>
        <button
          onClick={() => setShowNewMeasureForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Custom Measure
        </button>
      </div>

      {showNewMeasureForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h4 className="font-medium mb-4">New Custom Measure</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Measure Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={newMeasure.name || ''}
                onChange={e => setNewMeasure({ ...newMeasure, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={newMeasure.description || ''}
                onChange={e => setNewMeasure({ ...newMeasure, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Formula (Excel Format)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg font-mono"
                placeholder="=SUM(field1)/COUNT(field2)"
                value={newMeasure.formula || ''}
                onChange={e => setNewMeasure({ ...newMeasure, formula: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newMeasure.category}
                onChange={e => setNewMeasure({ ...newMeasure, category: e.target.value as any })}
              >
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="clinical">Clinical</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewMeasureForm(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNewMeasureSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Measure
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-medium">Available Measures</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {measures.map((measure) => (
            <div key={measure.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{measure.name}</h5>
                      {measure.isCustom && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{measure.description}</p>
                    <p className="text-sm text-gray-500 font-mono mt-1">{measure.formula}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMeasureVisibility(measure.id)}
                    className={`p-2 rounded-lg ${
                      measure.isVisible
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {measure.isVisible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  {measure.isCustom && (
                    <button
                      onClick={() => deleteMeasure(measure.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium">Mapped Clinics</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Automatically mapped from Facility Name in imported data
          </p>
          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded-lg text-sm">Memorial Hospital</div>
            <div className="p-2 bg-gray-50 rounded-lg text-sm">City Medical Center</div>
            <div className="p-2 bg-gray-50 rounded-lg text-sm">Valley Clinic</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium">Mapped Physicians</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Automatically mapped from Service Provider in imported data
          </p>
          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded-lg text-sm">Dr. John Smith</div>
            <div className="p-2 bg-gray-50 rounded-lg text-sm">Dr. Sarah Johnson</div>
            <div className="p-2 bg-gray-50 rounded-lg text-sm">Dr. Michael Chen</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasureConfig;