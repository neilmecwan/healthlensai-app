import React from 'react';

interface MetricsCardProps {
  title: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
    status?: 'positive' | 'negative' | 'neutral';
  }[];
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, metrics }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-baseline">
            <span className="text-gray-600 text-sm">{metric.label}</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900">{metric.value}</span>
              {metric.change && (
                <span className={`ml-2 text-sm ${
                  metric.status === 'positive' ? 'text-green-600' :
                  metric.status === 'negative' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {metric.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCard;