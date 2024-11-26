import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';

const alerts = [
  {
    type: 'warning',
    message: 'Unusual spike in patient wait times detected',
    time: '2 hours ago'
  },
  {
    type: 'info',
    message: 'Monthly revenue report is ready for review',
    time: '5 hours ago'
  },
  {
    type: 'success',
    message: 'AI analysis suggests 15% improvement in scheduling efficiency',
    time: '1 day ago'
  }
];

const AlertsPanel = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                alert.type === 'warning'
                  ? 'bg-yellow-400'
                  : alert.type === 'info'
                  ? 'bg-blue-400'
                  : 'bg-green-400'
              }`}
            />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{alert.message}</p>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;