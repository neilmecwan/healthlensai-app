import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus, Search } from 'lucide-react';

const appointments = [
  {
    id: 1,
    patient: 'Sarah Johnson',
    type: 'Check-up',
    time: '09:00 AM',
    duration: '30 min',
    status: 'Confirmed'
  },
  {
    id: 2,
    patient: 'Michael Chen',
    type: 'Follow-up',
    time: '10:00 AM',
    duration: '45 min',
    status: 'In Progress'
  },
  {
    id: 3,
    patient: 'Emily Davis',
    type: 'Consultation',
    time: '11:30 AM',
    duration: '60 min',
    status: 'Scheduled'
  }
];

const Schedule = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600">Manage appointments and consultations</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Appointment
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-700 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <CalendarIcon className="w-4 h-4" />
                Today
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.patient}
                      </h3>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{appointment.time}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {appointment.duration}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;