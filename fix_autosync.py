import re

with open('client/src/pages/FarmerSurveyForm.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add useEffect import
text = text.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")

# Add auto-sync listener
auto_sync = """  useEffect(() => {
    const handleOnline = () => {
      if (offlineQueue.length > 0) {
        if (window.confirm("You are back online! Would you like to sync your saved surveys to the cloud now?")) {
          syncOfflineSurveys();
        }
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [offlineQueue]);

  const handleInputChange = (e) => {"""

text = text.replace("  const handleInputChange = (e) => {", auto_sync)

with open('client/src/pages/FarmerSurveyForm.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
