import os

farmer_path = 'client/src/pages/FarmerDashboard.jsx'
with open(farmer_path, 'r', encoding='utf-8') as f:
    farmer = f.read()

# Replace logo.png with homepage-logo.png (the shield only)
farmer = farmer.replace('src="/logo.png"', 'src="/homepage-logo.png"')

with open(farmer_path, 'w', encoding='utf-8') as f:
    f.write(farmer)


layout_path = 'client/src/components/Layout.jsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout = f.read()

# Replace logo.png with homepage-logo.png (the shield only)
layout = layout.replace('src="/logo.png"', 'src="/homepage-logo.png"')

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout)
