import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_thankyou = """  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>"""

new_thankyou = """  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        {offlineQueue.length > 0 && (
          <div className="bg-orange-500 text-white p-4 text-center font-bold mb-6 rounded shadow max-w-md w-full animate-fade-in">
            You have {offlineQueue.length} survey(s) saved securely on this device! 
            <br/><span className="font-normal text-sm">Please remember to click "Submit Another" and sync them when you reconnect to the internet.</span>
          </div>
        )}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center w-full">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>"""

text = text.replace(old_thankyou, new_thankyou)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
