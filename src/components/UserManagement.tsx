import React, { useState } from 'react';
import { UserPlus, Users, Building2, Shield, Edit, Trash2, Check, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'provider' | 'staff';
  status: 'active' | 'inactive';
  organization: string;
  features: string[];
}

interface Organization {
  id: string;
  name: string;
  taxId: string;
  address: string;
  status: 'active' | 'inactive';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. John Smith',
      email: 'john.smith@example.com',
      role: 'admin',
      status: 'active',
      organization: 'Memorial Hospital',
      features: ['analytics', 'reports', 'billing']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'provider',
      status: 'active',
      organization: 'Memorial Hospital',
      features: ['analytics', 'reports']
    }
  ]);

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Memorial Hospital',
      taxId: '12-3456789',
      address: '123 Medical Center Dr, City, State 12345',
      status: 'active'
    }
  ]);

  const [showNewUser, setShowNewUser] = useState(false);
  const [showNewOrg, setShowNewOrg] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">User Management</h3>
          <p className="text-sm text-gray-600">Manage users and access control</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewOrg(true)}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Add Organization
          </button>
          <button
            onClick={() => setShowNewUser(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-medium">Organizations</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {organizations.map((org) => (
            <div key={org.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{org.name}</h5>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        org.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {org.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Tax ID: {org.taxId}</p>
                    <p className="text-sm text-gray-500">{org.address}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-medium">Users</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {users.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{user.name}</h5>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs capitalize">
                        {user.role}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{user.organization}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`p-2 rounded-lg ${
                      user.status === 'active'
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {user.status === 'active' ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingUser(user.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <h6 className="text-sm font-medium text-gray-700 mb-1">Feature Access</h6>
                <div className="flex gap-2">
                  {user.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs capitalize"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium">Access Control</h4>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Role Permissions</h5>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Admin</div>
                  <p className="text-sm text-gray-600">
                    Full access to all features and settings
                  </p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Provider</div>
                  <p className="text-sm text-gray-600">
                    Access to analytics, reports, and patient data
                  </p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Staff</div>
                  <p className="text-sm text-gray-600">
                    Limited access to basic features
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">Feature Access</h5>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Analytics</div>
                  <p className="text-sm text-gray-600">
                    Access to performance metrics and insights
                  </p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Reports</div>
                  <p className="text-sm text-gray-600">
                    Generate and view financial reports
                  </p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium">Billing</div>
                  <p className="text-sm text-gray-600">
                    Manage invoices and payment settings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;