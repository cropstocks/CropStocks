import re
import os

with open('client/src/pages/FarmerDashboard.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Make background light and text dark globally
code = code.replace('bg-[#0d120e]', 'bg-[#fef8f3]')
code = code.replace('text-gray-300', 'text-gray-800')
code = code.replace('text-white', 'text-gray-900')
code = code.replace('border-white/5', 'border-gray-200')
code = code.replace('border-white/10', 'border-gray-300')
code = code.replace('text-gray-400', 'text-gray-600')
code = code.replace('text-gray-500', 'text-gray-500')

# Sidebar specific
# Active Tab bg-[#1b2b1b] -> bg-[#348a21] text-white
code = code.replace('bg-[#1b2b1b] text-[#86efac]', 'bg-[#348a21] text-[#fff]')
# Sidebar hover
code = code.replace('hover:text-gray-900 hover:bg-white/5', 'hover:text-[#348a21] hover:bg-green-50')
# Logo green box bg-[#1b3d1b] text-[#5cc95c] -> bg-[#e6f4ea] text-[#348a21]
code = code.replace('bg-[#1b3d1b] p-2 rounded-lg text-[#5cc95c]', 'bg-[#e6f4ea] p-2 rounded-lg text-[#348a21]')
# Sidebar Bottom Widget bg-[#0f140f] -> bg-gray-50
code = code.replace('bg-[#0f140f]', 'bg-gray-50')
code = code.replace('bg-[#171d17]', 'bg-white')

# Topbar and Search
code = code.replace('bg-[#151a15]', 'bg-white shadow-sm')

# Cards Background
# Wallet bg-[#2a2212] text-[#facc15] -> bg-[#fffbeb] text-[#f59e0b]
code = code.replace('bg-[#2a2212] text-[#facc15]', 'bg-[#fffbeb] text-[#f59e0b]')
# Clipboard bg-[#2a1717] text-[#f87171] -> bg-[#fee2e2] text-[#ef4444]
code = code.replace('bg-[#2a1717] text-[#f87171]', 'bg-[#fee2e2] text-[#ef4444]')

# Positive/Negative trends
code = code.replace('text-[#4ade80]', 'text-[#348a21]')
code = code.replace('text-red-400', 'text-red-600')

# Weekly Submission circles
code = code.replace('bg-white shadow-sm border-2 border-[#4ade80] text-[#4ade80]', 'bg-white border-2 border-[#348a21] text-[#348a21]')
code = code.replace('bg-white shadow-sm border border-[#348a21] text-[#348a21]', 'bg-[#e6f4ea] border border-[#348a21] text-[#348a21]')
code = code.replace('bg-white shadow-sm border border-[#2a2a2a] text-gray-600', 'bg-gray-50 border border-gray-300 text-gray-400')
code = code.replace('bg-[#2a2a2a]', 'bg-gray-300')

# Pill
code = code.replace('bg-[#2a2212] text-[#facc15] text-xs font-bold border border-[#facc15]/20', 'bg-[#fbbf24] text-gray-900 text-xs font-bold border border-[#facc15]')

# Upload Button
code = code.replace('bg-[#286328] hover:bg-[#1e4a1e] text-gray-900', 'bg-[#348a21] hover:bg-[#286f18] text-gray-900 shadow-lg')
code = code.replace('border border-[#4ade80]/30 shadow-lg shadow-[#4ade80]/10', '')

# Charts Tooltip
code = code.replace("backgroundColor: '#1c241c'", "backgroundColor: '#fff'")
code = code.replace("color: '#fff'", "color: '#111'")

# Recharts line color
code = code.replace('stroke="#4ade80"', 'stroke="#348a21"')

# Fix NaN bug
code = code.replace('cycleState ? (cycleState.capitalGrantedInr - cycleState.capitalDisbursedInr) : 9350000', '(cycleState?.capitalGrantedInr || 10000000) - (cycleState?.capitalDisbursedInr || 650000)')

# Let's fix the text-gray-900 override in the specific places where it needs to be text-white
code = code.replace('bg-[#348a21] hover:bg-[#286f18] text-gray-900', 'bg-[#348a21] hover:bg-[#286f18] text-white')
code = code.replace('bg-[#348a21] text-[#fff]', 'bg-[#348a21] text-white') # Active tab
code = code.replace('text-gray-900 min-h-screen', 'text-gray-900 min-h-screen')

# The pill text
code = code.replace('bg-[#fbbf24] text-gray-900 text-xs', 'bg-[#fbbf24] text-white text-xs')

# Logout button
code = code.replace('bg-[#1a1515]', 'bg-red-50')
code = code.replace('text-red-300', 'text-red-700')

# Circular Profile bg
code = code.replace('bg-[#1b3d1b] text-[#86efac]', 'bg-[#348a21] text-white')

with open('client/src/pages/FarmerDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
