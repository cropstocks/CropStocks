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
    '<img src="/homepage-logo.png" alt="CropStocks™"',
    code
)

# Force overwrite the span line
code = re.sub(
    r'<span className="font-bold text-xl text-white hidden md:block">[^<]+</span>',
    '<span className="font-bold text-xl text-white hidden md:block tracking-tight">CropStocks™</span>',
    code
)

# Fix language dropdown
code = re.sub(r'> 1  , ݅?</button>', '>हिंदी</button>', code)
code = re.sub(r'>-\?o_ \?</button>', '>ગુજરાતી</button>', code)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
