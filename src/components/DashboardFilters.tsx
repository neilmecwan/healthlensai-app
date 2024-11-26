import React, { useEffect, useState } from 'react';
import { Filter, Calendar, Building2, Users, Layers } from 'lucide-react';
import { usePhysicians, useClinics } from '../hooks/useSupabase';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const DashboardFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedPhysician, setSelectedPhysician] = useState('all');
  const [selectedClinic, setSelectedClinic] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('last-month');

  const { physicians, loading: loadingPhysicians } = usePhysicians();
  const { clinics, loading: loadingClinics } = useClinics();

  useEffect(() => {
    const filters: any = {};
    
    if (selectedPhysician !== 'all') {
      filters.physicianId = selectedPhysician;
    }
    if (selectedClinic !== 'all') {
      filters.clinicId = selectedClinic;
    }
    
    // Calculate date range
    const now = new Date();
    switch (selectedDateRange) {
      case 'last-month':
        filters.startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
        filters.endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
        break;
      case 'last-quarter':
        filters.startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString().split('T')[0];
        filters.endDate = new Date().toISOString().split('T')[0];
        break;
      case 'last-year':
        filters.startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1).toISOString().split('T')[0];
        filters.endDate = new Date().toISOString().split('T')[0];
        break;
    }

    onFilterChange(filters);
  }, [selectedPhysician, selectedClinic, selectedDepartment, selectedDateRange]);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="relative">
        <select 
          className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          value={selectedPhysician}
          onChange={(e) => setSelectedPhysician(e.target.value)}
        >
          <option value="all">All Physicians</option>
          {!loadingPhysicians && physicians?.map((physician) => (
            <option key={physician.id} value={physician.id}>
              {physician.name}
            </option>
          ))}
        </select>
        <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <div className="relative">
        <select 
          className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          value={selectedClinic}
          onChange={(e) => setSelectedClinic(e.target.value)}
        >
          <option value="all">All Clinics</option>
          {!loadingClinics && clinics?.map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
        <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <div className="relative">
        <select 
          className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          <option value="cardiology">Cardiology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="pediatrics">Pediatrics</option>
        </select>
        <Layers className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <div className="relative">
        <select 
          className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
        >
          <option value="last-month">Last Month</option>
          <option value="last-quarter">Last Quarter</option>
          <option value="last-year">Last Year</option>
          <option value="custom">Custom Range</option>
        </select>
        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
        <Filter className="w-4 h-4" />
        More Filters
      </button>
    </div>
  );
};

export default DashboardFilters;