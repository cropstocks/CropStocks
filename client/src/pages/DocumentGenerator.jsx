import React, { useState } from 'react';

export default function DocumentGenerator() {
  const [docType, setDocType] = useState('nda');
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('en-GB'), // 01/08/2026 format
    partyA: 'CROPSTOCKS',
    titleA: '(Chief Executive Officers, Cropstocks.com)',
    partyB: 'NAMIT BHATIA',
    titleB: '(Current Partner & Share Holder)',
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
              <label className="block text-sm font-medium text-gray-700">Date (DD/MM/YYYY)</label>
              <input type="text" name="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>

            {/* General Fields for all docs */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {docType === 'nda' ? 'Disclosing Party (Company Name)' : docType === 'hiring' ? 'Employer Name' : 'Partner 1 Name'}
              </label>
              <input type="text" name="partyA" placeholder="e.g. CROPSTOCKS" value={formData.partyA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {docType === 'nda' ? 'Disclosing Party Title' : docType === 'hiring' ? 'Employer Title' : 'Partner 1 Title'}
              </label>
              <input type="text" name="titleA" placeholder="e.g. (Chief Executive Officers)" value={formData.titleA} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {docType === 'nda' ? 'Receiving Party (Partner Name)' : docType === 'hiring' ? 'Employee Name' : 'Partner 2 Name'}
              </label>
              <input type="text" name="partyB" placeholder="e.g. NAMIT BHATIA" value={formData.partyB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {docType === 'nda' ? 'Receiving Party Title' : docType === 'hiring' ? 'Employee Title' : 'Partner 2 Title'}
              </label>
              <input type="text" name="titleB" placeholder="e.g. (Current Partner)" value={formData.titleB} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
            </div>

            {/* Specific Fields */}
            {docType === 'partnership' && (
              <>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Partnership / Business Name</label>
                  <input type="text" name="businessName" placeholder="e.g. Valley Organic Tomatoes" value={formData.businessName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Capital Contribution (₹)</label>
                  <input type="number" name="capital" placeholder="e.g. 500000" value={formData.capital} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div></div>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Job Role / Title</label>
                  <input type="text" name="role" placeholder="e.g. Farm Manager" value={formData.role} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Salary (₹)</label>
                  <input type="number" name="salary" placeholder="e.g. 25000" value={formData.salary} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:border-brand-green focus:ring-brand-green" />
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
      <div className="relative bg-white p-10 md:p-16 shadow-lg print:shadow-none print:p-0 max-w-4xl mx-auto border border-gray-200 print:border-none font-serif text-black text-[15px] leading-[1.8] text-justify min-h-screen">
        
        {/* Watermark Logo */}
        <div className="absolute print:fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-3/4 md:w-2/3 print:w-[65%] object-contain mix-blend-multiply" />
        </div>

        {/* Content Container (placed above watermark) */}
        <div className="relative z-10">
          {docType === 'nda' && (
            <div>
              <div className="flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center">
                <img src="/logo.png" alt="Logo" className="w-full max-w-[600px] object-contain mix-blend-multiply" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">Non-Disclosure and Confidentiality Agreement</h1>
              
              <p className="mb-6">This Non-Disclosure and Confidentiality Agreement is entered into as of <strong>{formData.date}</strong>, by and between <br /><strong>{formData.partyA.toUpperCase()}</strong> (the "Company" or "Disclosing Party"), and <strong>{formData.partyB.toUpperCase()}</strong> (the "Receiving Party").</p>
              
              <p className="mb-6"><strong>WHEREAS</strong>, the Receiving Party is employed by, or partnering with, the Company and in the course of such relationship will have access to certain confidential and proprietary information of the Company;</p>
              
              <p className="mb-8"><strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants and premises herein contained, the parties agree as follows:</p>
              
              <h2 className="font-bold mb-4">1. DEFINITION OF CONFIDENTIAL INFORMATION</h2>
              <p className="mb-4">For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. Confidential Information specifically includes, but is not limited to:</p>
              <ul className="list-disc ml-8 mb-6 space-y-3">
                <li><strong>Trade Secrets and Algorithms:</strong> All proprietary algorithms, mathematical models, machine learning models, source code, object code, system designs, architecture, and technical frameworks used by the Company.</li>
                <li><strong>Future Plans and Strategy:</strong> Product roadmaps, unreleased product features, business plans, marketing strategies, financial projections, and strategic partnerships.</li>
                <li><strong>Internal Communications:</strong> Internal talks, meeting minutes, slack/chat logs, email correspondences, and strategic discussions between employees, management, and partners.</li>
                <li><strong>Business Operations:</strong> Customer lists, vendor information, pricing models, operational procedures, and financial data.</li>
              </ul>
              
              <h2 className="font-bold mb-4">2. OBLIGATIONS OF RECEIVING PARTY</h2>
              <p className="mb-6">The Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. The Receiving Party shall carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. The Receiving Party shall not, without prior written approval of Disclosing Party, use for Receiving Party's own benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information.</p>
              
              <h2 className="font-bold mb-4">3. EXCLUSIONS FROM CONFIDENTIAL INFORMATION</h2>
              <p className="mb-6">Receiving Party's obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party's representatives; or (d) is disclosed by Receiving Party with Disclosing Party's prior written approval.</p>
              
              <h2 className="font-bold mb-4">4. TERM AND DURATION</h2>
              <p className="mb-6">The nondisclosure provisions of this Agreement shall survive the termination of the relationship between the parties. The Receiving Party's duty to hold the Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.</p>
              
              <h2 className="font-bold mb-4">5. RETURN OF MATERIALS</h2>
              <p className="mb-6">Upon termination of the relationship between the parties, or upon Disclosing Party's request at any time, Receiving Party shall promptly deliver to Disclosing Party all documents, notes, computer media, and other materials containing or embodying Confidential Information, and shall permanently delete any digital copies of such information from all personal or third-party devices and accounts.</p>
              
              <h2 className="font-bold mb-4">6. LEGAL REMEDIES</h2>
              <p className="mb-6">The Receiving Party acknowledges that unauthorized disclosure or use of Confidential Information could cause irreparable harm and significant injury to the Disclosing Party. Accordingly, the Disclosing Party shall be entitled to seek immediate injunctive relief to enforce obligations under this Agreement, in addition to any other rights and remedies available at law or in equity, including financial damages.</p>
              
              <h2 className="font-bold mb-4">7. MISCELLANEOUS</h2>
              <p className="mb-20">This Agreement represents the entire understanding between the parties regarding the Confidential Information and supersedes any prior agreements. This Agreement shall be governed by the laws of the jurisdiction in which the Company is headquartered, without regard to its conflict of law principles. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions will continue in full force.</p>
              
              <div className="flex justify-between items-center text-center mt-12 mb-16">
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyA}</p>
                    <p className="italic text-sm">{formData.titleA}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyB}</p>
                    <p className="italic text-sm">{formData.titleB}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
              </div>
            </div>
          )}

          {docType === 'partnership' && (
            <div>
              <div className="flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center">
                <img src="/logo.png" alt="Logo" className="w-full max-w-[600px] object-contain mix-blend-multiply" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">General Partnership Agreement</h1>
              
              <p className="mb-6">This General Partnership Agreement is entered into as of <strong>{formData.date}</strong>, by and between <br /><strong>{formData.partyA.toUpperCase()}</strong>, and <strong>{formData.partyB.toUpperCase()}</strong> (collectively the "Partners").</p>
              
              <p className="mb-6"><strong>WHEREAS</strong>, the Partners desire to associate themselves as partners in business;</p>
              
              <p className="mb-8"><strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants and premises herein contained, the parties agree as follows:</p>
              
              <h2 className="font-bold mb-4">1. PARTNERSHIP NAME AND BUSINESS</h2>
              <p className="mb-6">The Partners hereby form a partnership under the name of <strong>{formData.businessName || '[Business Name]'}</strong> to conduct agricultural and related business operations.</p>
              
              <h2 className="font-bold mb-4">2. CAPITAL CONTRIBUTIONS</h2>
              <p className="mb-6">The total capital contribution for this partnership shall be <strong>₹{formData.capital || '[Amount]'}</strong>. Both partners agree to fulfill their capital requirements in a timely manner as per the operational requirements of the business.</p>
              
              <h2 className="font-bold mb-4">3. PROFIT AND LOSS DISTRIBUTION</h2>
              <p className="mb-4">The net profits and losses of the partnership shall be divided and distributed among the Partners in the following proportions:</p>
              <ul className="list-disc ml-8 mb-6 space-y-3">
                <li>{formData.partyA || 'Partner 1'}: <strong>{formData.splitA || '[X]'}%</strong></li>
                <li>{formData.partyB || 'Partner 2'}: <strong>{formData.splitB || '[X]'}%</strong></li>
              </ul>
              
              <h2 className="font-bold mb-4">4. MANAGEMENT AND DUTIES</h2>
              <p className="mb-6">Both partners shall participate in the management of the business. Decisions regarding daily operations, significant financial expenditures, and the incurrence of debt require mutual consent of all Partners. Each Partner shall devote such time and attention to the business of the Partnership as shall be necessary to conduct it efficiently.</p>
              
              <h2 className="font-bold mb-4">5. MISCELLANEOUS</h2>
              <p className="mb-20">This Agreement represents the entire understanding between the Partners regarding the operation of the business and supersedes any prior agreements. This Agreement may not be amended or modified except in writing signed by both Partners.</p>
              
              <div className="flex justify-between items-center text-center mt-12 mb-16">
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyA}</p>
                    <p className="italic text-sm">{formData.titleA}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyB}</p>
                    <p className="italic text-sm">{formData.titleB}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
              </div>
            </div>
          )}

          {docType === 'hiring' && (
            <div>
              <div className="flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center">
                <img src="/logo.png" alt="Logo" className="w-full max-w-[600px] object-contain mix-blend-multiply" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">Employment Contract</h1>
              
              <p className="mb-6">This Employment Contract is entered into as of <strong>{formData.date}</strong>, by and between <br /><strong>{formData.partyA.toUpperCase()}</strong> (the "Employer"), and <strong>{formData.partyB.toUpperCase()}</strong> (the "Employee").</p>
              
              <p className="mb-6"><strong>WHEREAS</strong>, the Employer desires to retain the services of the Employee, and the Employee desires to render such services;</p>
              
              <p className="mb-8"><strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants and premises herein contained, the parties agree as follows:</p>
              
              <h2 className="font-bold mb-4">1. POSITION AND DUTIES</h2>
              <p className="mb-6">The Employer agrees to employ the Employee in the capacity of <strong>{formData.role || '[Job Role]'}</strong>. The Employee agrees to perform all duties and responsibilities associated with this position in a professional, ethical, and diligent manner.</p>
              
              <h2 className="font-bold mb-4">2. COMPENSATION AND BENEFITS</h2>
              <p className="mb-6">The Employer shall pay the Employee a monthly salary of <strong>₹{formData.salary || '[Amount]'}</strong>, payable in accordance with the Employer's standard payroll schedule. All payments shall be subject to customary withholding taxes and deductions.</p>
              
              <h2 className="font-bold mb-4">3. TERM OF EMPLOYMENT</h2>
              <p className="mb-6">The employment shall commence on <strong>{formData.startDate || '[Start Date]'}</strong>. This Agreement represents an "at-will" employment relationship, meaning that either the Employer or the Employee may terminate the employment relationship at any time, with or without cause, subject to standard notice periods as required by law.</p>
              
              <h2 className="font-bold mb-4">4. CONFIDENTIALITY AND POLICIES</h2>
              <p className="mb-6">The Employee agrees to comply with all company rules, maintain workplace safety, and protect any sensitive operational information regarding the business operations, trade secrets, and client information.</p>
              
              <h2 className="font-bold mb-4">5. MISCELLANEOUS</h2>
              <p className="mb-20">This Agreement represents the entire understanding between the Employer and the Employee regarding the employment relationship. This Agreement may not be amended or modified except in writing signed by both parties.</p>
              
              <div className="flex justify-between items-center text-center mt-12 mb-16">
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyA}</p>
                    <p className="italic text-sm">{formData.titleA}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
                <div className="w-1/2 flex flex-col items-center">
                  <div className="border-t border-[#446688] w-64 pt-2">
                    <p className="uppercase">{formData.partyB}</p>
                    <p className="italic text-sm">{formData.titleB}</p>
                  </div>
                  <p className="mt-8">{formData.date}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
