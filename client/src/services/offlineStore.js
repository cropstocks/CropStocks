/**
 * Offline Storage Service
 * Uses IndexedDB to store captured images and bills locally when offline.
 * Syncs with server when connectivity is restored.
 */

const DB_NAME = 'cropstocks_offline';
const DB_VERSION = 1;
const STORE_SUBMISSIONS = 'pending_submissions';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_SUBMISSIONS)) {
        db.createObjectStore(STORE_SUBMISSIONS, { keyPath: 'id' });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

export const offlineStore = {
  // Save a pending submission (images as blobs + metadata)
  save: async (listingId, imageFiles, billFiles, imageMetadata) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SUBMISSIONS, 'readwrite');
      const store = tx.objectStore(STORE_SUBMISSIONS);
      const submission = {
        id: Date.now().toString(),
        listingId,
        imageFiles,
        billFiles,
        imageMetadata,
        timestamp: Date.now()
      };
      const req = store.add(submission);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  
  // Get all pending submissions for a listing
  getPending: async (listingId) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SUBMISSIONS, 'readonly');
      const store = tx.objectStore(STORE_SUBMISSIONS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result.filter(s => s.listingId === listingId));
      req.onerror = () => reject(req.error);
    });
  },
  
  // Remove a submission after successful sync
  remove: async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SUBMISSIONS, 'readwrite');
      const store = tx.objectStore(STORE_SUBMISSIONS);
      const req = store.delete(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  
  // Get count of all pending submissions
  pendingCount: async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SUBMISSIONS, 'readonly');
      const store = tx.objectStore(STORE_SUBMISSIONS);
      const req = store.count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  
  // Sync all pending submissions with the server
  syncAll: async (uploadFn) => {
    const db = await openDB();
    const all = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SUBMISSIONS, 'readonly');
      const store = tx.objectStore(STORE_SUBMISSIONS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    
    for (const sub of all) {
      try {
        await uploadFn(sub);
        await offlineStore.remove(sub.id);
      } catch (err) {
        console.error('Sync failed for submission', sub.id, err);
      }
    }
  },
  
  // Check if online
  isOnline: () => navigator.onLine
};
