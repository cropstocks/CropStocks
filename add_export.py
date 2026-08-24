import re

with open('client/src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add the export function
export_func = """
  const exportToCSV = () => {
    if (surveys.length === 0) return;

    const allParsed = surveys.map(s => {
      try { return { ...JSON.parse(s.data), SubmittedAt: new Date(s.createdAt).toLocaleString() }; } 
      catch (e) { return { SubmittedAt: new Date(s.createdAt).toLocaleString() }; }
    });

    const headers = Array.from(new Set(allParsed.flatMap(s => Object.keys(s))));
    
    const csvRows = [headers.join(',')];
    for (const survey of allParsed) {
      const values = headers.map(header => {
        const val = survey[header] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CropStocks_Surveys.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) return"""

text = text.replace("  if (loading) return", export_func)


# Add the button UI
old_ui = """      {activeTab === 'surveys' && (
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Survey Responses</h2>
          {surveys.length === 0 ? ("""

new_ui = """      {activeTab === 'surveys' && (
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Survey Responses</h2>
            {surveys.length > 0 && (
              <button 
                onClick={exportToCSV}
                className="bg-brand-green hover:bg-brand-gold text-white px-4 py-2 rounded text-sm font-bold transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Export to Excel
              </button>
            )}
          </div>
          {surveys.length === 0 ? ("""

text = text.replace(old_ui, new_ui)

with open('client/src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
