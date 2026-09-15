import prisma from '../../utils/prisma.js';
import { notifyFarmer } from './notificationService.js';

export const openSubmissionWindow = async (cycleState) => {
  const now = new Date();
  // Monday 00:00 to Thursday 00:00 is exactly 72 hours
  const expiresAt = new Date(now.getTime() + 72 * 60 * 60 * 1000);

  const submissionWindow = await prisma.submissionWindow.create({
    data: {
      cycleStateId: cycleState.id,
      openedAt: now,
      expiresAt: expiresAt,
      status: 'OPEN',
    }
  });

  const satelliteSnapshot = await prisma.satelliteSnapshot.create({
    data: {
      submissionWindowId: submissionWindow.id,
      captureDate: now,
      ndviMean: 0.65 + (Math.random() * 0.1 - 0.05),
      cloudCover: Math.random() * 0.2,
      rawImageUrl: 'https://mock-satellite.cropstocks.in/image.png'
    }
  });

  await notifyFarmer(cycleState.farmerId, 'SUBMISSION_WINDOW_OPEN', { windowId: submissionWindow.id });

  return { submissionWindow, satelliteSnapshot };
};
