import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the opening table tags
old_table_open = """        <form onSubmit={handleSubmit} className="w-full relative z-10 p-4 sm:p-6 md:p-12 print:p-0 max-w-full overflow-hidden w-full">
        <table className="w-full">
          <tbody className="table-row-group">
            <tr>
              <td className="p-10 md:p-16 print:p-0">"""

new_table_open = """        <form onSubmit={handleSubmit} className="w-full relative z-10 p-4 sm:p-6 md:p-12 print:p-0 max-w-full overflow-hidden flex flex-col space-y-6">"""

text = text.replace(old_table_open, new_table_open)

# Remove the closing table tags
old_table_close = """                </div>


              </td>
            </tr>
          </tbody>
        </table>"""

new_table_close = """                </div>"""

text = text.replace(old_table_close, new_table_close)

# Wait, the closing tags had spaces between them. Let's just use regex to be safe.
import re
text = re.sub(r'              </td>\s*</tr>\s*</tbody>\s*</table>', '', text)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
