import re

with open('client/src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Update imports
text = text.replace("import { collection, getDocs } from 'firebase/firestore';", "import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';")

# Add delete function
delete_func = """
  const deleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to delete this survey response?")) {
      try {
        await deleteDoc(doc(db, "surveys", id));
        setSurveys(surveys.filter(s => s.id !== id));
      } catch (err) {
        console.error("Error deleting survey", err);
        alert("Failed to delete survey");
      }
    }
  };

  const exportToCSV = () => {"""

text = text.replace("  const exportToCSV = () => {", delete_func)

# Replace the survey row UI
old_row = """                    <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => {
                      const el = document.getElementById(`survey-${survey.id}`);
                      if (el) el.classList.toggle('hidden');
                    }}>
                      <div>
                        <span className="font-bold">#{surveys.length - index}</span> - {farmerName} ({location})
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(survey.createdAt).toLocaleString()}
                        <span className="ml-4 text-brand-green underline">View Details</span>
                      </div>
                    </div>"""

new_row = """                    <div className="flex justify-between items-center mb-2">
                      <div className="cursor-pointer flex-1" onClick={() => {
                        const el = document.getElementById(`survey-${survey.id}`);
                        if (el) el.classList.toggle('hidden');
                      }}>
                        <span className="font-bold">#{surveys.length - index}</span> - {farmerName} ({location})
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 cursor-pointer flex items-center space-x-4" onClick={() => {
                          const el = document.getElementById(`survey-${survey.id}`);
                          if (el) el.classList.toggle('hidden');
                        }}>
                          <span>{new Date(survey.createdAt).toLocaleString()}</span>
                          <span className="text-brand-green underline">View Details</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteSurvey(survey.id); }}
                          className="text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 p-1.5 rounded"
                          title="Delete Survey"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>"""

text = text.replace(old_row, new_row)

with open('client/src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
