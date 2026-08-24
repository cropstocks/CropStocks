const fs = require('fs');
let c = fs.readFileSync('client/src/pages/DocumentGenerator.jsx', 'utf8');

c = c.replace(/startDate: '',\\s*}\\);/, \startDate: '',
    partyC: 'CO-FOUNDER 3', titleC: '(Co-Founder)',
    partyD: 'CO-FOUNDER 4', titleD: '(Co-Founder)',
    partyE: 'CO-FOUNDER 5', titleE: '(Co-Founder)',
    partyF: 'CO-FOUNDER 6', titleF: '(Co-Founder)',
  });\);

c = c.replace('<option value=\"hiring\">Hiring / Employment Contract</option>', \<option value=\"hiring\">Hiring / Employment Contract</option>
              <option value=\"founders6\">Founders Agreement (6 people)</option>
              <option value=\"exit\">Co-Founder Exit Clause</option>
              <option value=\"shareholder\">Shareholder Agreement</option>
              <option value=\"cap\">CAP Table</option>
              <option value=\"eso\">ESO Agreement</option>
              <option value=\"ip\">IP Assignment Agreement</option>\);

const docsInsert = \
          {docType === 'founders6' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Founders Agreement (6 Co-Founders)</h1>
              <p className=\"mb-6\">This Founders Agreement is entered into as of <strong>{formData.date}</strong> by and between the six founding members of the Company.</p>
              <h2 className=\"font-bold mb-4\">1. PURPOSE</h2>
              <p className=\"mb-6\">The purpose of this Agreement is to outline the roles, responsibilities, equity ownership, and vesting schedules of all six co-founders to ensure mutual alignment and business continuity.</p>
              <h2 className=\"font-bold mb-4\">2. EQUITY BREAKDOWN</h2>
              <p className=\"mb-6\">The founders agree to divide the initial equity as follows, subject to standard 4-year vesting with a 1-year cliff.</p>
            </div>
          )}

          {docType === 'exit' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Co-Founder Exit Clause</h1>
              <p className=\"mb-6\">This Exit Clause is effective as of <strong>{formData.date}</strong> and governs the terms under which a Co-Founder may exit the Company or be terminated.</p>
              <h2 className=\"font-bold mb-4\">1. CONDITIONS OF EXIT</h2>
              <p className=\"mb-6\">In the event of a voluntary or involuntary exit of a Co-Founder, their unvested shares shall be repurchased by the Company at nominal value. The execution of this exit requires the formal signature of a minimum of two (2) remaining Co-Founders.</p>
            </div>
          )}

          {docType === 'shareholder' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Shareholder Agreement</h1>
              <p className=\"mb-6\">This Shareholder Agreement is entered into on <strong>{formData.date}</strong>.</p>
              <h2 className=\"font-bold mb-4\">1. SHAREHOLDER RIGHTS AND DUTIES</h2>
              <p className=\"mb-6\">This document outlines the rights, privileges, and obligations of the shareholders, including voting rights, dividend policies, and restrictions on the transfer of shares.</p>
            </div>
          )}

          {docType === 'cap' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Capitalization Table (CAP Table)</h1>
              <p className=\"mb-6\">As of <strong>{formData.date}</strong>, the following represents the capitalization structure of the Company.</p>
              <table className=\"w-full border-collapse border border-gray-400 mb-6\">
                <thead>
                  <tr className=\"bg-gray-100\">
                    <th className=\"border border-gray-400 p-2\">Shareholder</th>
                    <th className=\"border border-gray-400 p-2\">Shares Owned</th>
                    <th className=\"border border-gray-400 p-2\">Ownership %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className=\"border border-gray-400 p-2\">{formData.partyA}</td><td className=\"border border-gray-400 p-2\">1,000,000</td><td className=\"border border-gray-400 p-2\">50%</td></tr>
                  <tr><td className=\"border border-gray-400 p-2\">{formData.partyB}</td><td className=\"border border-gray-400 p-2\">1,000,000</td><td className=\"border border-gray-400 p-2\">50%</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {docType === 'eso' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Employee Stock Option (ESO) Agreement</h1>
              <p className=\"mb-6\">This ESO Agreement is granted on <strong>{formData.date}</strong> to {formData.partyB}.</p>
              <h2 className=\"font-bold mb-4\">1. OPTION GRANT</h2>
              <p className=\"mb-6\">The Company hereby grants the Employee an option to purchase shares of the Company's common stock, subject to the vesting schedule and terms defined in the Company's Stock Option Plan.</p>
            </div>
          )}

          {docType === 'ip' && (
            <div>
              <div className=\"flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center\">
                <img src=\"/logo.png\" alt=\"Logo\" className=\"w-full max-w-[600px] object-contain mix-blend-multiply\" />
              </div>
              <h1 className=\"text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4\">Intellectual Property (IP) Assignment Agreement</h1>
              <p className=\"mb-6\">This IP Assignment Agreement is entered into on <strong>{formData.date}</strong>.</p>
              <h2 className=\"font-bold mb-4\">1. ASSIGNMENT OF IP</h2>
              <p className=\"mb-6\">The Assignor ({formData.partyB}) hereby irrevocably assigns, transfers, and conveys to the Assignee ({formData.partyA}) all rights, title, and interest in and to any intellectual property created during the course of their engagement with the Company.</p>
            </div>
          )}
\;

c = c.replace(/              <\/td>\\s*<\/tr>\\s*<\/tbody>/, docsInsert + '\\n              </td>\\n            </tr>\\n          </tbody>');

const tfootReplace = \<tfoot className=\"table-footer-group\">
            <tr>
              <td className=\"px-10 md:px-16 print:px-0 pb-10 md:pb-16 print:pb-0\">
                {docType === 'founders6' ? (
                  <div className=\"grid grid-cols-3 gap-8 text-center mt-12 mb-8\">
                    {[ 
                      { p: formData.partyA, t: formData.titleA },
                      { p: formData.partyB, t: formData.titleB },
                      { p: formData.partyC, t: formData.titleC },
                      { p: formData.partyD, t: formData.titleD },
                      { p: formData.partyE, t: formData.titleE },
                      { p: formData.partyF, t: formData.titleF },
                    ].map((f, i) => (
                      <div key={i} className=\"flex flex-col items-center\">
                        <div className=\"border-t border-[#446688] w-40 pt-2\">
                          <p className=\"uppercase text-xs font-bold\">{f.p}</p>
                          <p className=\"italic text-[10px]\">{f.t}</p>
                        </div>
                        <p className=\"mt-4 text-xs\">{formData.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=\"flex justify-between items-center text-center mt-12 mb-8\">
                    <div className=\"w-1/2 flex flex-col items-center\">
                      <div className=\"border-t border-[#446688] w-64 pt-2\">
                        <p className=\"uppercase\">{formData.partyA}</p>
                        <p className=\"italic text-sm\">{formData.titleA}</p>
                      </div>
                      <p className=\"mt-8\">{formData.date}</p>
                    </div>
                    <div className=\"w-1/2 flex flex-col items-center\">
                      <div className=\"border-t border-[#446688] w-64 pt-2\">
                        <p className=\"uppercase\">{formData.partyB}</p>
                        <p className=\"italic text-sm\">{formData.titleB}</p>
                      </div>
                      <p className=\"mt-8\">{formData.date}</p>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tfoot>\;

c = c.replace(/<tfoot className=\"table-footer-group\">[\\s\\S]*?<\/tfoot>/, tfootReplace);
fs.writeFileSync('client/src/pages/DocumentGenerator.jsx', c);
