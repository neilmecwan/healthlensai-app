import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  Settings, 
  Users, 
  Calendar,
  LogOut,
  Eye,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: AlertCircle, label: 'Alerts', path: '/alerts' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Shield, label: 'Admin', path: '/admin' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      <div className="flex items-center gap-2 p-6 border-b cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <div className="font-semibold text-gray-800">
          HealthLens
          <span className="text-xs align-super ml-0.5">AI</span>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;