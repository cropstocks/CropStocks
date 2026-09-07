import express from 'express';
import { registerFarmer, getSatelliteStatus } from '../controllers/satellite.controller.js';

const router = express.Router();

router.post('/register', registerFarmer);
router.get('/:id/satellite-status', getSatelliteStatus);

export default router;
