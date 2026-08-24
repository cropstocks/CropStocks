with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()
idx = text.find("language === 'Gujarati'")
with open('check.txt', 'w', encoding='utf-8') as f:
    f.write(text[idx:idx+1500])
