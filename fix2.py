with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

new_header = """import React, { useState } from 'react';

export default function FarmerSurveyForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? value : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit survey');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting survey');
    }
    setIsSubmitting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your survey response has been recorded successfully.</p>
          <button onClick={() => window.location.reload()} className="btn-primary px-6 py-2">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light font-body min-h-screen pb-10">
      <div className="bg-brand-dark text-white p-4 flex justify-between items-center print:hidden shadow-md sticky top-0 z-50">
        <h2 className="font-bold text-lg tracking-wider hidden sm:block">CropStocks™ Survey</h2>
        <div className="flex space-x-2 bg-brand-light/10 p-1 rounded-lg">
          {['English', 'Hindi', 'Gujarati'].map(lang => (
            <button 
              key={lang}
              onClick={() => setLanguage(lang)}
              type="button"
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${language === lang ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-300 hover:text-white'}`}
            >
              {lang}
            </button>
          ))}
        </div>
        <button onClick={handlePrint} type="button" className="btn-primary px-4 py-1.5 flex items-center space-x-2 bg-brand-green hover:bg-brand-gold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      <div className="relative bg-white shadow-lg print:shadow-none max-w-4xl mx-auto border border-gray-200 print:border-none font-sans text-black text-[15px] leading-[1.8] min-h-screen">
        <div className="absolute print:fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-1/2 md:w-[45%] print:w-[45%] object-contain mix-blend-multiply" />
        </div>

        <form onSubmit={handleSubmit} className="w-full relative z-10">
          <table className="w-full">
"""

form_start_idx = text.find('<table className="w-full')
text = new_header + text[form_start_idx + len('<table className="w-full">'):]

text = text.replace('<form className="space-y-8">', '')
text = text.replace('                </form>', '')

footer = """                  <div className="mt-8 flex justify-center print:hidden">
                    <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3 w-full md:w-auto font-bold tracking-wider">
                      {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                    </button>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
"""
footer_start = text.find('              </td>\\n            </tr>')
text = text[:footer_start] + footer

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
