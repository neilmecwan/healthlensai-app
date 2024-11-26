import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Reports from './screens/Reports';
import Analytics from './screens/Analytics';
import Alerts from './screens/Alerts';
import Schedule from './screens/Schedule';
import Patients from './screens/Patients';
import Settings from './screens/Settings';
import Admin from './screens/Admin';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route
          path="/*"
          element={
            user ? (
              <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <div className="ml-64 p-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;