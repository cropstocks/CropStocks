import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

gu_idx = text.find("language === 'Gujarati'")

if gu_idx != -1:
    before = text[:gu_idx]
    after = text[gu_idx:]
    after = after.replace('मुख्य खेती का स्थान (राज्य)', 'મુખ્ય ખેતીનું સ્થળ (રાજ્ય)')
    text = before + after
    with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Replaced!")
else:
    print("Gujarati section not found.")
