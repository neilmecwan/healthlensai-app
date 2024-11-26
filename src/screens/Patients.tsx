import React from 'react';
import { Search, Plus, Filter, UserCircle } from 'lucide-react';

const patients = [
  {
    id: 1,
    name: 'Robert Wilson',
    age: 45,
    lastVisit: '2024-03-01',
    condition: 'Hypertension',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Lisa Anderson',
    age: 32,
    lastVisit: '2024-02-28',
    condition: 'Diabetes Type 2',
    status: 'Follow-up'
  },
  {
    id: 3,
    name: 'James Martinez',
    age: 28,
    lastVisit: '2024-02-25',
    condition: 'Asthma',
    status: 'Active'
  }
];

const Patients = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600">Manage patient records and information</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Patient
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
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
                  <th className="text-left pb-4 font-semibold text-gray-600">Patient</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Age</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Last Visit</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Condition</th>
                  <th className="text-left pb-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-gray-400" />
                        <span className="font-medium text-gray-900">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{patient.age}</td>
                    <td className="py-4 text-gray-600">{patient.lastVisit}</td>
                    <td className="py-4 text-gray-600">{patient.condition}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status}
                      </span>
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

export default Patients;