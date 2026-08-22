import React, { useState } from 'react';

export default function FarmerSurveyForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden mb-8 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">Farmer Profile and Agricultural Survey</h1>
          <p className="text-gray-600 mb-4">Fill in the details below to submit or print the survey.</p>
          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-700">Language:</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="border-gray-300 rounded-md py-1 px-3 focus:ring-brand-green focus:border-brand-green"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              <option value="Gujarati">ગુજરાતી</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handlePrint} className="btn-primary flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="relative bg-white shadow-lg print:shadow-none max-w-4xl mx-auto border border-gray-200 print:border-none font-sans text-black text-[15px] leading-[1.8] min-h-screen">
        <div className="absolute print:fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-3/4 md:w-2/3 print:w-[65%] object-contain mix-blend-multiply" />
        </div>

        <table className="w-full relative z-10">
          <tbody className="table-row-group">
            <tr>
              <td className="p-10 md:p-16 print:p-0">
                <div className="flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center">
                  <img src="/logo.png" alt="Logo" className="w-full max-w-[600px] object-contain mix-blend-multiply" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">
                  {language === 'English' ? 'Farmer Profile and Agricultural Survey' : 
                   language === 'Hindi' ? 'किसान प्रोफाइल और कृषि सर्वेक्षण' : 'ખેડૂત પ્રોફાઇલ અને કૃષિ સર્વેક્ષણ'}
                </h1>
                
                <form className="space-y-8">
                  {language === 'English' && (<>
                    <div className="mb-6 text-gray-700 italic">Please fill the form correctly.</div>
                    <div className="mb-6 text-gray-700 italic">Your Data will not be shared further.</div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">1. Name of Data collector (Only for employees)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Manan Pandey" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Manan Pandey</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Manas Vinod" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Manas Vinod</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Aradhya Garg" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Aradhya Garg</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Shreyas Das" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Shreyas Das</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Devansh More" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Devansh More</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_2" value="Namit Bhatia" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Namit Bhatia</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">2. Full Name of Farmer</label>
                      <input type="text" name="English_q_3" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">3. Primary Farming Location (State)</label>
                      <input type="text" name="English_q_4" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">4. Which of the crops are currently under cultivation?</label>
                      <input type="text" name="English_q_5" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">5. What is the primary method of irrigation used on your farm?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_6" value="Canal Irrigation" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Canal Irrigation</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_6" value="Tube Well" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Tube Well</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_6" value="Rain-fed" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Rain-fed</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_6" value="Drip Irrigation" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Drip Irrigation</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_6" value="Sprinkler System" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Sprinkler System</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">6. Indicate the frequency of the following farming challenges encountered this season:</label>
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
                                <input type="radio" name="English_q_7_Pest Infestation" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Pest Infestation" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Pest Infestation" value="Often" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Pest Infestation" value="Always" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">Water Scarcity</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Water Scarcity" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Water Scarcity" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Water Scarcity" value="Often" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Water Scarcity" value="Always" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">Market Price Fluctuation</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Market Price Fluctuation" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Market Price Fluctuation" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Market Price Fluctuation" value="Often" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Market Price Fluctuation" value="Always" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">Lack of Quality Seeds</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Lack of Quality Seeds" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Lack of Quality Seeds" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Lack of Quality Seeds" value="Often" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Lack of Quality Seeds" value="Always" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">Flood</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Flood" value="Rarely" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Flood" value="Sometimes" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Flood" value="Often" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="English_q_7_Flood" value="Always" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">7. Cost of Production per season.</label>
                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Labor Costs (per hour)</label>
                          <input type="text" name="English_q_8_Labor Costs (per hour)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Seeds (per Kg)</label>
                          <input type="text" name="English_q_8_Seeds (per Kg)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Fertilisers (per Kg)</label>
                          <input type="text" name="English_q_8_Fertilisers (per Kg)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Pesticides</label>
                          <input type="text" name="English_q_8_Pesticides" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Equipment and Fuel (per Hour)</label>
                          <input type="text" name="English_q_8_Equipment and Fuel (per Hour)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Irrigation (per Month)</label>
                          <input type="text" name="English_q_8_Irrigation (per Month)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Land rent (per month)</label>
                          <input type="text" name="English_q_8_Land rent (per month)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">8. Total estimated Cost of Production per season.</label>
                      <input type="text" name="English_q_9" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">9. Total estimated Selling Price</label>
                      <input type="text" name="English_q_10" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">10. How much land (in Hectares) do you own</label>
                      <input type="text" name="English_q_11" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">11. Which of these agricultural support services would be most beneficial to you?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_12" value="Subsidized fertilizers" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Subsidized fertilizers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_12" value="Low-interest agricultural loans" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Low-interest agricultural loans</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_12" value="Technical training on modern farming" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Technical training on modern farming</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_12" value="Market access and logistics support" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Market access and logistics support</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_12" value="Weather forecasting alerts" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Weather forecasting alerts</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">12. How would you rate your level of access to government agricultural schemes?</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_13" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_13" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_13" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_13" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_13" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">13. At what rate of interest do you take loan normally?</label>
                      <input type="text" name="English_q_14" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">14. Type of Interest</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="English_q_15_Compound Interest" value="Compound Interest" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>Compound Interest</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="English_q_15_Simple Interest" value="Simple Interest" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>Simple Interest</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">15. From whom do you take loan?</label>
                      <input type="text" name="English_q_16" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">16. How much is the produce (in Quintals)?</label>
                      <input type="text" name="English_q_17" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">17. For how much do you sell the above-mentioned crops?</label>
                      <input type="text" name="English_q_18" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">18. How do you primarily sell your agricultural produce?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Local Mandis / APMC Markets" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Local Mandis / APMC Markets</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Direct to Private Traders / Aggregators" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Direct to Private Traders / Aggregators</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Contract Farming" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Contract Farming</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Direct to Consumers (Farmers Markets)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Direct to Consumers (Farmers Markets)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Online Platforms / E-commerce" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Online Platforms / E-commerce</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_19" value="Cooperative Societies" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Cooperative Societies</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">19. If you use multiple selling channels, please mention at what rate each of them buys the above-mentioned crops.</label>
                      <input type="text" name="English_q_20" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">20. Would you like to list your crop to our platform? (Only if you are explained)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_21" value="Yes" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="English_q_21" value="No" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">21. Any additional comments or challenges you wish to report?</label>
                      <input type="text" name="English_q_22" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">22. What will you rate us? (Only if you are explained already)</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="6" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">6</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="7" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">7</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="8" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">8</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="9" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">9</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="English_q_23" value="10" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">10</span>
                        </label>
                      </div>
                    </div>
                  </>)}
                  {language === 'Hindi' && (<>
                    <div className="mb-6 text-gray-700 italic">कृपया फॉर्म सही से भरें।</div>
                    <div className="mb-6 text-gray-700 italic">आपका डाटा आगे साझा नहीं किया जाएगा।</div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">1. डेटा कलेक्टर का नाम (सिर्फ कर्मचारियों के लिए)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="मनन पांडे" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>मनन पांडे</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="मनस विनोद" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>मनस विनोद</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="आराध्या गर्ग" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>आराध्या गर्ग</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="श्रेयस दास" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>श्रेयस दास</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="देवांश मोरे" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>देवांश मोरे</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_2" value="नमित भाटिया" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>नमित भाटिया</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">2. किसान का पूरा नाम</label>
                      <input type="text" name="Hindi_q_3" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">3. संपर्क नंबर</label>
                      <input type="text" name="Hindi_q_4" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">4. मुख्य खेती का स्थान (राज्य)</label>
                      <input type="text" name="Hindi_q_5" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">5. कौन सी फसलें अभी खेतों में उगाई जा रही हैं?</label>
                      <input type="text" name="Hindi_q_6" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">6. इस मौसम में सामना की गई निम्नलिखित खेती की चुनौतियों की आवृत्ति बताएं:</label>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr>
                              <th className="p-2 border-b-2 border-gray-300"></th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">शायद ही कभी</th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">कभी-कभी</th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">अक्सर</th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">हमेशा</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">कीटों का प्रकोप</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_कीटों का प्रकोप" value="शायद ही कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_कीटों का प्रकोप" value="कभी-कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_कीटों का प्रकोप" value="अक्सर" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_कीटों का प्रकोप" value="हमेशा" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">पानी की कमी</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_पानी की कमी" value="शायद ही कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_पानी की कमी" value="कभी-कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_पानी की कमी" value="अक्सर" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_पानी की कमी" value="हमेशा" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">बाजार मूल्य में उतार-चढ़ाव</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाजार मूल्य में उतार-चढ़ाव" value="शायद ही कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाजार मूल्य में उतार-चढ़ाव" value="कभी-कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाजार मूल्य में उतार-चढ़ाव" value="अक्सर" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाजार मूल्य में उतार-चढ़ाव" value="हमेशा" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">अच्छी गुणवत्ता वाले बीजों की कमी</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_अच्छी गुणवत्ता वाले बीजों की कमी" value="शायद ही कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_अच्छी गुणवत्ता वाले बीजों की कमी" value="कभी-कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_अच्छी गुणवत्ता वाले बीजों की कमी" value="अक्सर" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_अच्छी गुणवत्ता वाले बीजों की कमी" value="हमेशा" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">बाढ़</td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाढ़" value="शायद ही कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाढ़" value="कभी-कभी" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाढ़" value="अक्सर" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Hindi_q_7_बाढ़" value="हमेशा" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">7. प्रत्येक मौसम में उत्पादन की लागत।</label>
                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">मजदूरी लागत (प्रति घंटा)</label>
                          <input type="text" name="Hindi_q_8_मजदूरी लागत (प्रति घंटा)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">बीज (प्रति किलोग्राम)</label>
                          <input type="text" name="Hindi_q_8_बीज (प्रति किलोग्राम)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">उर्वरक (प्रति किलोग्राम)</label>
                          <input type="text" name="Hindi_q_8_उर्वरक (प्रति किलोग्राम)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">कीटनाशक</label>
                          <input type="text" name="Hindi_q_8_कीटनाशक" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">उपकरण और ईंधन (प्रति घंटा)</label>
                          <input type="text" name="Hindi_q_8_उपकरण और ईंधन (प्रति घंटा)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">सिंचाई (प्रति माह)</label>
                          <input type="text" name="Hindi_q_8_सिंचाई (प्रति माह)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">भूमि किराया (प्रति माह)</label>
                          <input type="text" name="Hindi_q_8_भूमि किराया (प्रति माह)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">8. आपके खेत में सिचाई का मुख्य तरीका कौन सा है?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_9_नहर सिंचाई" value="नहर सिंचाई" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>नहर सिंचाई</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_9_ट्यूबवेल (नलकूप)" value="ट्यूबवेल (नलकूप)" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ट्यूबवेल (नलकूप)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_9_वर्षा आधारित" value="वर्षा आधारित" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>वर्षा आधारित</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_9_ड्रिप सिंचाई" value="ड्रिप सिंचाई" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ड्रिप सिंचाई</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_9_स्प्रिंकलर (छिड़काव) प्रणाली" value="स्प्रिंकलर (छिड़काव) प्रणाली" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>स्प्रिंकलर (छिड़काव) प्रणाली</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">9. आप अपनी ज़मीन की मिट्टी की गुणवत्ता को कैसे दर्ज़ करेंगे?</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_10" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_10" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_10" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_10" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_10" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">10. प्रति सीजन अनुमानित कुल उत्पादन लागत।</label>
                      <input type="text" name="Hindi_q_11" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">11. कुल अनुमानित बिक्री मूल्य</label>
                      <input type="text" name="Hindi_q_12" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">12. आपके पास कितनी जमीन (हेक्टेयर में) है</label>
                      <input type="text" name="Hindi_q_13" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">13. इनमें से कौन सी कृषि सहायता सेवाएँ आपके लिए सबसे फायदेमंद होंगी?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_14" value="रियायती उर्वरक (सब्सिडी वाले खाद)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>रियायती उर्वरक (सब्सिडी वाले खाद)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_14" value="कम ब्याज वाले कृषि ऋण" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>कम ब्याज वाले कृषि ऋण</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_14" value="आधुनिक खेती पर तकनीकी प्रशिक्षण" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>आधुनिक खेती पर तकनीकी प्रशिक्षण</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_14" value="बाजार तक पहुंच और लॉजिस्टिक्स सहायता" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>बाजार तक पहुंच और लॉजिस्टिक्स सहायता</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_14" value="मौसम पूर्वानुमान अलर्ट" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>मौसम पूर्वानुमान अलर्ट</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">14. आप सरकारी कृषि योजनाओं तक अपनी पहुँच का स्तर कैसे आंकते हैं?</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_15" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_15" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_15" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_15" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_15" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">15. आप सामान्य तौर पर लोन किस दर से लेते हैं?</label>
                      <input type="text" name="Hindi_q_16" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">16. ब्याज का प्रकार</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_17_चक्रवृद्धि ब्याज" value="चक्रवृद्धि ब्याज" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>चक्रवृद्धि ब्याज</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_17_साधारण ब्याज" value="साधारण ब्याज" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>साधारण ब्याज</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">17. आप किससे ऋण लेते हैं?</label>
                      <input type="text" name="Hindi_q_18" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">18. उत्पाद कितना है (क्विंटल में)?</label>
                      <input type="text" name="Hindi_q_19" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">19. आप ऊपर बताए गए फसलों को कितने में बेचते हैं?</label>
                      <input type="text" name="Hindi_q_20" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">20. आप अपनी कृषि उपज मुख्य रूप से कैसे बेचते हैं?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="स्थानीय मंडी / एपीएमसी बाजार" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>स्थानीय मंडी / एपीएमसी बाजार</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="प्रत्यक्ष निजी व्यापारी / एग्रीगेटर्स तक" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>प्रत्यक्ष निजी व्यापारी / एग्रीगेटर्स तक</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="अनुबंध कृषि" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>अनुबंध कृषि</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="प्रत्यक्ष उपभोक्ताओं तक (किसान बाजार)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>प्रत्यक्ष उपभोक्ताओं तक (किसान बाजार)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="ऑनलाइन प्लेटफ़ॉर्म / ई-कॉमर्स" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>ऑनलाइन प्लेटफ़ॉर्म / ई-कॉमर्स</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Hindi_q_21" value="सहकारी समितियाँ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>सहकारी समितियाँ</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">21. यदि आप कई बिक्री चैनलों का उपयोग करते हैं, तो कृपया समझाएं।</label>
                      <input type="text" name="Hindi_q_22" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">22. क्या आप अपनी फसल को हमारे प्लेटफ़ॉर्म पर सूचीबद्ध करना चाहेंगे?(केवल अगर आपको समझाया गया हो)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_23_हाँ" value="हाँ" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>हाँ</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Hindi_q_23_नहीं" value="नहीं" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>नहीं</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">23. क्या आप कोई अतिरिक्त टिप्पणियाँ या चुनौतियाँ रिपोर्ट करना चाहेंगे?</label>
                      <input type="text" name="Hindi_q_24" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">24. आप हमें कितने अंक देंगे? (केवल यदि आपको पहले समझाया गया है)</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="6" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">6</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="7" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">7</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="8" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">8</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="9" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">9</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Hindi_q_25" value="10" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">10</span>
                        </label>
                      </div>
                    </div>
                  </>)}
                  {language === 'Gujarati' && (<>
                    <div className="mb-6 text-gray-700 italic">કૃપા કરીને ફોર્મ યોગ્ય રીતે ભરો. <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Please fill the form correctly]</span></div>
                    <div className="mb-6 text-gray-700 italic">તમારા ડેટા આગળ શેર નહીં કરવામાં આવશે. <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Your Data will not be shared further]</span></div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">1. ડેટા કલેક્શન કરનારનું નામ (કેવળ કર્મચારીઓ માટે) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Name of Data collector (Only for employees)]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="મનન પાંડે" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>મનન પાંડે <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Manan Pandey]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="મનસ વિનોદ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>મનસ વિનોદ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Manas Vinod]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="આરાધ્યા ગર્ગ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>આરાધ્યા ગર્ગ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Aradhya Garg]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="શ્રેયસ દાસ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>શ્રેયસ દાસ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Shreyas Das]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="દેવાંશ મોરે" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>દેવાંશ મોરે <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Devansh More]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_2" value="નમિત ભાટિયા" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>નમિત ભાટિયા <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Namit Bhatia]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">2. કિસાનનું પૂરું નામ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Full Name of Farmer]</span></label>
                      <input type="text" name="Gujarati_q_3" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">3. સંપર્ક નંબર <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Contact Number]</span></label>
                      <input type="text" name="Gujarati_q_4" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">4. મુખ્ય ખેતીનું સ્થળ (રાજ્ય) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Primary Farming Location (State)]</span></label>
                      <input type="text" name="Gujarati_q_5" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">5. હાલે કઈ ફસલો ખેતરોમાં ઉગાડી રહી છે? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Which of the crops are currently under cultivation?]</span></label>
                      <input type="text" name="Gujarati_q_6" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">6. આ મોસમમાં સામનો કરેલી નીચે દર્શાવેલી ખેતીની ચેલેન્જોનું આવર્તન જણાવો</label>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr>
                              <th className="p-2 border-b-2 border-gray-300"></th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">ઘણો વખત નહીં <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Rarely]</span></th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">ક્યારેક-ક્યારેક <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Sometimes]</span></th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">અકсар <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Often]</span></th>
                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">સંમેશા <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Always]</span></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">કેતાંનો પ્રકોપ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Pest infestation]</span></td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_કેતાંનો પ્રકોપ" value="ઘણો વખત નહીં" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_કેતાંનો પ્રકોપ" value="ક્યારેક-ક્યારેક" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_કેતાંનો પ્રકોપ" value="અકсар" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_કેતાંનો પ્રકોપ" value="સંમેશા" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">પાણીની કમી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Water shortage]</span></td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_પાણીની કમી" value="ઘણો વખત નહીં" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_પાણીની કમી" value="ક્યારેક-ક્યારેક" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_પાણીની કમી" value="અકсар" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_પાણીની કમી" value="સંમેશા" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">બજારના મૂલ્યમાં ઊતાર-ચઢાવ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Market price fluctuations]</span></td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_બજારના મૂલ્યમાં ઊતાર-ચઢાવ" value="ઘણો વખત નહીં" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_બજારના મૂલ્યમાં ઊતાર-ચઢાવ" value="ક્યારેક-ક્યારેક" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_બજારના મૂલ્યમાં ઊતાર-ચઢાવ" value="અકсар" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_બજારના મૂલ્યમાં ઊતાર-ચઢાવ" value="સંમેશા" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">સભ્ય ગુણવત્તાવાળા બીજોની કમી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Lack of good quality seeds]</span></td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_સભ્ય ગુણવત્તાવાળા બીજોની કમી" value="ઘણો વખત નહીં" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_સભ્ય ગુણવત્તાવાળા બીજોની કમી" value="ક્યારેક-ક્યારેક" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_સભ્ય ગુણવત્તાવાળા બીજોની કમી" value="અકсар" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_સભ્ય ગુણવત્તાવાળા બીજોની કમી" value="સંમેશા" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="p-2 font-medium">વરસાદનું પાણી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Rainwater]</span></td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_વરસાદનું પાણી" value="ઘણો વખત નહીં" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_વરસાદનું પાણી" value="ક્યારેક-ક્યારેક" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_વરસાદનું પાણી" value="અકсар" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                              <td className="p-2 text-center">
                                <input type="radio" name="Gujarati_q_7_વરસાદનું પાણી" value="સંમેશા" className="text-brand-green" onChange={handleInputChange} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">7. દર મોસમમાં ઉત્પાદનનો ખર્ચ. <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Cost of Production per season]</span></label>
                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">મજૂરી ખર્ચ (પ્રતિ કલાક) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Labor cost (per hour)]</span></label>
                          <input type="text" name="Gujarati_q_8_મજૂરી ખર્ચ (પ્રતિ કલાક)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">બીજ (દર કિલોગ્રામ) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Seeds (per kg)]</span></label>
                          <input type="text" name="Gujarati_q_8_બીજ (દર કિલોગ્રામ)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">ખેડાણ વાળી ખાતર (દર કિલોગ્રામ) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Fertilizers (per kg)]</span></label>
                          <input type="text" name="Gujarati_q_8_ખેડાણ વાળી ખાતર (દર કિલોગ્રામ)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">પોકાટોરજ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Pesticides]</span></label>
                          <input type="text" name="Gujarati_q_8_પોકાટોરજ" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">ઉપકરણ અને ઈંધણ (પ્રતિ કલાક) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Equipment and fuel (per hour)]</span></label>
                          <input type="text" name="Gujarati_q_8_ઉપકરણ અને ઈંધણ (પ્રતિ કલાક)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">જલસંચય (દર મહિને) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Irrigation (per month)]</span></label>
                          <input type="text" name="Gujarati_q_8_જલસંચય (દર મહિને)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">જમીન ભાડું (પ્રતિ મહીનો) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Land rent (per month)]</span></label>
                          <input type="text" name="Gujarati_q_8_જમીન ભાડું (પ્રતિ મહીનો)" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">8. તમારા ખેતરમાં સિંચાઇનો મુખ્ય રીત કયો છે? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[What is the primary method of irrigation used on your farm?]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_9_ખાડી સિંચાઈ" value="ખાડી સિંચાઈ" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ખાડી સિંચાઈ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Canal irrigation]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_9_ટ્યૂબવેલ (નળકૂપ)" value="ટ્યૂબવેલ (નળકૂપ)" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ટ્યૂબવેલ (નળકૂપ) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Tube well]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_9_વર્ષા આધારિત" value="વર્ષા આધારિત" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>વર્ષા આધારિત <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Rain-fed]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_9_ડ્રિપ સિંચાઈ" value="ડ્રિપ સિંચાઈ" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ડ્રિપ સિંચાઈ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Drip irrigation]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_9_સ્પ્રિંકલર (છાંટણી) પ્રણાળી" value="સ્પ્રિંકલર (છાંટણી) પ્રણાળી" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>સ્પ્રિંકલર (છાંટણી) પ્રણાળી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Sprinkler system]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">9. તમે તમારી જમીનની માટીની ગુણવત્તા કેવી રીતે નોંધશો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[How would you rate your soil quality?]</span></label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_10" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_10" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_10" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_10" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_10" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">10. પ્રત્યેક સિઝનમાં અંદાજિત કુલ ઉત્પાદન ખર્ચ. <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Total estimated Cost of Production per season]</span></label>
                      <input type="text" name="Gujarati_q_11" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">11. કુલ અનુમાનિત વેચાણ કિંમત <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Total estimated Selling Price]</span></label>
                      <input type="text" name="Gujarati_q_12" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">12. તમારે પાસે કેટલા હેક્ટર જમીન છે <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[How much land (in Hectares) do you own/rent?]</span></label>
                      <input type="text" name="Gujarati_q_13" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">13. આમાંથી કેદી કૃષિ સહાયતા સેવાઓ તમારા માટે સૌથી વધુ લાભદાયક હશે? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Which of these agricultural support services would be most beneficial to you?]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_14" value="રિયાયતી ખાતર (સબસિડીવાળો ખાતર)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>રિયાયતી ખાતર (સબસિડીવાળો ખાતર) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Subsidized Fertilizer]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_14" value="ઘટ વ્યાજવાળા કૃષિ લોન" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>ઘટ વ્યાજવાળા કૃષિ લોન <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Low-interest agriculture loan]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_14" value="આધુનિક ખેતી પર ટેકનિકલ તાલીમ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>આધુનિક ખેતી પર ટેકનિકલ તાલીમ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Technical training on modern farming]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_14" value="બજાર સુધી પહોંચ અને લોજિસ્ટિક્સ સપોર્ટ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>બજાર સુધી પહોંચ અને લોજિસ્ટિક્સ સપોર્ટ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Market access and logistics support]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_14" value="હવામાન પૂર્વાનુમાન ચેતવણી" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>હવામાન પૂર્વાનુમાન ચેતવણી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Weather forecast warning]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">14. તમે સરકારની કૃષિ યોજનાઓ સુધી પહોંચવાનો તમારો સ્તર કેવી રીતે માપો છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[How would you rate your level of access to government agricultural schemes?]</span></label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_15" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_15" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_15" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_15" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_15" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">15. તમે સામાન્ય રીતે લોન કેટલી દરે લેતા છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[At what rate of interest do you take loan normally?]</span></label>
                      <input type="text" name="Gujarati_q_16" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">16. બ્યાજનો પ્રકાર <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Type of Interest]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_17_ચક્રવદ્ધિ વ્યાજ" value="ચક્રવદ્ધિ વ્યાજ" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ચક્રવદ્ધિ વ્યાજ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Compound interest]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_17_સરળ વ્યાજ" value="સરળ વ્યાજ" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>સરળ વ્યાજ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Simple interest]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">17. તમે ક્યાથી કાળા લેવો છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[From whom do you take loan?]</span></label>
                      <input type="text" name="Gujarati_q_18" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">18. ઉત્પાદન કેટલી છે (ક્વિન્ટલમાં)? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[How much is the produce (in Quintals)?]</span></label>
                      <input type="text" name="Gujarati_q_19" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">19. તમે ઉપર જણાવેલ પાકો કેટલીમાં વેચો છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[For how much do you sell the above-mentioned crops?]</span></label>
                      <input type="text" name="Gujarati_q_20" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">20. તમે તમારી ખેતીનું ઉત્પાદન મુખ્યત્વે કેવી રીતે વેચો છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[How do you primarily sell your agricultural produce?]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="સ્થાનિક બજાર / APMC બજાર" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>સ્થાનિક બજાર / APMC બજાર <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Local Market / APMC Market]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="સિધા ખાનગી વેપારીઓ / એગ્રિગેટર્સ સુધી" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>સિધા ખાનગી વેપારીઓ / એગ્રિગેટર્સ સુધી <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Direct to private merchants / Aggregators]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="સંધિ કૃષિ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>સંધિ કૃષિ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Contract farming]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="સીધા સામાન્ય વપરાશકર્તાઓ સુધી (કૃષક બજાર)" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>સીધા સામાન્ય વપરાશકર્તાઓ સુધી (કૃષક બજાર) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Direct to consumers (Farmer market)]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="ઓનલાઇન પ્લેટફોર્મ / ઈ-કોમર્સ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>ઓનલાઇન પ્લેટફોર્મ / ઈ-કોમર્સ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Online platform / E-commerce]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="Gujarati_q_21" value="સહકારી સોસાયટીઓ" className="text-brand-green focus:ring-brand-green" onChange={handleInputChange} />
                          <span>સહકારી સોસાયટીઓ <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Cooperative societies]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">21. જો તમે બહુવિધ વેચાણ ચેનલોનો ઉપયોગ કરો છો, તો કૃપા કરીને સમજાવો <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[If you use multiple selling channels, please explain]</span></label>
                      <input type="text" name="Gujarati_q_22" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">22. શું તમે તમારી પાકને અમારા પ્લેટફોર્મ પર સૂચિબદ્ધ કરવા માંગો છો?(ફક્ત જો તમને સમજાવવામાં આવ્યું હોય) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Would you like to list your crop on our platform?]</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_23_હાં" value="હાં" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>હાં <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Yes]</span></span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" name="Gujarati_q_23_ના" value="ના" className="text-brand-green focus:ring-brand-green rounded" onChange={handleInputChange} />
                          <span>ના <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[No]</span></span>
                        </label>
                      </div>
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">23. શું તમે કોઈ વધારાની ટિપ્પણીઓ કે પડકારો જણાવવા ઈચ્છો છો? <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[Any additional comments or challenges you wish to report?]</span></label>
                      <input type="text" name="Gujarati_q_24" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={handleInputChange} />
                    </div>
                    <div className="break-inside-avoid">
                      <label className="block font-semibold text-gray-800 mb-2">24. તમે અમને કેટલા નંબર આપશો? (ફક્ત જો તમને પહેલા સમજાવવામાં આવી હોય તો) <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[What will you rate us? (Only if you are explained before)]</span></label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="1" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">1</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="2" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">2</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="3" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">3</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="4" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">4</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="5" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">5</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="6" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">6</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="7" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">7</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="8" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">8</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="9" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">9</span>
                        </label>
                        <label className="flex flex-col items-center">
                          <input type="radio" name="Gujarati_q_25" value="10" className="text-brand-green focus:ring-brand-green mb-1" onChange={handleInputChange} />
                          <span className="text-sm">10</span>
                        </label>
                      </div>
                    </div>
                  </>)}
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
