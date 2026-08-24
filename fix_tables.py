import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Make all nested tables trigger horizontal scroll by setting a min-width
text = text.replace('className="w-full text-left border-collapse"', 'className="w-full text-left border-collapse min-w-[500px]"')

# Make outermost div hide overflow
text = text.replace('className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none"', 'className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none overflow-x-hidden w-full"')

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
