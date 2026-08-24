import json
data = json.load(open('all_questions.json', encoding='utf-8'))

# Clean titles
def clean_title(title):
    return title.split('/')[0].strip().replace("'", "\\'")

# Define sections
sections = {
    'English': data[1:25],
    'Hindi': data[25:51],
    'Gujarati': data[51:77]
}

# Simplify options to reduce size
for lang, qs in sections.items():
    for q in qs:
        # if multiple choice/dropdown with > 10 options, convert to text input
        if q['type'] in (2, 3, 4) and q['options'] and len(q['options'][0]['opts']) > 10:
            q['type'] = 0
            q['options'] = []
        # if grid with > 5 options, convert to multiple text inputs
        if q['type'] == 7 and q['options'] and len(q['options'][0]['opts']) > 5:
            q['type'] = 'grid_to_text'

# Build React code
react_code = '''import React, { useState } from 'react';

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
'''

# We can just embed the questions as a JS object or generate the JSX directly.
# Generating JSX directly is easier to debug formatting.
react_code += '''
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden mb-8 space-y-6">
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
              <option value="Hindi">?????</option>
              <option value="Gujarati">???????</option>
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

      <div className="relative bg-white shadow-lg print:shadow-none mx-auto border border-gray-200 print:border-none font-sans text-black text-[15px] leading-[1.8] min-h-screen">
        <div className="absolute print:fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-3/4 md:w-2/3 print:w-[65%] object-contain mix-blend-multiply" />
        </div>

        <div className="relative z-10 p-10 md:p-16 print:p-0">
          <div className="flex justify-center -mb-8 md:-mb-16 overflow-hidden max-h-48 md:max-h-64 items-center">
            <img src="/logo.png" alt="Logo" className="w-full max-w-[600px] object-contain mix-blend-multiply" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">
            {language === 'English' ? 'Farmer Profile and Agricultural Survey' : 
             language === 'Hindi' ? '????? ???????? ?? ???? ?????????' : '????? ???????? ??? ???? ?????????'}
          </h1>
          
          <form className="space-y-8">
'''

for lang, qs in sections.items():
    react_code += f"            {{language === '{lang}' && (<>\\n"
    for idx, q in enumerate(qs):
        title = clean_title(q['title'])
        q_type = q['type']
        opts = q['options']
        
        if q_type in (8, 11):
            react_code += f'              <div className="mb-6 text-gray-700 italic">{title}</div>\\n'
            continue
            
        react_code += f'              <div className="break-inside-avoid">\\n                <label className="block font-semibold text-gray-800 mb-2">{idx + 1}. {title}</label>\\n'
        name = f'{lang}_q_{idx}'
        if q_type in (0, 1):
            react_code += f'                <input type="text" name="{name}" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={{handleInputChange}} />\\n'
        elif q_type in (3, 4):
            react_code += '                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">\\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o = str(o).replace("'", "\\'")
                    react_code += f'                  <label className="flex items-center space-x-2">\\n                    <input type="radio" name="{name}" value="{o}" className="text-brand-green focus:ring-brand-green" onChange={{handleInputChange}} />\\n                    <span>{o}</span>\\n                  </label>\\n'
            react_code += '                </div>\\n'
        elif q_type == 2:
            react_code += '                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">\\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o = str(o).replace("'", "\\'")
                    react_code += f'                  <label className="flex items-center space-x-2">\\n                    <input type="checkbox" name="{name}_{o}" value="{o}" className="text-brand-green focus:ring-brand-green rounded" onChange={{handleInputChange}} />\\n                    <span>{o}</span>\\n                  </label>\\n'
            react_code += '                </div>\\n'
        elif q_type in (5, 18):
            react_code += '                <div className="flex flex-wrap gap-4">\\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    o = str(o).replace("'", "\\'")
                    react_code += f'                  <label className="flex flex-col items-center">\\n                    <input type="radio" name="{name}" value="{o}" className="text-brand-green focus:ring-brand-green mb-1" onChange={{handleInputChange}} />\\n                    <span className="text-sm">{o}</span>\\n                  </label>\\n'
            react_code += '                </div>\\n'
        elif q_type == 7:
            react_code += '                <div className="overflow-x-auto">\\n                  <table className="w-full text-left border-collapse">\\n                    <thead>\\n                      <tr>\\n                        <th className="p-2 border-b-2 border-gray-300"></th>\\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    o = str(o).replace("'", "\\'")
                    react_code += f'                        <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">{o}</th>\\n'
            react_code += '                      </tr>\\n                    </thead>\\n                    <tbody>\\n'
            for row in opts:
                r_name = row['name'].replace("'", "\\'")
                react_code += f'                      <tr className="border-b border-gray-200">\\n                        <td className="p-2 font-medium">{r_name}</td>\\n'
                for o in row['opts']:
                    react_code += f'                        <td className="p-2 text-center">\\n                          <input type="radio" name="{name}_{r_name}" value="{o}" className="text-brand-green" onChange={{handleInputChange}} />\\n                        </td>\\n'
                react_code += '                      </tr>\\n'
            react_code += '                    </tbody>\\n                  </table>\\n                </div>\\n'
        elif q_type == 'grid_to_text':
            react_code += '                <div className="space-y-4 mt-2">\\n'
            for row in opts:
                r_name = row['name'].replace("'", "\\'")
                react_code += f'                  <div>\\n                    <label className="block text-sm text-gray-700 mb-1">{r_name}</label>\\n                    <input type="text" name="{name}_{r_name}" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={{handleInputChange}} />\\n                  </div>\\n'
            react_code += '                </div>\\n'
        react_code += '              </div>\\n'
    react_code += '            </>)}\n'

react_code += '''          </form>
        </div>
      </div>
    </div>
  );
}
'''

open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8').write(react_code.replace('\\n', '\n'))
