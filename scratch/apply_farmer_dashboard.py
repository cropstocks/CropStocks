import os
import re

file_path = 'client/src/pages/FarmerDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Fix logo in FarmerDashboard (add trademark)
code = code.replace(
    '<h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">CropStocks</h1>',
    '<h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">CropStocks\u2122</h1>'
)

# Make Topbar translucent (light translucent to match the dashboard theme)
# Note: Currently it might be 'bg-white shadow-sm shrink-0' or similar
code = code.replace(
    'bg-white shadow-sm shrink-0',
    'bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shrink-0'
)

# Let's check if the topbar is actually just "bg-white shadow-sm shrink-0"
# Wait, in FarmerDashboard.jsx:
# <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-200 shrink-0">
# Wait, in the Python script earlier, I replaced `bg-[#151a15]` with `bg-white shadow-sm`? 
# Ah, I replaced the *search bar*!
# Let's just aggressively match the header tag in FarmerDashboard.
code = re.sub(
    r'<header className="h-20[^"]+"',
    '<header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-200 bg-[#fef8f3]/80 backdrop-blur-md sticky top-0 z-50 shrink-0"',
    code
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
