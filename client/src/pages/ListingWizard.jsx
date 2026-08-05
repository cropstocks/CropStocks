import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ListingWizard() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    type: 'CROP',
    produceName: '',
    region: '',
    location: '',
    landSize: '',
    animalCount: '',
    cycleDuration: '',
    expectedYield: '',
    expectedPrice: '',
    insuranceFlag: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/listings', {
        ...formData,
        farmerId: user?.id,
        landSize: formData.landSize ? parseFloat(formData.landSize) : undefined,
        animalCount: formData.animalCount ? parseInt(formData.animalCount) : undefined,
        cycleDuration: parseInt(formData.cycleDuration),
        expectedYield: parseFloat(formData.expectedYield),
        expectedPrice: parseFloat(formData.expectedPrice)
      });
      navigate('/farmer/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create listing');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold mb-6 font-heading">Create New Listing</h1>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <div className="mb-8 flex space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-brand-green' : 'bg-gray-200'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-semibold">Basic Details</h2>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="CROP">Crop</option>
              <option value="ANIMAL">Animal/Livestock</option>
            </select>
            <input type="text" name="produceName" value={formData.produceName} onChange={handleChange} placeholder="Produce Name (e.g. Wheat)" className="w-full p-2 border rounded" />
            <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="w-full p-2 border rounded" />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Specific Location" className="w-full p-2 border rounded" />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-semibold">Production Details</h2>
            {formData.type === 'CROP' ? (
              <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} placeholder="Land Size (Acres)" className="w-full p-2 border rounded" />
            ) : (
              <input type="number" name="animalCount" value={formData.animalCount} onChange={handleChange} placeholder="Number of Animals" className="w-full p-2 border rounded" />
            )}
            <input type="number" name="cycleDuration" value={formData.cycleDuration} onChange={handleChange} placeholder="Cycle Duration (Days)" className="w-full p-2 border rounded" />
            <input type="number" name="expectedYield" value={formData.expectedYield} onChange={handleChange} placeholder="Expected Yield" className="w-full p-2 border rounded" />
            <input type="number" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} placeholder="Expected Price per unit" className="w-full p-2 border rounded" />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-semibold">Insurance & Risk</h2>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="insuranceFlag" checked={formData.insuranceFlag} onChange={handleChange} className="rounded text-brand-green" />
              <span>Opt-in for crop insurance (reduces risk level)</span>
            </label>
            <p className="text-sm text-gray-500">Premium will be automatically factored in.</p>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-semibold">Review</h2>
            <div className="bg-gray-50 p-4 rounded border">
              <p><strong>Produce:</strong> {formData.produceName}</p>
              <p><strong>Region:</strong> {formData.region}</p>
              <p><strong>Type:</strong> {formData.type}</p>
              <p><strong>Insured:</strong> {formData.insuranceFlag ? 'Yes' : 'No'}</p>
              <p className="mt-2 text-sm text-brand-blue">Capital calculation will be performed automatically by our system upon submission.</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button onClick={() => setStep(step - 1)} disabled={step === 1 || loading} className="btn-outline disabled:opacity-50">Back</button>
          <button onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()} disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? 'Submitting...' : step === 4 ? 'Submit Listing' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
