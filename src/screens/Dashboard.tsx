import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import Chart from '../components/Chart';
import AlertsPanel from '../components/AlertsPanel';
import DashboardFilters from '../components/DashboardFilters';
import { Users, DollarSign, Clock, Activity, TrendingUp, Stethoscope } from 'lucide-react';
import { useMetrics, useServiceLineMetrics, useReimbursementTrend } from '../hooks/useMetrics';

const Dashboard = () => {
  const [filters, setFilters] = useState({});
  
  const { metrics, loading: metricsLoading } = useMetrics(filters);
  const { data: serviceLineData, loading: serviceLineLoading } = useServiceLineMetrics(filters);
  const { data: reimbursementData, loading: reimbursementLoading } = useReimbursementTrend(filters);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (metricsLoading || serviceLineLoading || reimbursementLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Showing data for last month vs. 12-month average
        </p>
      </header>

      <DashboardFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="xl:col-span-2">
          <KPICard
            title="Total Patients"
            value={metrics.patientVisits.toString()}
            change={8.2}
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Monthly Revenue"
            value={`$${metrics.totalRevenue.toLocaleString()}`}
            change={12.5}
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Revenue Per Patient"
            value={`$${metrics.revenuePerPatient.toFixed(0)}`}
            change={4.2}
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Avg. Wait Time"
            value="14 mins"
            change={-5.3}
            icon={<Clock className="w-6 h-6 text-blue-600" />}
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Collection Efficiency"
            value={`${metrics.collectionEfficiency.toFixed(1)}%`}
            change={2.1}
            icon={<Activity className="w-6 h-6 text-blue-600" />}
          />
        </div>
        <div className="xl:col-span-2">
          <KPICard
            title="Provider Productivity"
            value={metrics.providerProductivity.toFixed(1)}
            change={3.8}
            icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart data={reimbursementData} title="Reimbursement Rate Trend" />
        <Chart data={serviceLineData.map(d => ({ name: d.name, value: d.revenue }))} title="Revenue by Service Line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Service Line Performance</h3>
            <div className="space-y-4">
              {serviceLineData.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{service.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ 
                          width: `${(service.revenue / Math.max(...serviceLineData.map(d => d.revenue))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="font-medium min-w-[100px] text-right">
                      ${service.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlertsPanel />
      </div>
    </>
  );
};

export default Dashboard;