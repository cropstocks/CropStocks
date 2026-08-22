import json

data = json.load(open('all_questions.json', encoding='utf-8'))

def clean_title(title):
    return title.split('/')[0].strip().replace("'", "\\'")

sections = {
    'English': data[1:25],
    'Hindi': data[25:51],
    'Gujarati': data[51:77]
}

guj_translations = {
    'ફોર્મ યોગ્ય રીતે': 'Please fill the form correctly',
    'શેર નહીં': 'Your Data will not be shared further',
    'કલેક્શન': 'Name of Data collector (Only for employees)',
    'પૂરું નામ': 'Full Name of Farmer',
    'સંપર્ક': 'Contact Number',
    'મુખ્ય ખેતી': 'Primary Farming Location (State)',
    'કઈ ફસલો': 'Which of the crops are currently under cultivation?',
    'ચેલેન્જોની': 'Indicate the frequency of the following farming challenges',
    'ઉત્પાદનનો ખર્ચ': 'Cost of Production per season',
    'સિંચાઇનો': 'What is the primary method of irrigation used on your farm?',
    'માટીની ગુણવત્તા': 'How would you rate your soil quality?',
    'કુલ ઉત્પાદન ખર્ચ': 'Total estimated Cost of Production per season',
    'વેચાણ કિંમત': 'Total estimated Selling Price',
    'કેટલા હેક્ટર': 'How much land (in Hectares) do you own/rent?',
    'કૃષિ સહાયતા': 'Which of these agricultural support services would be most beneficial to you?',
    'કૃષિ યોજનાઓ': 'How would you rate your level of access to government agricultural schemes?',
    'કેટલી દરે': 'At what rate of interest do you take loan normally?',
    'બ્યાજનો': 'Type of Interest',
    'કાળા લેવો': 'From whom do you take loan?',
    'કેટલી છે (ક્વિન્ટલમાં)': 'How much is the produce (in Quintals)?',
    'પાકો કેટલીમાં વેચો': 'For how much do you sell the above-mentioned crops?',
    'મુખ્યત્વે કેવી રીતે વેચો': 'How do you primarily sell your agricultural produce?',
    'વેચાણ ચેનલ્સ': 'If you use multiple selling channels, please explain',
    'પ્લેટફોર્મ પર સૂચિબદ્ધ': 'Would you like to list your crop on our platform?',
    'ટિપ્પણીઓ કે પડકારો': 'Any additional comments or challenges you wish to report?',
    'કેટલા નંબર': 'What will you rate us? (Only if you are explained before)'
}

guj_opt_translations = {
    'મનન પાંડે': 'Manan Pandey',
    'મનસ વિનોદ': 'Manas Vinod',
    'આરાધ્યા ગર્ગ': 'Aradhya Garg',
    'શ્રેયસ દાસ': 'Shreyas Das',
    'દેવાંશ મોરે': 'Devansh More',
    'નમિત ભાટિયા': 'Namit Bhatia',
    'ઘણો વખત નહીં': 'Rarely',
    'ક્યારેક-ક્યારેક': 'Sometimes',
    'અકસાર': 'Often',
    'અકसार': 'Often',
    'અક\u0441\u0430\u0440': 'Often',
    'સંમેશા': 'Always',
    'ખાડી સિંચાઈ': 'Canal irrigation',
    'ટ્યૂબવેલ': 'Tube well',
    'વર્ષા આધારિત': 'Rain-fed',
    'ડ્રિપ સિંચાઈ': 'Drip irrigation',
    'સ્પ્રિંકલર': 'Sprinkler system',
    'રિયાયતી ખાતર': 'Subsidized Fertilizer',
    'ઘટ વ્યાજવાળા': 'Low-interest agriculture loan',
    'આધુનિક ખેતી': 'Technical training on modern farming',
    'બજાર સુધી': 'Market access and logistics support',
    'હવામાન પૂર્વાનુમાન': 'Weather forecast warning',
    'ચક્રવદ્ધિ વ્યાજ': 'Compound interest',
    'સરળ વ્યાજ': 'Simple interest',
    'સ્થાનિક બજાર / APMC બજાર': 'Local Market / APMC Market',
    'સિધા ખાનગી વેપારીઓ / એગ્રિગેટર્સ સુધી': 'Direct to private merchants / Aggregators',
    'સંધિ કૃષિ': 'Contract farming',
    'સ rightsધારણ વપરાશકર્તાઓ સુધી (કૃષક બજાર)': 'Direct to consumers (Farmer market)',
    'ઓનલાઇન પ્લેટફોર્મ / ઈ-કોમર્સ': 'Online platform / E-commerce',
    'સહકારી સોસાયટીઓ': 'Cooperative societies',
    'હાં': 'Yes',
    'ના': 'No',
    # New row translations
    'કેતાંનો પ્રકોપ': 'Pest infestation',
    'પાણીની કમી': 'Water shortage',
    'બજારના મૂલ્યમાં ઊતાર-ચઢાવ': 'Market price fluctuations',
    'સભ્ય ગુણવત્તાવાળા બીજોની કમી': 'Lack of good quality seeds',
    'વરસાદનું પાણી': 'Rainwater',
    'મજૂરી ખર્ચ (પ્રતિ કલાક)': 'Labor cost (per hour)',
    'બીજ (દર કિલોગ્રામ)': 'Seeds (per kg)',
    'ખેડાણ વાળી ખાતર (દર કિલોગ્રામ)': 'Fertilizers (per kg)',
    'પોકાટોરજ': 'Pesticides',
    'ઉપકરણ અને ઈંધણ (પ્રતિ કલાક)': 'Equipment and fuel (per hour)',
    'જલસંચય (દર મહિને)': 'Irrigation (per month)',
    'જમીન ભાડું (પ્રતિ મહીનો)': 'Land rent (per month)'
}

