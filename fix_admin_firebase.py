import re

with open('client/src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add firebase imports
text = text.replace("import { api } from '../services/api';", "import { api } from '../services/api';\nimport { db } from '../firebase';\nimport { collection, getDocs } from 'firebase/firestore';")

# Update fetchData to get surveys from Firebase
old_fetch = """      const [listingsData, surveysData] = await Promise.all([
        api.get('/admin/listings').catch(() => []),
        api.get('/admin/surveys').catch(() => [])
      ]);
      setListings(listingsData || []);
      setSurveys(surveysData || []);"""

new_fetch = """      const [listingsData] = await Promise.all([
        api.get('/admin/listings').catch(() => [])
      ]);
      
      let fbSurveys = [];
      try {
        const querySnapshot = await getDocs(collection(db, "surveys"));
        fbSurveys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate() || new Date() }));
        // Sort by newest
        fbSurveys.sort((a, b) => b.createdAt - a.createdAt);
      } catch (err) {
        console.error("Firebase fetch error", err);
      }

      setListings(listingsData || []);
      setSurveys(fbSurveys);"""

text = text.replace(old_fetch, new_fetch)

with open('client/src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
