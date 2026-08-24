import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add offline state
text = text.replace("const [submitted, setSubmitted] = useState(false);", "const [submitted, setSubmitted] = useState(false);\n  const [offlineQueue, setOfflineQueue] = useState(JSON.parse(localStorage.getItem('offlineSurveys') || '[]'));")

# Add sync function and rewrite handleSubmit
new_funcs = """  const syncOfflineSurveys = async () => {
    if (offlineQueue.length === 0) return;
    setIsSubmitting(true);
    let synced = 0;
    try {
      for (const survey of offlineQueue) {
        await addDoc(collection(db, 'surveys'), {
          data: JSON.stringify(survey.data),
          createdAt: new Date(survey.timestamp) // Keep original timestamp
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
      // Save locally if offline
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
      // Fallback to offline queue if firebase fails
      const newQueue = [...offlineQueue, { data: formData, timestamp: new Date().toISOString() }];
      localStorage.setItem('offlineSurveys', JSON.stringify(newQueue));
      setOfflineQueue(newQueue);
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };"""

old_funcs_pattern = re.compile(r'  const handleSubmit = async \(e\) => \{.*?\n  \};', re.DOTALL)
text = old_funcs_pattern.sub(new_funcs, text)

# Add offline queue banner in the UI
banner_ui = """      <div className="bg-brand-dark text-white p-4 flex justify-between items-center print:hidden shadow-md sticky top-0 z-50">"""
new_banner = """      {offlineQueue.length > 0 && (
        <div className="bg-orange-500 text-white p-3 text-center font-bold print:hidden flex justify-between items-center px-6">
          <span>You have {offlineQueue.length} survey(s) saved offline on this device.</span>
          <button onClick={syncOfflineSurveys} disabled={isSubmitting} className="bg-white text-orange-500 px-4 py-1 rounded shadow hover:bg-gray-100 transition">
            Sync to Cloud Now
          </button>
        </div>
      )}
      <div className="bg-brand-dark text-white p-4 flex justify-between items-center print:hidden shadow-md sticky top-0 z-50">"""
text = text.replace(banner_ui, new_banner)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
