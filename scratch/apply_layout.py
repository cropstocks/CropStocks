import os
import re

file_path = 'client/src/components/Layout.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Fix header background to translucent black
code = code.replace(
    'bg-white shadow-sm sticky top-0 z-[100]',
    'bg-black/60 backdrop-blur-md shadow-lg sticky top-0 z-[100] border-b border-white/10 text-white'
)

# Use homepage logo
code = code.replace(
    'src="/logo.png"',
    'src="/homepage-logo.png"'
)

# Force overwrite the logo alt text to have correct trademark symbol
code = re.sub(
    r'alt="CropStocks[^"]+"',
    'alt="CropStocks\u2122"',
    code
)

# Force overwrite the text span for logo
code = re.sub(
    r'<span className="font-bold text-xl text-\[#348a21\] hidden md:block">CropStocks[^<]+</span>',
    '<span className="font-bold text-xl text-white hidden md:block tracking-tight">CropStocks\u2122</span>',
    code
)

# Fix text colors for icons
code = code.replace(
    'text-gray-500 hover:text-gray-700',
    'text-gray-300 hover:text-white'
)

# Make sure lang dropdown is dark text
code = code.replace(
    'bg-white border border-gray-100 shadow-lg rounded-lg p-2 flex flex-col gap-1 min-w-[120px] z-[110]',
    'bg-white border border-gray-100 shadow-lg rounded-lg p-2 flex flex-col gap-1 min-w-[120px] z-[110] text-black'
)

# Fix any mangled language dropdown buttons that might be in the source
code = re.sub(r'>.*?.*?݅\?</button>', '>\u0939\u093f\u0902\u0926\u0940</button>', code)
code = re.sub(r'>.*?\?o_.*?\?</button>', '>\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0</button>', code)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
