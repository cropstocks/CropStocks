import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { surveyConfig, staticText } from '../utils/surveyTranslations';

const getLabel = (obj, lang) => {
  const code = lang === 'English' ? 'en' : lang === 'Hindi' ? 'hi' : 'gu';
  if (code === 'en') return obj.en;
  return (
    <>
      {obj[code]} <span className="text-sm font-normal italic text-gray-500">[{obj.en}]</span>
    </>
  );
};

export default function FarmerSurveyForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState(localStorage.getItem('surveyLanguage') || 'English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(JSON.parse(localStorage.getItem('offlineSurveys') || '[]'));

  useEffect(() => {
    localStorage.setItem('surveyLanguage', language);
  }, [language]);

  useEffect(() => {
    const handleOnline = () => {
      if (offlineQueue.length > 0) {
        if (window.confirm("You are back online! Would you like to sync your saved surveys to the cloud now?")) {
          syncOfflineSurveys();
        }
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [offlineQueue]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentVals = prev[name] ? prev[name].split(',') : [];
        if (checked) {
          return { ...prev, [name]: [...currentVals, value].join(',') };
        } else {
          return { ...prev, [name]: currentVals.filter(v => v !== value).join(',') };
        }
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSpeak = (q) => {
    if (window.currentAudio) {
      window.currentAudio.pause();
    }
    
    // We now use the bundled local MP3 files for 100% offline reliability
    const url = `/audio/${q.id}.mp3`;
    
    window.currentAudio = new Audio(url);
    window.currentAudio.play().catch(e => {
      console.error("Audio playback error:", e);
      alert("Failed to play audio. Audio file might be missing.");
    });
  };

  const syncOfflineSurveys = async () => {
    if (!navigator.onLine) {
      alert("You are still offline! Please connect to Wi-Fi or Cellular Data before syncing.");
      return;
    }
    if (offlineQueue.length === 0) return;
    setIsSubmitting(true);
    let synced = 0;
    try {
      for (const survey of offlineQueue) {
        await addDoc(collection(db, 'surveys'), {
          data: JSON.stringify(survey.data),
          createdAt: new Date(survey.timestamp)
        });
        synced++;
      }
      localStorage.removeItem('offlineSurveys');
      setOfflineQueue([]);
      alert(`Successfully synced ${synced} surveys to the cloud!`);
    } catch (err) {
      alert(`Sync failed after ${synced} surveys. Please check your internet connection.`);
      const remaining = offlineQueue.slice(synced);
      localStorage.setItem('offlineSurveys', JSON.stringify(remaining));
      setOfflineQueue(remaining);
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!navigator.onLine) {
      const newQueue = [...offlineQueue, { data: formData, timestamp: new Date().toISOString() }];
      localStorage.setItem('offlineSurveys', JSON.stringify(newQueue));
      setOfflineQueue(newQueue);
      setSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'surveys'), {
        data: JSON.stringify(formData),
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Firebase Error:', error);
      const newQueue = [...offlineQueue, { data: formData, timestamp: new Date().toISOString() }];
      localStorage.setItem('offlineSurveys', JSON.stringify(newQueue));
      setOfflineQueue(newQueue);
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        {offlineQueue.length > 0 && (
          <div className="bg-orange-500 text-white p-6 text-center font-bold mb-6 rounded-xl shadow-lg max-w-md w-full animate-fade-in border-4 border-orange-400">
            <p className="mb-4 text-lg">⚠️ You have {offlineQueue.length} survey(s) saved offline on this device!</p>
            <button 
              onClick={syncOfflineSurveys} 
              disabled={isSubmitting} 
              className="bg-white text-orange-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition w-full font-bold text-lg"
            >
              {isSubmitting ? "Syncing to Cloud..." : "Sync to Cloud Now"}
            </button>
          </div>
        )}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center w-full">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your survey response has been recorded successfully.</p>
          <button onClick={() => {
            setSubmitted(false);
            setFormData({});
            window.scrollTo(0,0);
          }} className="btn-primary px-6 py-2">Submit Another</button>
        </div>
      </div>
    );
  }

  const renderField = (q) => {
    if (q.dependsOn) {
      const { key, values } = q.dependsOn;
      const currentVal = formData[key];
      if (!values.includes(currentVal)) {
        return null;
      }
    }
    const labelText = getLabel(q.label, language);
    
    if (q.type === 'text' || q.type === 'number') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <input 
            type={q.type} 
            name={q.key} 
            value={formData[q.key] || ''}
            onChange={handleInputChange}
            className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" 
          />
        </div>
      );
    }
    
    if (q.type === 'single_select') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name={q.key} 
                  value={opt.en} 
                  checked={formData[q.key] === opt.en}
                  onChange={handleInputChange}
                  className="text-brand-green focus:ring-brand-green" 
                />
                <span>{getLabel(opt, language)}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    if (q.type === 'matrix') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="overflow-x-auto w-full max-w-[90vw] md:max-w-full">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300"></th>
                  {q.columns.map((col, i) => (
                    <th key={i} className="p-2 border-b-2 border-gray-300 text-sm font-medium">{getLabel(col, language)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {q.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-2 font-medium">{getLabel(row, language)}</td>
                    {q.columns.map((col, j) => (
                      <td key={j} className="p-2 text-center">
                        <input 
                          type="radio" 
                          name={row.key} 
                          value={col.en} 
                          checked={formData[row.key] === col.en}
                          onChange={handleInputChange}
                          className="text-brand-green" 
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (q.type === 'group') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="space-y-4 ml-0 md:ml-4">
            {q.subfields.map((sub, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <span className="w-full md:w-1/3 text-gray-700">{getLabel(sub, language)}</span>
                <input 
                  type="text" 
                  name={sub.key} 
                  value={formData[sub.key] || ''}
                  onChange={handleInputChange}
                  className="w-full md:w-2/3 border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" 
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (q.type === 'multi_select_group') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="flex flex-col space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name={opt.key} 
                  value={opt.en} 
                  checked={formData[opt.key] === opt.en}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData(prev => ({...prev, [opt.key]: checked ? opt.en : ''}));
                  }}
                  className="text-brand-green focus:ring-brand-green rounded" 
                />
                <span>{getLabel(opt, language)}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    if (q.type === 'rating') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="flex flex-wrap gap-4">
            {Array.from({length: q.max}, (_, i) => i + 1).map(val => (
              <label key={val} className="flex flex-col items-center cursor-pointer">
                <input 
                  type="radio" 
                  name={q.key} 
                  value={val.toString()} 
                  checked={formData[q.key] === val.toString()}
                  onChange={handleInputChange}
                  className="text-brand-green focus:ring-brand-green mb-1" 
                />
                <span>{val}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const code = language === 'English' ? 'en' : language === 'Hindi' ? 'hi' : 'gu';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none overflow-x-hidden w-full">
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
           <img src="/logo.png" alt="Watermark" className="w-1/2 md:w-[45%] print:w-[45%] object-contain mix-blend-multiply" />
        </div>

        <form onSubmit={handleSubmit} className="w-full relative z-10">
          <div className="p-4 sm:p-6 md:p-12 print:p-0 max-w-full overflow-hidden w-full flex flex-col space-y-6">
            <div className="flex justify-center mb-6 items-center">
              <img src="/logo.png" alt="Logo" className="w-full max-w-[250px] md:max-w-[300px] object-contain mix-blend-multiply" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">
              {staticText.title[code]}
            </h1>
            
            <div className="mb-6 text-gray-700 italic">{staticText.instruction1[code]}</div>
            <div className="mb-6 text-gray-700 italic">{staticText.instruction2[code]}</div>
            
            {surveyConfig.map(renderField)}

            <div className="mt-12 text-center print:hidden">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-12 py-3 text-lg relative"
              >
                {isSubmitting ? "Submitting..." : (language === 'English' ? 'Submit Survey' : language === 'Hindi' ? 'सर्वेक्षण सबमिट करें' : 'સર્વેક્ષણ સબમિટ કરો')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
