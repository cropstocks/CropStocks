import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the top imports and component definition
top_pattern = re.compile(r'import React.*?const handleInputChange.*?};', re.DOTALL)
new_top = """import React, { useState } from 'react';

export default function FarmerSurveyForm() {
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? value : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit survey');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting survey');
    }
    setIsSubmitting(false);
  };"""
text = top_pattern.sub(new_top, text, count=1)

# Add the 'submitted' early return right before 'return ('
if 'if (submitted)' not in text:
    return_idx = text.find('  return (')
    submitted_block = """  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-brand-green mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your survey response has been recorded successfully.</p>
          <button onClick={() => window.location.reload()} className="btn-primary px-6 py-2">Submit Another</button>
        </div>
      </div>
    );
  }

"""
    text = text[:return_idx] + submitted_block + text[return_idx:]

# Wrap the table in a form
text = text.replace('<table className="w-full relative z-10">', '<form onSubmit={handleSubmit} className="w-full relative z-10">\n        <table className="w-full">')
text = text.replace('<form className="space-y-8">', '')
text = text.replace('                </form>', '')

# Add the submit button at the end
end_pattern = re.compile(r'(\s+)</td>\s+</tr>\s+</tbody>\s+</table>\s+</div>\s+</div>\s+\);\s+}', re.DOTALL)
new_end = r"""\1  <div className="mt-8 flex justify-center print:hidden">
\1    <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3 w-full md:w-auto font-bold tracking-wider">
\1      {isSubmitting ? 'Submitting...' : 'Submit Survey'}
\1    </button>
\1  </div>
\1</form>
\1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}"""
text = end_pattern.sub(new_end, text)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
