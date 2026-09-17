import fs from 'fs';
let content = fs.readFileSync('client/src/pages/FarmerDashboard.jsx', 'utf8');

const target = `<div className="relative">
                <select`;
const replacement = `<div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/farmer/crop-registration')}
                  className="bg-[#348a21] hover:bg-[#286f18] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Leaf size={16} /> Edit Farm Boundaries
                </button>
                <div className="relative">
                  <select`;

content = content.replace(target, replacement);

// We also need to close the div! The select has its own closing div. Wait, we opened a flex div, we must close it.
// Wait, the select is wrapped in <div className="relative"> ... </div>.
// So the structure is:
// <div className="flex items-center gap-3">
//   <button>...</button>
//   <div className="relative">
//     <select>...</select>
//     <div className="pointer-events-none ...">...</div>
//   </div>
// </div>
// Let's find where the <div className="relative"> ends and append a closing div.
// The easiest way is to use regex or string split.

const lines = content.split('\n');
const newLines = [];
let foundSelect = false;
let divsToClose = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<div className="relative">') && lines[i+1].includes('<select')) {
    foundSelect = true;
    newLines.push(`              <div className="flex items-center gap-3">`);
    newLines.push(`                <button onClick={() => navigate('/farmer/crop-registration')} className="bg-[#348a21] hover:bg-[#286f18] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"><Leaf size={16} /> Edit Farm Boundaries</button>`);
    newLines.push(lines[i]); // original relative div
    divsToClose = 1;
  } else if (foundSelect && divsToClose === 1 && lines[i].trim() === '</div>') {
    // Found the end of the relative div
    newLines.push(lines[i]);
    newLines.push(`              </div>`); // close the flex div
    foundSelect = false;
    divsToClose = 0;
  } else {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync('client/src/pages/FarmerDashboard.jsx', newLines.join('\n'));
