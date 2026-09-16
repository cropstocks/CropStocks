import os
import re

file_path = 'client/src/pages/FarmerDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the logo div in FarmerDashboard
code = re.sub(
    r'<div className="bg-\[#e6f4ea\] p-2 rounded-lg text-\[#348a21\]">\s*<Leaf size=\{24\} />\s*</div>',
    '<img src="/logo.png" alt="CropStocks Logo" className="h-10 w-auto object-contain drop-shadow-sm" />',
    code
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

file_path_layout = 'client/src/components/Layout.jsx'
with open(file_path_layout, 'r', encoding='utf-8') as f:
    layout_code = f.read()

# Replace homepage-logo.png with logo.png in Layout
layout_code = layout_code.replace(
    'src="/homepage-logo.png"',
    'src="/logo.png"'
)

with open(file_path_layout, 'w', encoding='utf-8') as f:
    f.write(layout_code)
