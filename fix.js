import fs from 'fs';
const content = fs.readFileSync('client/src/pages/FarmerDashboard.jsx', 'utf8');
const search = `                  {activeTab === 'Settings' && 'Configure your platform preferences'}
                </p>
              </div>
              
              <div className="relative">
                <select `;
const replace = `                  {activeTab === 'Settings' && 'Configure your platform preferences'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/farmer/crop-registration')}
                  className="bg-[#348a21] hover:bg-[#286f18] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Leaf size={16} /> Edit Farm Boundaries
                </button>
                <div className="relative">
                  <select `;
fs.writeFileSync('client/src/pages/FarmerDashboard.jsx', content.replace(search, replace));
