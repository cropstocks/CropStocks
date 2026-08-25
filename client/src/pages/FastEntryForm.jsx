import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { surveyConfig, staticText } from '../utils/surveyTranslations';

const getLabel = (obj, lang) => {
  const code = lang === 'English' ? 'en' : lang === 'Hindi' ? 'hi' : lang === 'Gujarati' ? 'gu' : lang;
  if (code === 'en') return obj.en;
  return (
    <>
      {obj[code]} <span className="text-sm font-normal italic text-gray-500">[{obj.en}]</span>
    </>
  );
};

const getLabelString = (obj, lang) => {
  const code = lang === 'English' ? 'en' : lang === 'Hindi' ? 'hi' : lang === 'Gujarati' ? 'gu' : lang;
  if (code === 'en') return obj.en;
  return `${obj[code]} [${obj.en}]`;
};

export default function FastEntryForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState(localStorage.getItem('surveyLanguage') || 'English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(JSON.parse(localStorage.getItem('offlineSurveys') || '[]'));
  const [pasteText, setPasteText] = useState("");

  // Persist language choice
  useEffect(() => {
    localStorage.setItem('surveyLanguage', language);
  }, [language]);

  // Sync offline surveys when back online
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

  // Load defaults for Q1 and Q3 from previous submission
  useEffect(() => {
    const lastQ1 = localStorage.getItem('lastCollector');
    const lastQ3 = localStorage.getItem('lastState');
    if (lastQ1 || lastQ3) {
      setFormData(prev => ({
        ...prev,
        ...(lastQ1 && { new_q_collector: lastQ1 }),
        ...(lastQ3 && { new_q_location: lastQ3 })
      }));
    }
  }, []);

  // Autosave
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(formData).length > 0 && !submitted) {
        localStorage.setItem('surveyAutoSave', JSON.stringify(formData));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [formData, submitted]);

  // Restore autosave on mount
  useEffect(() => {
    const saved = localStorage.getItem('surveyAutoSave');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Object.keys(parsed).length > 0) {
        setFormData(prev => ({...prev, ...parsed}));
      }
    }
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSpeak = (q) => {
    if (window.currentAudio) {
      window.currentAudio.pause();
    }
    
    let audioId = q.id;
    if (audioId === 'q_5_labour' || audioId === 'q_5_machine') {
      audioId = 'q_5_details';
    }
    
    // We now use the bundled local MP3 files for 100% offline reliability
    // If it fails, fallback to SpeechSynthesis API
    const url = `${import.meta.env.BASE_URL}audio/${audioId}.mp3`;
    
    window.currentAudio = new Audio(url);
    window.currentAudio.play().catch(e => {
      console.error("Audio playback error:", e);
      if ('speechSynthesis' in window) {
        const text = q.label.gu || q.label.en;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'gu-IN';
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (type === 'checkbox') {
        const currentVals = prev[name] ? prev[name].split(',') : [];
        if (checked) {
          return { ...prev, [name]: [...currentVals, value].join(',') };
        } else {
          return { ...prev, [name]: currentVals.filter(v => v !== value).join(',') };
        }
      }
      return { ...prev, [name]: value };
    });

    // Auto-advance for radio buttons
    if (type === 'radio') {
      setTimeout(() => {
        const form = e.target.form;
        if (!form) return;
        const elements = Array.from(form.elements).filter(
          el => (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') && !el.disabled && el.type !== 'hidden'
        );
        const currentIndex = elements.indexOf(e.target);
        if (currentIndex !== -1) {
          for (let i = currentIndex + 1; i < elements.length; i++) {
            if (elements[i].name !== name) {
              elements[i].focus();
              break;
            }
          }
        }
      }, 50);
    }
  };

  const handlePasteParse = () => {
    const lines = pasteText.split('\n');
    const newForm = { ...formData };
    
    lines.forEach(line => {
      const [keyRaw, ...valRaw] = line.split(':');
      if (!keyRaw || valRaw.length === 0) return;
      
      const key = keyRaw.trim().toLowerCase();
      const val = valRaw.join(':').trim();
      
      if (key.includes('collector')) newForm['new_q_collector'] = val;
      if (key.includes('farmer')) newForm['new_q_farmer'] = val;
      if (key.includes('state') || key.includes('location')) newForm['new_q_location'] = val;
      if (key.includes('crop')) newForm['new_q_1'] = val;
      if (key.includes('irrigation')) newForm['new_q_8'] = val;
      if (key.includes('land')) newForm['new_q_1'] = val;
      if (key.includes('produce')) newForm['new_q_13'] = val;
      if (key.includes('sell price')) newForm['new_q_17'] = val;
      if (key.includes('channel')) newForm['new_q_16'] = val;
    });
    
    setFormData(newForm);
    setPasteText("");
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
    
    // Save defaults
    if (formData.new_q_collector) localStorage.setItem('lastCollector', formData.new_q_collector);
    if (formData.new_q_location) localStorage.setItem('lastState', formData.new_q_location);
    
    const timestamp = new Date().toISOString();
    
    if (!navigator.onLine) {
      const newQueue = [...offlineQueue, { data: formData, timestamp }];
      localStorage.setItem('offlineSurveys', JSON.stringify(newQueue));
      setOfflineQueue(newQueue);
      finalizeSubmit();
      return;
    }

    try {
      await addDoc(collection(db, 'surveys'), {
        data: JSON.stringify(formData),
        createdAt: serverTimestamp()
      });
      finalizeSubmit();
    } catch (error) {
      console.error('Firebase Error:', error);
      const newQueue = [...offlineQueue, { data: formData, timestamp }];
      localStorage.setItem('offlineSurveys', JSON.stringify(newQueue));
      setOfflineQueue(newQueue);
      finalizeSubmit();
    }
  };
  
  const finalizeSubmit = () => {
    setIsSubmitting(false);
    setSubmitted(true);
    localStorage.removeItem('surveyAutoSave');
  };

  const renderPrintField = (q) => {
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
          </label>
          <input 
            type={q.type} 
            name={q.key} 
            value={formData[q.key] || ''}
            readOnly
            className="w-full border-b border-gray-300 focus:border-brand-green outline-none py-1 bg-transparent" 
          />
        </div>
      );
    }

    if (q.type === 'textarea') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
          </label>
          <textarea 
            name={q.key} 
            value={formData[q.key] || ''}
            readOnly
            rows="4"
            className="w-full border border-gray-300 rounded-md focus:border-brand-green outline-none py-2 px-3 bg-transparent" 
          />
        </div>
      );
    }
    
    if (q.type === 'single_select') {
      return (
        <div key={q.id} className="break-inside-avoid mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            {labelText}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name={q.key} 
                  value={opt.en} 
                  checked={formData[q.key] === opt.en}
                  readOnly
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
                          readOnly
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
          </label>
          <div className="space-y-4 ml-0 md:ml-4">
            {q.subfields.map((sub, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <span className="w-full md:w-1/3 text-gray-700">{getLabel(sub, language)}</span>
                <input 
                  type="text" 
                  name={sub.key} 
                  value={formData[sub.key] || ''}
                  readOnly
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
          </label>
          <div className="flex flex-col space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name={opt.key} 
                  value={opt.en} 
                  checked={formData[opt.key] === opt.en}
                  readOnly
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
          </label>
          <div className="flex flex-wrap gap-4">
            {Array.from({length: q.max}, (_, i) => i + 1).map(val => (
              <label key={val} className="flex flex-col items-center cursor-pointer">
                <input 
                  type="radio" 
                  name={q.key} 
                  value={val.toString()} 
                  checked={formData[q.key] === val.toString()}
                  readOnly
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
        <div key={q.id} className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-800 mb-1">
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
            className="border border-gray-300 rounded px-3 py-1.5 focus:border-brand-green outline-none w-full"
            required
          />
        </div>
      );
    }
    
    if (q.type === 'textarea') {
      return (
        <div key={q.id} className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-800 mb-1">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <textarea 
            name={q.key} 
            value={formData[q.key] || ''}
            onChange={handleInputChange}
            rows="4"
            className="border border-gray-300 rounded px-3 py-1.5 focus:border-brand-green outline-none w-full"
          />
        </div>
      );
    }
    
    if (q.type === 'single_select') {
      return (
        <div key={q.id} className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-800 mb-1">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <select 
            name={q.key} 
            value={formData[q.key] || ''}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-1.5 focus:border-brand-green outline-none w-full bg-white"
            required
          >
            <option value="">-- Select --</option>
            {q.options.map((opt, i) => (
              <option key={i} value={opt.en}>{getLabelString(opt, language)}</option>
            ))}
          </select>
        </div>
      );
    }
    
    if (q.type === 'matrix') {
      return (
        <div key={q.id} className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          {q.rows.map((row, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center mb-2">
              <span className="text-sm w-1/3 mb-1 sm:mb-0">{getLabel(row, language)}</span>
              <div className="flex flex-1 space-x-2">
                {q.columns.map((col, j) => (
                  <label key={j} className="flex-1 flex items-center bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-gray-100">
                    <input 
                      type="radio" 
                      name={row.key} 
                      value={col.en} 
                      checked={formData[row.key] === col.en}
                      onChange={handleInputChange}
                      className="mr-1"
                      required
                    />
                    <span className="text-xs">{getLabel(col, language)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (q.type === 'group') {
      return (
        <div key={q.id} className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {q.subfields.map((sub, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs mb-1">{getLabel(sub, language)}</span>
                <input 
                  type="text" 
                  name={sub.key} 
                  value={formData[sub.key] || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 focus:border-brand-green outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (q.type === 'multi_select_group') {
      return (
        <div key={q.id} className="mb-4">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="flex space-x-4">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  name={opt.key} 
                  value={opt.en}
                  checked={formData[opt.key] === opt.en}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData(prev => ({...prev, [opt.key]: checked ? opt.en : ''}));
                  }}
                  className="rounded"
                />
                <span className="text-sm">{getLabel(opt, language)}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    
    if (q.type === 'rating') {
      return (
        <div key={q.id} className="mb-4">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">
            {labelText}
            {language === 'Gujarati' && (
              <button type="button" onClick={() => handleSpeak(q)} className="ml-2 text-xl hover:scale-110 transition-transform" title="Play Audio (Gujarati)">
                🔊
              </button>
            )}
          </label>
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {Array.from({length: q.max}, (_, i) => i + 1).map(val => (
              <label key={val} className="cursor-pointer border border-gray-300 rounded w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100">
                <input 
                  type="radio" 
                  name={q.key} 
                  value={val.toString()} 
                  checked={formData[q.key] === val.toString()}
                  onChange={handleInputChange}
                  className="sr-only"
                  required
                />
                <span className={`text-sm ${formData[q.key] === val.toString() ? 'font-bold text-brand-green' : ''}`}>
                  {val}
                </span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
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
            setFormData({
              new_q_collector: localStorage.getItem('lastCollector') || '',
              new_q_location: localStorage.getItem('lastState') || ''
            });
            window.scrollTo(0,0);
          }} className="btn-primary px-6 py-2">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 w-full print:max-w-none print:p-0">
      
      {/* Print-only layout */}
      <div className="hidden print:block relative bg-white max-w-4xl mx-auto border-none font-sans text-black text-[15px] leading-[1.8] min-h-screen p-0">
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none opacity-20 z-0 overflow-hidden">
           <img src="/logo.png" alt="Watermark" className="w-[30%] object-contain mix-blend-multiply" />
        </div>

        <div className="w-full relative z-10 max-w-full overflow-hidden flex flex-col space-y-6">
          <div className="flex justify-center mb-6 items-center">
            <img src="/logo.png" alt="Logo" className="w-full max-w-[180px] object-contain mix-blend-multiply" />
          </div>
          <h1 className="text-xl font-bold text-center mb-10 uppercase tracking-widest border-b-[3px] border-black pb-4 mt-4">
            {staticText.title[language === 'English' ? 'en' : language === 'Hindi' ? 'hi' : 'gu']}
          </h1>
          
          <div className="mb-6 text-gray-700 italic">{staticText.instruction1[language === 'English' ? 'en' : language === 'Hindi' ? 'hi' : 'gu']}</div>
          <div className="mb-6 text-gray-700 italic">{staticText.instruction2[language === 'English' ? 'en' : language === 'Hindi' ? 'hi' : 'gu']}</div>
          
          {surveyConfig.map(renderPrintField)}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6 border-b pb-4 print:hidden">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/survey')}
            className="text-gray-600 hover:text-brand-green transition"
            title="Return to Standard Form"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <h1 className="text-2xl font-bold">Fast Entry Mode</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <button 
            type="button" 
            onClick={() => {
              if(window.confirm('Are you sure you want to clear all fields?')) {
                setFormData({});
              }
            }}
            className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition"
          >
            Clear All
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
            title="Print Form"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print
          </button>
          {['English', 'Hindi', 'Gujarati'].map(l => (
            <button 
              key={l} 
              onClick={() => setLanguage(l)}
              className={`px-3 py-1 rounded text-sm ${language === l ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6 bg-yellow-50 p-3 rounded border border-yellow-200 print:hidden">
        <label className="text-sm font-semibold mb-1 block">Paste Notes (Auto-fill)</label>
        <textarea 
          className="w-full text-sm border p-2 rounded h-20 outline-none focus:border-brand-green"
          placeholder={`e.g. collector: Manan Pandey\nfarmer: Ram Singh\nstate: Madhya Pradesh`}
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
        />
        <button onClick={handlePasteParse} className="mt-2 bg-yellow-600 text-white px-3 py-1 text-sm rounded hover:bg-yellow-700">
          Parse & Fill
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 shadow print:shadow-none rounded-lg print:hidden">
        {surveyConfig.map(renderField)}
        
        <div className="mt-8 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <button type="button" onClick={() => window.print()} className="w-full md:w-auto px-8 py-3 text-lg flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print / Save as PDF
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto px-8 py-3 text-lg">
            {isSubmitting ? 'Saving...' : 'Submit Data'}
          </button>
        </div>
      </form>
    </div>
  );
}
