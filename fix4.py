import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the end tags
text = re.sub(r'</form>\s*</td>\s*</tr>\s*</tbody>\s*</table>', '</td>\n            </tr>\n          </tbody>\n        </table>\n        </form>', text)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
