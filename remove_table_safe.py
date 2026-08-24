with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Open replacement
for i, line in enumerate(lines):
    if '<table className="w-full">' in line and 'table-row-group' in lines[i+1]:
        lines[i] = ""
        lines[i+1] = ""
        lines[i+2] = ""
        lines[i+3] = lines[i+3].replace("<td", "<div").replace(">", " flex flex-col space-y-6>")
        break

# Close replacement
for i in range(len(lines)-1, -1, -1):
    if '</table>' in lines[i] and '</tbody>' in lines[i-1]:
        lines[i] = ""
        lines[i-1] = ""
        lines[i-2] = ""
        lines[i-3] = lines[i-3].replace("</td>", "</div>")
        break

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
