import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Filter } from 'lucide-react';
import MetricsCard from '../components/MetricsCard';

const performanceData = [
  { name: 'Cardiology', revenue: 45000, patients: 120, rpp: 375 },
  { name: 'Pediatrics', revenue: 35000, patients: 180, rpp: 194 },
  { name: 'Orthopedics', revenue: 52000, patients: 90, rpp: 578 },
  { name: 'Neurology', revenue: 38000, patients: 75, rpp: 507 },
  { name: 'Dermatology', revenue: 28000, patients: 150, rpp: 187 }
];

const reimbursementTrend = [
  { month: 'Jan', rate: 82 },
  { month: 'Feb', rate: 85 },
  { month: 'Mar', rate: 87 },
  { month: 'Apr', rate: 89 },
  { month: 'May', rate: 91 },
  { month: 'Jun', rate: 92 }
];

const operationalMetrics = {
  title: "Operational Metrics",
  metrics: [
    { label: "Average Wait Time", value: "18 mins", change: "↓ 12%", status: "positive" },
    { label: "Patient Satisfaction", value: "4.8/5", change: "↑ 0.3", status: "positive" },
    { label: "Staff Utilization", value: "87%", change: "↑ 5%", status: "positive" },
    { label: "No-Show Rate", value: "8%", change: "↓ 2%", status: "positive" }
  ]
};

const financialMetrics = {
  title: "Financial Performance",
  metrics: [
    { label: "Revenue per Patient", value: "$368", change: "↑ 8%", status: "positive" },
    { label: "Avg Reimbursement Rate", value: "92%", change: "↑ 3%", status: "positive" },
    { label: "Provider Productivity", value: "$52,450", change: "↑ 5%", status: "positive" },
    { label: "Collection Efficiency", value: "95%", change: "↑ 2%", status: "positive" }
  ]
};

const productivityMetrics = {
  title: "Provider Productivity",
  metrics: [
    { label: "Patients per Provider", value: "185", change: "↑ 4%", status: "positive" },
    { label: "Revenue per Provider", value: "$68,200", change: "↑ 6%", status: "positive" },
    { label: "Visits per Hour", value: "3.2", change: "↑ 0.3", status: "positive" },
    { label: "Utilization Rate", value: "89%", change: "↑ 3%", status: "positive" }
  ]
};

const Analytics = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Financial and Operational Performance Metrics</p>
      </header>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <MetricsCard {...operationalMetrics} />
        <MetricsCard {...financialMetrics} />
        <MetricsCard {...productivityMetrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Revenue Per Patient by Department</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="rpp" fill="#2563eb" name="Revenue per Patient ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Reimbursement Rate Trend</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reimbursementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Reimbursement Rate (%)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">AI Financial Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Revenue Optimization</h4>
            <p className="text-sm text-blue-800 mt-1">
              Orthopedics shows highest RPP ($578). Consider expanding services or
              reallocating resources to this department.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900">Reimbursement Improvement</h4>
            <p className="text-sm text-green-800 mt-1">
              Consistent upward trend in reimbursement rate (82% → 92%).
              Current practices are effective and should be maintained.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900">Provider Efficiency</h4>
            <p className="text-sm text-purple-800 mt-1">
              Provider productivity up 5%. Implementing suggested scheduling
              optimizations could further increase this by 8-10%.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;