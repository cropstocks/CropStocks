import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the main padding
text = text.replace('className="p-10 md:p-16 print:p-0"', 'className="p-4 sm:p-6 md:p-12 print:p-0 max-w-full overflow-hidden w-full"')

# Add w-full to all nested overflow-x-auto to ensure they don't break flex/grid containers
text = text.replace('className="overflow-x-auto"', 'className="overflow-x-auto w-full max-w-[90vw] md:max-w-full"')

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
