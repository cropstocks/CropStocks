import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add import
if "import { api } from '../services/api';" not in text:
    text = text.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { api } from '../services/api';")

# Replace fetch with api.post
old_fetch = """      const response = await fetch('http://localhost:5000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit survey');
      }"""

new_fetch = """      await api.post('/survey', formData);
      setSubmitted(true);"""

text = text.replace(old_fetch, new_fetch)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
