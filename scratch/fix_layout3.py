import os
import re

file_path = 'client/src/components/Layout.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Fix header background to translucent if not already done
if 'bg-[#111]' in code:
    code = code.replace(
        'bg-[#111] shadow-lg sticky',
        'bg-black/60 backdrop-blur-md shadow-lg sticky'
    )

# Force overwrite the logo line
code = re.sub(
    r'<img src="/homepage-logo\.png" alt="[^"]+"',
    '<img src="/homepage-logo.png" alt="CropStocks\u2122"',
    code
)

# Force overwrite the span line
code = re.sub(
    r'<span className="font-bold text-xl text-white hidden md:block[^>]*>[^<]+</span>',
    '<span className="font-bold text-xl text-white hidden md:block tracking-tight">CropStocks\u2122</span>',
    code
)

# Fix language dropdown
code = re.sub(r'>.*?</button>', '>English</button>', code, count=1)
# we can just find them and replace
code = re.sub(r'changeLanguage\(\'hi\'\).*?</button>', 'changeLanguage(\'hi\')\' className=\"text-left px-3 py-1.5 hover:bg-green-50 rounded-md text-sm text-gray-700 transition-colors\">\u0939\u093f\u0902\u0926\u0940</button>', code)
code = re.sub(r'changeLanguage\(\'gu\'\).*?</button>', 'changeLanguage(\'gu\')\' className=\"text-left px-3 py-1.5 hover:bg-green-50 rounded-md text-sm text-gray-700 transition-colors\">\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0</button>', code)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
