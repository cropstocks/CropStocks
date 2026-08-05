import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function GuidanceFeed() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await api.get('/guidance/1');
        setTips(data);
      } catch (err) {
        setTips([
          { id: 1, title: 'Weather Alert: Heavy Rain Expected', content: 'Ensure proper drainage in your fields to prevent waterlogging. Delayed sowing by 2 days is recommended.', type: 'alert' },
          { id: 2, title: 'Fertilizer Application Time', content: 'Your wheat crop is entering the tillering stage. Apply nitrogen-based fertilizer (Urea 25kg/acre) for optimal growth.', type: 'info' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading tips...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-heading mb-8 text-brand-dark">Crop Guidance</h1>
      
      <div className="space-y-6">
        {tips.map((tip, idx) => (
          <div key={idx} className={`glass-card p-6 border-l-4 ${tip.type === 'alert' ? 'border-l-brand-blue' : 'border-l-brand-green'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{tip.title || tip.message || 'Guidance Tip'}</h3>
            </div>
            <p className="text-gray-700 text-sm">{tip.content || tip.message || JSON.stringify(tip)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
