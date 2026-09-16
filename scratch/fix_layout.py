import os

file_path = 'client/src/components/Layout.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Fix trademark symbol encoding errors
code = code.replace('CropStocks,', 'CropStocks™')
code = code.replace('CropStocksâ„¢', 'CropStocks™')
code = code.replace('CropStocks?', 'CropStocks™')
# Replace any CropStocks with garbage after it up to a quote or tag end
import re
code = re.sub(r'CropStocks[^\w\s"\'<]*', 'CropStocks™', code)
# Clean up duplicate trademarks if any
code = code.replace('CropStocks™™', 'CropStocks™')

# Fix header background to translucent
code = code.replace(
    'bg-[#111] shadow-lg sticky',
    'bg-black/60 backdrop-blur-md shadow-lg sticky'
)

# Fix language dropdown encoding errors
code = code.replace(' 1  , ݅?', 'हिंदी')
code = code.replace('-?o_ ?', 'ગુજરાતી')

# Just in case regex was too aggressive
code = code.replace('CropStocks™="', 'CropStocks="')
code = code.replace('CropStocks™/', 'CropStocks/')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
