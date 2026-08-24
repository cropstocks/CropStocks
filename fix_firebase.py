import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the api import and setup firebase imports
text = text.replace("import { api } from '../services/api';", "import { db } from '../firebase';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';")

# Rewrite handleSubmit
old_submit = """  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/survey', formData);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Error submitting survey');
    }
    setIsSubmitting(false);
  };"""

new_submit = """  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'surveys'), {
        data: JSON.stringify(formData),
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Firebase Error:', error);
      alert('Error submitting survey to Firebase: ' + error.message);
    }
    setIsSubmitting(false);
  };"""

text = text.replace(old_submit, new_submit)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
