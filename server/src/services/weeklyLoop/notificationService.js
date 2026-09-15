import prisma from '../../utils/prisma.js';

export const notifyFarmer = async (farmerId, messageKey, params, language = 'en') => {
  console.log(`[NOTIFICATION] Farmer ${farmerId} | MSG: ${messageKey} | LANG: ${language}`, params);
  await prisma.auditLog.create({
    data: {
      action: 'NOTIFY_FARMER',
      details: JSON.stringify({ messageKey, params, language }),
      userId: farmerId,
    }
  });
};

export const notifyAdmin = async (messageKey, params) => {
  console.log(`[NOTIFICATION] Admin | MSG: ${messageKey}`, params);
};

export const notifyFieldAgent = async (farmerId, messageKey, params) => {
  console.log(`[NOTIFICATION] Field Agent for Farmer ${farmerId} | MSG: ${messageKey}`, params);
};
