import React, { useState } from 'react';

export default function DocumentGenerator() {
  const [docType, setDocType] = useState('nda');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    partyA: '',
    partyB: '',
    purpose: '',
    duration: '12',
    businessName: '',
    capital: '',
    splitA: '50',
    splitB: '50',
    role: '',
    salary: '',
    startDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
      
      {/* Non-printable Controls Section */}
      <div className="print:hidden mb-8 space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">Legal Document Generator</h1>
          <p className="text-gray-600">Fill in the details below to generate a printable, professional legal agreement.</p>
        </div>

        <div className="glass-card p-6 bg-white">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type</label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full md:w-1/3 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            >
              <option value="nda">Non-Disclosure Agreement (NDA)</option>
              <option value="partnership">Partnership Agreement</option>
              <option value="hiring">Hiring / Employment Contract</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Agreement</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>

            {docType === 'nda' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Disclosing Party (Party A)</label>
                  <input type="text" name="partyA" placeholder="e.g. John Doe Farms" value={formData.partyA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Receiving Party (Party B)</label>
                  <input type="text" name="partyB" placeholder="e.g. Jane Smith Investments" value={formData.partyB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Purpose of Disclosure</label>
                  <textarea name="purpose" rows="2" placeholder="e.g. Discussing investment in organic tomato cultivation" value={formData.purpose} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (Months)</label>
                  <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
              </>
            )}

            {docType === 'partnership' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partner 1 Name</label>
                  <input type="text" name="partyA" placeholder="e.g. John Doe" value={formData.partyA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partner 2 Name</label>
                  <input type="text" name="partyB" placeholder="e.g. Jane Smith" value={formData.partyB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partnership / Business Name</label>
                  <input type="text" name="businessName" placeholder="e.g. Valley Organic Tomatoes" value={formData.businessName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Capital Contribution (₹)</label>
                  <input type="number" name="capital" placeholder="e.g. 500000" value={formData.capital} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partner 1 Profit Split (%)</label>
                  <input type="number" name="splitA" value={formData.splitA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Partner 2 Profit Split (%)</label>
                  <input type="number" name="splitB" value={formData.splitB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
              </>
            )}

            {docType === 'hiring' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employer (Farm/Company)</label>
                  <input type="text" name="partyA" placeholder="e.g. Green Valley Farms" value={formData.partyA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                  <input type="text" name="partyB" placeholder="e.g. Ramesh Kumar" value={formData.partyB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Role / Title</label>
                  <input type="text" name="role" placeholder="e.g. Farm Manager" value={formData.role} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Salary (₹)</label>
                  <input type="number" name="salary" placeholder="e.g. 25000" value={formData.salary} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={handlePrint} className="btn-primary flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Printable Document Section */}
      <div className="bg-white p-10 md:p-16 shadow-lg print:shadow-none print:p-0 max-w-4xl mx-auto border border-gray-200 print:border-none font-serif text-gray-900 leading-relaxed text-justify">
        
        {docType === 'nda' && (
          <div className="document-content">
            <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest">Non-Disclosure Agreement</h1>
            <p className="mb-4">This Non-Disclosure Agreement (the "Agreement") is entered into on <strong>{formData.date || '[Date]'}</strong> (the "Effective Date"), by and between:</p>
            <p className="mb-4"><strong>{formData.partyA || '[Disclosing Party Name]'}</strong> ("Disclosing Party"), and <strong>{formData.partyB || '[Receiving Party Name]'}</strong> ("Receiving Party").</p>
            
            <h2 className="text-xl font-bold mt-8 mb-2">1. Purpose</h2>
            <p className="mb-4">The Disclosing Party may share confidential information with the Receiving Party for the purpose of <strong>{formData.purpose || '[Purpose of Disclosure]'}</strong>.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">2. Confidential Information</h2>
            <p className="mb-4">"Confidential Information" shall mean all information, whether written or oral, disclosed by the Disclosing Party to the Receiving Party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">3. Non-Disclosure Obligations</h2>
            <p className="mb-4">The Receiving Party agrees to maintain the confidentiality of the Confidential Information and to not disclose it to any third party without prior written consent from the Disclosing Party.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">4. Term</h2>
            <p className="mb-8">This Agreement shall remain in effect for a period of <strong>{formData.duration || '[Number]'}</strong> months from the Effective Date.</p>
            
            <div className="grid grid-cols-2 gap-12 mt-16 pt-8 border-t border-gray-300">
              <div>
                <p className="mb-12"><strong>Disclosing Party:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyA || '[Disclosing Party]'}</p>
                <p>Date: _______________</p>
              </div>
              <div>
                <p className="mb-12"><strong>Receiving Party:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyB || '[Receiving Party]'}</p>
                <p>Date: _______________</p>
              </div>
            </div>
          </div>
        )}

        {docType === 'partnership' && (
          <div className="document-content">
            <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest">Partnership Agreement</h1>
            <p className="mb-4">This Partnership Agreement is made on <strong>{formData.date || '[Date]'}</strong>, by and between <strong>{formData.partyA || '[Partner 1]'}</strong> and <strong>{formData.partyB || '[Partner 2]'}</strong>.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-2">1. Partnership Name and Business</h2>
            <p className="mb-4">The Parties hereby form a partnership under the name of <strong>{formData.businessName || '[Business Name]'}</strong> to conduct agricultural and related business operations.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">2. Capital Contributions</h2>
            <p className="mb-4">The total capital contribution for this partnership shall be <strong>₹{formData.capital || '[Amount]'}</strong>. Both partners agree to fulfill their capital requirements as per their separate operational agreements.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">3. Profit and Loss Distribution</h2>
            <p className="mb-4">The net profits and losses of the partnership shall be divided as follows:</p>
            <ul className="list-disc ml-8 mb-4">
              <li>{formData.partyA || 'Partner 1'}: <strong>{formData.splitA || '[X]'}%</strong></li>
              <li>{formData.partyB || 'Partner 2'}: <strong>{formData.splitB || '[X]'}%</strong></li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-2">4. Management and Duties</h2>
            <p className="mb-8">Both partners shall participate in the management of the business. Decisions regarding daily operations and significant financial expenditures require mutual consent.</p>
            
            <div className="grid grid-cols-2 gap-12 mt-16 pt-8 border-t border-gray-300">
              <div>
                <p className="mb-12"><strong>Partner 1:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyA || '[Partner 1]'}</p>
                <p>Date: _______________</p>
              </div>
              <div>
                <p className="mb-12"><strong>Partner 2:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyB || '[Partner 2]'}</p>
                <p>Date: _______________</p>
              </div>
            </div>
          </div>
        )}

        {docType === 'hiring' && (
          <div className="document-content">
            <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest">Employment Contract</h1>
            <p className="mb-4">This Employment Contract is executed on <strong>{formData.date || '[Date]'}</strong>, between <strong>{formData.partyA || '[Employer Name]'}</strong> ("Employer") and <strong>{formData.partyB || '[Employee Name]'}</strong> ("Employee").</p>
            
            <h2 className="text-xl font-bold mt-8 mb-2">1. Position and Duties</h2>
            <p className="mb-4">The Employer agrees to employ the Employee as a <strong>{formData.role || '[Job Role]'}</strong>. The Employee agrees to perform all duties and responsibilities associated with this position in a professional and diligent manner.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">2. Compensation</h2>
            <p className="mb-4">The Employer shall pay the Employee a monthly salary of <strong>₹{formData.salary || '[Amount]'}</strong>, payable in accordance with the Employer's standard payroll schedule.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">3. Term of Employment</h2>
            <p className="mb-4">The employment shall commence on <strong>{formData.startDate || '[Start Date]'}</strong> and continue until terminated by either party with standard notice.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-2">4. Standard Terms</h2>
            <p className="mb-8">The Employee agrees to comply with all company rules, maintain workplace safety, and protect any sensitive operational information regarding the farm/business.</p>
            
            <div className="grid grid-cols-2 gap-12 mt-16 pt-8 border-t border-gray-300">
              <div>
                <p className="mb-12"><strong>Employer:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyA || '[Employer]'}</p>
                <p>Date: _______________</p>
              </div>
              <div>
                <p className="mb-12"><strong>Employee:</strong></p>
                <div className="border-b border-gray-800 w-full mb-2"></div>
                <p>Signature</p>
                <p className="mt-4">Name: {formData.partyB || '[Employee]'}</p>
                <p>Date: _______________</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
