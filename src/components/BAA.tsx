import React, { useState } from 'react';
import { FileText, CheckSquare, AlertTriangle, Download } from 'lucide-react';

interface BAA {
  id: string;
  organizationId: string;
  signedBy: string;
  signedDate: string;
  ipAddress: string;
  status: 'active' | 'terminated';
  version: string;
}

const BAA: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [title, setTitle] = useState('');

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (signature && title && agreed) {
      // In real implementation, this would:
      // 1. Store BAA with signature, timestamp, IP address
      // 2. Generate PDF copy
      // 3. Send email confirmations
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-900">HIPAA Compliance Required</h4>
          <p className="text-sm text-blue-800 mt-1">
            As a healthcare service provider, we must execute a Business Associate
            Agreement (BAA) before processing any PHI data.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Business Associate Agreement</h3>
              <p className="text-sm text-gray-600">Version 2.0 - March 2024</p>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            <h4>1. Definitions</h4>
            <p>
              1.1. "Business Associate" shall mean HealthLens AI.
              <br />
              1.2. "Covered Entity" shall mean the Healthcare Provider.
              <br />
              1.3. "PHI" shall mean Protected Health Information.
            </p>

            <h4>2. Obligations and Activities of Business Associate</h4>
            <p>
              2.1. Business Associate agrees to not use or disclose PHI other than
              as permitted or required by this Agreement or as Required by Law.
              <br />
              2.2. Business Associate agrees to use appropriate safeguards to prevent
              use or disclosure of PHI other than as provided for by this Agreement.
              <br />
              2.3. Business Associate agrees to report to Covered Entity any use or
              disclosure of PHI not provided for by this Agreement.
            </p>

            <h4>3. Security Requirements</h4>
            <p>
              3.1. Business Associate shall implement administrative, physical, and
              technical safeguards that reasonably and appropriately protect the
              confidentiality, integrity, and availability of PHI.
              <br />
              3.2. Business Associate shall ensure that any agent or subcontractor
              agrees to the same restrictions and conditions that apply to the
              Business Associate.
            </p>

            <h4>4. Term and Termination</h4>
            <p>
              4.1. This Agreement shall be effective as of the date of signature
              and shall terminate when all PHI is destroyed or returned to Covered
              Entity.
              <br />
              4.2. Upon termination, Business Associate shall return or destroy all
              PHI received from Covered Entity.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name (Electronic Signature)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your full legal name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., CEO, Medical Director"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded text-blue-600"
                />
              </div>
              <span className="text-sm text-gray-600">
                I acknowledge that I have read and understand this Business
                Associate Agreement. I certify that I am authorized to sign this
                agreement on behalf of my organization. By checking this box and
                clicking "Sign Agreement", I am electronically signing this legally
                binding document.
              </span>
            </label>

            <div className="flex justify-end">
              <button
                onClick={handleSign}
                disabled={!agreed || !signature || !title}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  agreed && signature && title
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Sign Agreement
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">What happens next?</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <span>BAA is electronically signed and timestamped</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <span>PDF copy is generated and emailed to both parties</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <span>BAA is stored securely in your account</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              4
            </div>
            <span>You can proceed with account setup</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BAA;