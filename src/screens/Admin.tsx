import React, { useState } from 'react';
import { Settings, Users, Building2, Database, CreditCard } from 'lucide-react';
import DataImport from '../components/DataImport';
import MeasureConfig from '../components/MeasureConfig';
import UserManagement from '../components/UserManagement';
import BillingManagement from '../components/BillingManagement';

type TabType = 'users' | 'clinics' | 'physicians' | 'data-config' | 'data-import' | 'billing';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'data-import':
        return <DataImport />;
      case 'data-config':
        return <MeasureConfig />;
      case 'billing':
        return <BillingManagement />;
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Manage clinics, physicians, and system configuration</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users & Access
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'clinics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('clinics')}
            >
              Clinics
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'physicians'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('physicians')}
            >
              Physicians
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'data-config'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('data-config')}
            >
              Measures & CPT Codes
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'data-import'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('data-import')}
            >
              Data Import
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === 'billing'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              Billing & Licensing
            </button>
          </div>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default Admin;