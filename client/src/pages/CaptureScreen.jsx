import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Upload, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CaptureScreen = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const [windowStatus, setWindowStatus] = useState(null);
  const [images, setImages] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchWindowStatus();
  }, [listingId]);

  const fetchWindowStatus = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/submissions/window/${listingId}`);
      setWindowStatus(res);
    } catch (err) {
      setError(t('Failed to load submission window'));
    } finally {
      setLoading(false);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const p1 = lat1 * Math.PI/180;
    const p2 = lat2 * Math.PI/180;
    const dp = (lat2-lat1) * Math.PI/180;
    const dl = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dp/2) * Math.sin(dp/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleImageCapture = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newImages = files.map(file => ({
          file,
          preview: URL.createObjectURL(file),
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        }));
        setImages(prev => [...prev, ...newImages]);
      },
      (err) => {
        alert('Failed to get location: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleBillUpload = (e) => {
    const files = Array.from(e.target.files);
    setBills(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeBill = (index) => {
    const newBills = [...bills];
    newBills.splice(index, 1);
    setBills(newBills);
  };

  let subLocationsCount = 0;
  if (images.length > 0) {
    const locations = [];
    images.forEach(img => {
      let isNewLocation = true;
      for (const loc of locations) {
        if (getDistance(img.lat, img.lng, loc.lat, loc.lng) < 20) {
          isNewLocation = false;
          break;
        }
      }
      if (isNewLocation) {
        locations.push({ lat: img.lat, lng: img.lng });
        subLocationsCount++;
      }
    });
  }

  const isValid = images.length >= 4 && subLocationsCount >= 3 && bills.length >= 1;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      const imageMetadata = [];
      images.forEach((img, i) => {
        formData.append(`images`, img.file);
        imageMetadata.push({
          index: i,
          lat: img.lat,
          lng: img.lng,
          accuracy: img.accuracy,
          timestamp: img.timestamp
        });
      });
      
      bills.forEach(bill => {
        formData.append('bills', bill);
      });
      
      formData.append('imageMetadata', JSON.stringify(imageMetadata));

      if (api.upload) {
        await api.upload(`/submissions/${listingId}`, formData);
      } else {
        await api.post(`/submissions/${listingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || t('Submission failed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">{t('Loading...')}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">{t('Capture Field Data')}</h1>
      
      {windowStatus && windowStatus.status !== 'OPEN' && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
          {t('Submission window is not open for this listing.')}
        </div>
      )}

      <div className="glass-panel p-4 mb-6">
        <h2 className="text-xl font-heading font-semibold mb-4">{t('Field Images')}</h2>
        
        <div className="flex gap-4 mb-4">
          <div className={`flex items-center gap-2 text-sm ${images.length >= 4 ? 'text-green-600' : 'text-amber-600'}`}>
            {images.length >= 4 ? <CheckCircle size={16}/> : <XCircle size={16}/>}
            {images.length}/4+ {t('Images')}
          </div>
          <div className={`flex items-center gap-2 text-sm ${subLocationsCount >= 3 ? 'text-green-600' : 'text-amber-600'}`}>
            {subLocationsCount >= 3 ? <CheckCircle size={16}/> : <XCircle size={16}/>}
            {subLocationsCount}/3+ {t('Locations (>20m apart)')}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border">
              <img src={img.preview} alt="Capture" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 flex items-center justify-center">
                <MapPin size={10} className="mr-1"/> ±{Math.round(img.accuracy)}m
              </div>
              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                <XCircle size={14} />
              </button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-brand-blue">
            <Camera size={32} className="mb-2" />
            <span className="text-sm font-medium">{t('Capture')}</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handleImageCapture} 
              multiple 
            />
          </label>
        </div>
      </div>

      <div className="glass-panel p-4 mb-6">
        <h2 className="text-xl font-heading font-semibold mb-4">{t('Bills & Invoices')}</h2>
        
        <div className={`flex items-center gap-2 text-sm mb-4 ${bills.length >= 1 ? 'text-green-600' : 'text-amber-600'}`}>
          {bills.length >= 1 ? <CheckCircle size={16}/> : <XCircle size={16}/>}
          {bills.length}/1+ {t('Required')}
        </div>

        <ul className="mb-4 space-y-2">
          {bills.map((bill, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
              <span className="text-sm truncate mr-4">{bill.name}</span>
              <button onClick={() => removeBill(i)} className="text-red-500 hover:text-red-700">
                <XCircle size={16} />
              </button>
            </li>
          ))}
        </ul>

        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-brand-blue">
          <Upload size={20} className="mr-2" />
          <span className="text-sm font-medium">{t('Upload Bill (Image/PDF)')}</span>
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            className="hidden" 
            onChange={handleBillUpload} 
            multiple 
          />
        </label>
      </div>

      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {success && <div className="text-green-600 mb-4 text-center">{t('Submission successful! Redirecting...')}</div>}

      <button 
        onClick={handleSubmit} 
        disabled={!isValid || submitting || success}
        className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${isValid && !submitting ? 'bg-brand-green hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {submitting ? t('Uploading...') : t('Submit Data')}
      </button>
    </div>
  );
};

export default CaptureScreen;
