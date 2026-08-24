import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add the sync button directly into the Thank You screen banner
old_banner = """        {offlineQueue.length > 0 && (
          <div className="bg-orange-500 text-white p-4 text-center font-bold mb-6 rounded shadow max-w-md w-full animate-fade-in">
            You have {offlineQueue.length} survey(s) saved securely on this device! 
            <br/><span className="font-normal text-sm">Please remember to click "Submit Another" and sync them when you reconnect to the internet.</span>
          </div>
        )}"""

new_banner = """        {offlineQueue.length > 0 && (
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
        )}"""

text = text.replace(old_banner, new_banner)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
