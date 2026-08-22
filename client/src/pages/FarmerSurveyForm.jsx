import React, { useState } from 'react';

export default function FarmerSurveyForm() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden mb-8 space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">Farmer Profile and Agricultural Survey</h1>
          <p className="text-gray-600">Fill in the details below to submit or print the survey.</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handlePrint} className="btn-primary flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="relative bg-white shadow-lg print:shadow-none mx-auto border border-gray-200 print:border-none font-sans text-black text-[15px] leading-[1.8] min-h-screen">
        <div className="absolute print:fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-3/4 md:w-2/3 print:w-[65%] object-contain mix-blend-multiply" />
        </div>

        <div className="relative z-10 p-10 md:p-16 print:p-0">
          <div className="flex justify-center mb-8 overflow-hidden max-h-32 items-center">
            <img src="/logo.png" alt="Logo" className="h-24 object-contain mix-blend-multiply" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">Farmer Profile and Agricultural Survey</h1>
          
          <form className="space-y-8">
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">1. Choose your language</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_0" value="English" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>English</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_0" value="हिंदी" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>हिंदी</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_0" value="ગુજરાતી" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>ગુજરાતી</span>
                </label>
              </div>
            </div>
            <div className="mb-6 text-gray-700 italic">Please fill the form correctly.</div>
            <div className="mb-6 text-gray-700 italic">Your Data will not be shared further.</div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">4. Name of Data collector (Only for employees)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Manan Pandey" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Manan Pandey</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Manas Vinod" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Manas Vinod</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Aradhya Garg" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Aradhya Garg</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Shreyas Das" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Shreyas Das</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Devansh More" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Devansh More</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_3" value="Namit Bhatia" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Namit Bhatia</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">5. Full Name of Farmer</label>
              <input type="text" name="q_4" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">6. Primary Farming Location (State)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Andhra Pradesh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Andhra Pradesh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Arunachal Pradesh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Arunachal Pradesh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Assam" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Assam</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Bihar" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Bihar</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Chhattisgarh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Chhattisgarh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Goa" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Goa</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Haryana" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Haryana</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Himachal Pradesh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Himachal Pradesh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Jharkhand" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Jharkhand</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Karnataka" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Karnataka</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Kerala" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Kerala</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Madhya Pradesh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Madhya Pradesh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Maharashtra" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Maharashtra</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Manipur" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Manipur</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Meghalaya" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Meghalaya</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Mizoram" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Mizoram</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Nagaland" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Nagaland</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Odisha" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Odisha</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Punjab" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Punjab</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Rajasthan" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Rajasthan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Sikkim" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Sikkim</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Tamil Nadu" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Tamil Nadu</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Telangana" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Telangana</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Tripura" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Tripura</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Uttar Pradesh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Uttar Pradesh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Uttarakhand" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Uttarakhand</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="West Bengal" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>West Bengal</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Andaman and Nicobar Islands" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Andaman and Nicobar Islands</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Chandigarh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Chandigarh</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Dadra and Nagar Haveli and Daman and Diu" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Dadra and Nagar Haveli and Daman and Diu</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Lakshadweep" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Lakshadweep</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Delhi (National Capital Territory)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Delhi (National Capital Territory)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Puducherry" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Puducherry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Jammu and Kashmir" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Jammu and Kashmir</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_5" value="Ladakh" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Ladakh</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">7. Which of the crops are currently under cultivation?</label>
              <input type="text" name="q_6" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">8. What is the primary method of irrigation used on your farm?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_7" value="Canal Irrigation" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Canal Irrigation</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_7" value="Tube Well" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Tube Well</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_7" value="Rain-fed" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Rain-fed</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_7" value="Drip Irrigation" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Drip Irrigation</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_7" value="Sprinkler System" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Sprinkler System</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">9. Indicate the frequency of the following farming challenges encountered this season:</label>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border-b-2 border-gray-300"></th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">Rarely</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">Sometimes</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">Often</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">Always</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Pest Infestation</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Pest Infestation" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Pest Infestation" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Pest Infestation" value="Often" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Pest Infestation" value="Always" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Water Scarcity</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Water Scarcity" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Water Scarcity" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Water Scarcity" value="Often" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Water Scarcity" value="Always" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Market Price Fluctuation</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Market Price Fluctuation" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Market Price Fluctuation" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Market Price Fluctuation" value="Often" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Market Price Fluctuation" value="Always" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Lack of Quality Seeds</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Lack of Quality Seeds" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Lack of Quality Seeds" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Lack of Quality Seeds" value="Often" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Lack of Quality Seeds" value="Always" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Flood</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Flood" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Flood" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Flood" value="Often" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_8_Flood" value="Always" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">10. Cost of Production per season.</label>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border-b-2 border-gray-300"></th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">0-100</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">100-200</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">200-300</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">300-400</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">400-500</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">500-600</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">600-700</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">700-800</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">800-900</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">900-1000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">1,000-2,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">2,000-3,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">3,000-4,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">4,000-5,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">5,000-6,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">6,000-7,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">7,000-10,000</th>
                      <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">10,000+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Labor Costs (per hour)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Labor Costs (per hour)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Seeds (per Kg)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Seeds (per Kg)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Fertilisers (per Kg)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Fertilisers (per Kg)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Pesticides</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Pesticides" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Equipment and Fuel (per Hour)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Equipment and Fuel (per Hour)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Irrigation (per Month)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Irrigation (per Month)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 font-medium">Land rent (per month)</td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="0-100" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="100-200" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="200-300" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="300-400" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="400-500" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="500-600" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="600-700" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="700-800" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="800-900" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="900-1000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="1,000-2,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="2,000-3,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="3,000-4,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="4,000-5,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="5,000-6,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="6,000-7,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="7,000-10,000" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                      <td className="p-2 text-center">
                        <input type="radio" name="q_9_Land rent (per month)" value="10,000+" className="text-brand-green" onChange={handleInputChange} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">11. Total estimated Cost of Production per season.</label>
              <input type="text" name="q_10" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">12. Total estimated Selling Price</label>
              <input type="text" name="q_11" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">13. How much land (in Hectares) do you own</label>
              <input type="text" name="q_12" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">14. Which of these agricultural support services would be most beneficial to you?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_13" value="Subsidized fertilizers" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Subsidized fertilizers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_13" value="Low-interest agricultural loans" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Low-interest agricultural loans</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_13" value="Technical training on modern farming" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Technical training on modern farming</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_13" value="Market access and logistics support" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Market access and logistics support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_13" value="Weather forecasting alerts" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Weather forecasting alerts</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">15. How would you rate your level of access to government agricultural schemes?</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_14" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">1</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_14" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">2</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_14" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">3</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_14" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">4</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_14" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">5</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">16. At what rate of interest do you take loan normally?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="1" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>1</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="2" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>2</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="3" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>3</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="4" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>4</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="5" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>5</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="6" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>6</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="7" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>7</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="8" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>8</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="9" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>9</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="10" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>10</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="11" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>11</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="12" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>12</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="13" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>13</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="14" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>14</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="15" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>15</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="16" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>16</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="17" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>17</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="18" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>18</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="19" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>19</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="20" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>20</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="21" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>21</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="22" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>22</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="23" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>23</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="24" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>24</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="25" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>25</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="26" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>26</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="27" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>27</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="28" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>28</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="29" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>29</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="30" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>30</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="31" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>31</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="32" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>32</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="33" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>33</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="34" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>34</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="35" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>35</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="36" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>36</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="37" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>37</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="38" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>38</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="39" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>39</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="40" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>40</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="41" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>41</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="42" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>42</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="43" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>43</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="44" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>44</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="45" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>45</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="46" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>46</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="47" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>47</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="48" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>48</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="49" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>49</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="50" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>50</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="51" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>51</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="52" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>52</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="53" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>53</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="54" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>54</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="55" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>55</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="56" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>56</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="57" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>57</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="58" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>58</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="59" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>59</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="60" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>60</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="61" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>61</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="62" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>62</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="63" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>63</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="64" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>64</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="65" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>65</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="66" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>66</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="67" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>67</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="68" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>68</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="69" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>69</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="70" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>70</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="71" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>71</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="72" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>72</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="73" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>73</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="74" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>74</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="75" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>75</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="76" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>76</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="77" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>77</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="78" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>78</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="79" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>79</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="80" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>80</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="81" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>81</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="82" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>82</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="83" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>83</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="84" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>84</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="85" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>85</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="86" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>86</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="87" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>87</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="88" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>88</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="89" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>89</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="90" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>90</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="91" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>91</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="92" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>92</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="93" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>93</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="94" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>94</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="95" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>95</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="96" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>96</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="97" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>97</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="98" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>98</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="99" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>99</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_15" value="100" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>100</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">17. Type of Interest</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="q_16_Compound Interest" value="Compound Interest" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                  <span>Compound Interest</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="q_16_Simple Interest" value="Simple Interest" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                  <span>Simple Interest</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">18. From whom do you take loan?</label>
              <input type="text" name="q_17" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">19. How much is the produce (in Quintals)?</label>
              <input type="text" name="q_18" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">20. For how much do you sell the above-mentioned crops?</label>
              <input type="text" name="q_19" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">21. How do you primarily sell your agricultural produce?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Local Mandis / APMC Markets" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Local Mandis / APMC Markets</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Direct to Private Traders / Aggregators" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Direct to Private Traders / Aggregators</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Contract Farming" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Contract Farming</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Direct to Consumers (Farmers Markets)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Direct to Consumers (Farmers Markets)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Online Platforms / E-commerce" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Online Platforms / E-commerce</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_20" value="Cooperative Societies" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Cooperative Societies</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">22. If you use multiple selling channels, please mention at what rate each of them buys the above-mentioned crops.</label>
              <input type="text" name="q_21" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">23. Would you like to list your crop to our platform? (Only if you are explained)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_22" value="Yes" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="q_22" value="No" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">24. Any additional comments or challenges you wish to report?</label>
              <input type="text" name="q_23" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
            </div>
            <div className="break-inside-avoid">
              <label className="block font-semibold text-gray-800 mb-2">25. What will you rate us? (Only if you are explained already)</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">1</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">2</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">3</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">4</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">5</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="6" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">6</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="7" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">7</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="8" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">8</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="9" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">9</span>
                </label>
                <label className="flex flex-col items-center">
                  <input type="radio" name="q_24" value="10" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                  <span className="text-sm">10</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
