import express from 'express';
import { registerFarmer, getSatelliteStatus, getSatelliteHistory } from '../controllers/satellite.controller.js';

const router = express.Router();

router.post('/register', registerFarmer);
router.get('/:id/satellite-status', getSatelliteStatus);
router.get('/:id/history', getSatelliteHistory);

export default router;
