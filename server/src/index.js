import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mkdirSync } from 'fs';
import authRoutes from './routes/auth.routes.js';
import listingRoutes from './routes/listing.routes.js';
import investmentRoutes from './routes/investment.routes.js';
import progressRoutes from './routes/progress.routes.js';
import adminRoutes from './routes/admin.routes.js';
import guidanceRoutes from './routes/guidance.routes.js';
import surveyRoutes from './routes/survey.routes.js';
import satelliteRoutes from './routes/satellite.routes.js';
import cropCycleRoutes from './routes/cropCycle.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import reportRoutes from './routes/report.routes.js';
import reviewRoutes from './routes/review.routes.js';
import appealRoutes from './routes/appeal.routes.js';
import { initializeScheduler } from './services/weeklyLoop/weeklyLoopScheduler.js';

dotenv.config();

const app = express();

// Ensure uploads directory exists (ephemeral on cloud, but needed at runtime)
mkdirSync('uploads/submissions', { recursive: true });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CropStocks™ API is running! Please access the application through the frontend client.');
});

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/guidance', guidanceRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/farmers', satelliteRoutes);
app.use('/api/crop-cycle', cropCycleRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/appeals', appealRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  initializeScheduler();
});

