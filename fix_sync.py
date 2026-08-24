import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix sync function to check network status first to prevent hanging
old_sync = """  const syncOfflineSurveys = async () => {
    if (offlineQueue.length === 0) return;
    setIsSubmitting(true);"""

new_sync = """  const syncOfflineSurveys = async () => {
    if (!navigator.onLine) {
      alert("You are still offline! Please connect to Wi-Fi or Cellular Data before syncing.");
      return;
    }
    if (offlineQueue.length === 0) return;
    setIsSubmitting(true);"""

text = text.replace(old_sync, new_sync)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
