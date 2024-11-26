import React, { useState } from 'react';
import { CreditCard, DollarSign, FileText, Calendar, Building2, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { format } from 'date-fns';
import BAA from './BAA';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

interface PaymentMethod {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const BillingManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [showAddCard, setShowAddCard] = useState(false);
  const [showBAA, setShowBAA] = useState(false);
  const [baaCompleted, setBAACompleted] = useState(false);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card_1',
      last4: '4242',
      brand: 'visa',
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv_1',
      date: '2024-03-01',
      amount: 299,
      status: 'paid',
      paidDate: '2024-03-05'
    },
    {
      id: 'inv_2',
      date: '2024-02-01',
      amount: 299,
      status: 'paid',
      paidDate: '2024-02-05'
    }
  ]);

  const handleBAAProceed = () => {
    setBAACompleted(true);
    setShowBAA(false);
  };

  const setDefaultCard = (cardId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === cardId
      }))
    );
  };

  return (
    <div className="space-y-8">
      {!baaCompleted && (
        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">BAA Required</h4>
              <p className="text-sm text-yellow-800 mt-1">
                A Business Associate Agreement must be signed before processing any PHI data.
              </p>
              <button
                onClick={() => setShowBAA(true)}
                className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Review and Sign BAA
              </button>
            </div>
          </div>
        </div>
      )}

      {showBAA ? (
        <BAA onComplete={handleBAAProceed} />
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Subscription Plan</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-4 rounded-lg border-2 ${
                    selectedPlan === 'monthly'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="font-semibold text-lg">$299/month</div>
                  <p className="text-gray-600 text-sm">Monthly billing</p>
                </button>
                <button
                  onClick={() => setSelectedPlan('annual')}
                  className={`p-4 rounded-lg border-2 ${
                    selectedPlan === 'annual'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="font-semibold text-lg">$2,989/year</div>
                  <p className="text-gray-600 text-sm">Annual billing (1 month free)</p>
                </button>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Plan Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Unlimited users per organization
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Full access to all analytics features
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    AI-powered insights and recommendations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <CreditCard className="w-4 h-4" />
                  Add Payment Method
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">
                            {method.brand}
                          </span>
                          <span className="text-gray-600">
                            ending in {method.last4}
                          </span>
                          {method.isDefault && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Expires {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                    </div>
                    {!method.isDefault && (
                      <button
                        onClick={() => setDefaultCard(method.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Make Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Billing History</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            Invoice #{invoice.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : invoice.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {format(new Date(invoice.date), 'MMMM d, yyyy')}
                          {invoice.paidDate && ` • Paid on ${format(new Date(invoice.paidDate), 'MMMM d, yyyy')}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${invoice.amount}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BillingManagement;