for lang, qs in sections.items():
    for q in qs:
        if q['type'] in (2, 3, 4) and q['options'] and len(q['options'][0]['opts']) > 10:
            q['type'] = 0
            q['options'] = []
        if q['type'] == 7 and q['options'] and len(q['options'][0]['opts']) > 5:
            q['type'] = 'grid_to_text'
            
        if lang == 'Gujarati' and 'मुख्य खेती का स्थान (राज्य)' in q['title']:
            q['title'] = 'મુખ્ય ખેતીનું સ્થળ (રાજ્ય)'

react_code = """import React, { useState } from 'react';

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
"""

for lang, qs in sections.items():
    react_code += f"                  {{language === '{lang}' && (<>\n"
    q_counter = 1
    for idx, q in enumerate(qs):
        title = clean_title(q['title'])
        q_type = q['type']
        opts = q['options']
        
        eng_trans = ""
        if lang == 'Gujarati':
            for k, v in guj_translations.items():
                if k in title:
                    eng_trans = f' <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[{v}]</span>'
                    break
                    
        def get_opt_trans(opt_text):
            if lang != 'Gujarati': return ""
            for k, v in guj_opt_translations.items():
                if k == 'હાં' or k == 'ના':
                    if opt_text.strip() == k:
                        return f' <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[{v}]</span>'
                else:
                    # For longer strings, substring match is safe and avoids typo issues
                    if k in opt_text:
                        return f' <span className="text-xs text-gray-500 font-normal ml-1 print:text-[10px]">[{v}]</span>'
            return ""
        
        if q_type in (8, 11):
            react_code += f'                    <div className="mb-6 text-gray-700 italic">{title}{eng_trans}</div>\n'
            continue
            
        react_code += f'                    <div className="break-inside-avoid">\n                      <label className="block font-semibold text-gray-800 mb-2">{q_counter}. {title}{eng_trans}</label>\n'
        q_counter += 1
        name = f'{lang}_q_{idx}'
        if q_type in (0, 1):
            react_code += f'                      <input type="text" name="{name}" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={{handleInputChange}} />\n'
        elif q_type in (3, 4):
            react_code += '                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o_clean = str(o).replace("'", "\\'")
                    opt_tr = get_opt_trans(str(o))
                    react_code += f'                        <label className="flex items-center space-x-2">\n                          <input type="radio" name="{name}" value="{o_clean}" className="text-brand-green focus:ring-brand-green" onChange={{handleInputChange}} />\n                          <span>{o_clean}{opt_tr}</span>\n                        </label>\n'
            react_code += '                      </div>\n'
        elif q_type == 2:
            react_code += '                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o_clean = str(o).replace("'", "\\'")
                    opt_tr = get_opt_trans(str(o))
                    react_code += f'                        <label className="flex items-center space-x-2">\n                          <input type="checkbox" name="{name}_{o_clean}" value="{o_clean}" className="text-brand-green focus:ring-brand-green rounded" onChange={{handleInputChange}} />\n                          <span>{o_clean}{opt_tr}</span>\n                        </label>\n'
            react_code += '                      </div>\n'
        elif q_type in (5, 18):
            react_code += '                      <div className="flex flex-wrap gap-4">\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o_clean = str(o).replace("'", "\\'")
                    opt_tr = get_opt_trans(str(o))
                    react_code += f'                        <label className="flex flex-col items-center">\n                          <input type="radio" name="{name}" value="{o_clean}" className="text-brand-green focus:ring-brand-green mb-1" onChange={{handleInputChange}} />\n                          <span className="text-sm">{o_clean}{opt_tr}</span>\n                        </label>\n'
            react_code += '                      </div>\n'
        elif q_type == 7:
            react_code += '                      <div className="overflow-x-auto">\n                        <table className="w-full text-left border-collapse">\n                          <thead>\n                            <tr>\n                              <th className="p-2 border-b-2 border-gray-300"></th>\n'
            if opts and len(opts)>0 and opts[0]['opts']:
                for o in opts[0]['opts']:
                    if not o: continue
                    o_clean = str(o).replace("'", "\\'")
                    opt_tr = get_opt_trans(str(o))
                    react_code += f'                              <th className="p-2 border-b-2 border-gray-300 text-sm font-medium">{o_clean}{opt_tr}</th>\n'
            react_code += '                            </tr>\n                          </thead>\n                          <tbody>\n'
            for row in opts:
                r_name = row['name'].replace("'", "\\'")
                row_tr = get_opt_trans(row['name'])
                react_code += f'                            <tr className="border-b border-gray-200">\n                              <td className="p-2 font-medium">{r_name}{row_tr}</td>\n'
                for o in row['opts']:
                    if not o: continue
                    o_clean = str(o).replace("'", "\\'")
                    react_code += f'                              <td className="p-2 text-center">\n                                <input type="radio" name="{name}_{r_name}" value="{o_clean}" className="text-brand-green" onChange={{handleInputChange}} />\n                              </td>\n'
                react_code += '                            </tr>\n'
            react_code += '                          </tbody>\n                        </table>\n                      </div>\n'
        elif q_type == 'grid_to_text':
            react_code += '                      <div className="space-y-4 mt-2">\n'
            for row in opts:
                r_name = row['name'].replace("'", "\\'")
                row_tr = get_opt_trans(row['name'])
                react_code += f'                        <div>\n                          <label className="block text-sm text-gray-700 mb-1">{r_name}{row_tr}</label>\n                          <input type="text" name="{name}_{r_name}" className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" onChange={{handleInputChange}} />\n                        </div>\n'
            react_code += '                      </div>\n'
        react_code += '                    </div>\n'
    react_code += '                  </>)}\n'

react_code += """                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
"""

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(react_code)
