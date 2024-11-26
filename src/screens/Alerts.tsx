import React from 'react';
import { Bell, Filter, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Wait Time Alert',
    message: 'Current wait time exceeds 30 minutes in General Practice',
    timestamp: '2 hours ago',
    priority: 'High'
  },
  {
    id: 2,
    type: 'success',
    title: 'AI Insight Generated',
    message: 'New efficiency recommendations available for review',
    timestamp: '3 hours ago',
    priority: 'Medium'
  },
  {
    id: 3,
    type: 'info',
    title: 'System Update',
    message: 'New features available for patient scheduling system',
    timestamp: '5 hours ago',
    priority: 'Low'
  }
];

const Alerts = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-600">System notifications and important updates</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Bell className="w-4 h-4" />
                Mark All as Read
              </button>
              <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {alert.type === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  {alert.type === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {alert.type === 'info' && (
                    <Info className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : alert.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{alert.message}</p>
                  <span className="text-sm text-gray-500 mt-2 block">
                    {alert.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Alerts;