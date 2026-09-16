import os

file_path = 'client/src/components/Layout.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Change logo and header style
code = code.replace(
    'header className="bg-white shadow-sm sticky top-0 z-[100]"',
    'header className="bg-[#111] shadow-lg sticky top-0 z-[100] border-b border-white/10 text-white"'
)

# Use homepage logo
code = code.replace(
    'src="/logo.png"',
    'src="/homepage-logo.png"'
)

# Text colors for logo
code = code.replace(
    'text-[#348a21]',
    'text-white'
)

# Text colors for icons
code = code.replace(
    'text-gray-500 hover:text-gray-700',
    'text-gray-300 hover:text-white'
)

# Inside the lang dropdown, keep the text dark
code = code.replace(
    'bg-white border border-gray-100 shadow-lg rounded-lg p-2 flex flex-col gap-1 min-w-[120px] z-[110]',
    'bg-white border border-gray-100 shadow-lg rounded-lg p-2 flex flex-col gap-1 min-w-[120px] z-[110] text-black'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
