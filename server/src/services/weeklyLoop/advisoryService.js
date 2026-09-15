import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../../utils/prisma.js';
import kbData from '../../data/agronomyKB.json' with { type: 'json' };

export const generateAdvisory = async (analysis, cycleState, detections = []) => {
  const remediations = [];
  let openFlags = cycleState.openDiseaseFlags ? JSON.parse(cycleState.openDiseaseFlags) : [];
  
  for (const det of detections) {
    const key = det.diseaseName.toLowerCase().replace(/ /g, '_');
    const diseaseInfo = kbData.diseases[key];
    
    let content = {};
    if (diseaseInfo) {
      content = {
        explanation: diseaseInfo.explanation,
        treatment: diseaseInfo.treatment,
        urgency: diseaseInfo.urgency
      };
    } else {
      content = {
        explanation: { en: 'Unknown issue detected.', hi: 'अज्ञात समस्या का पता चला।', gu: 'અજ્ઞાત સમસ્યા મળી.' },
        treatment: { en: 'Please consult a field agent.', hi: 'कृपया फील्ड एजेंट से सलाह लें।', gu: 'કૃપા કરીને ફીલ્ડ એજન્ટની સલાહ લો.' },
        urgency: 'MODERATE'
      };
    }
    
    const card = await prisma.remediationCard.create({
      data: {
        analysisId: analysis.id,
        diseaseName: det.diseaseName,
        content: JSON.stringify(content),
        followUpFlag: true
      }
    });
    remediations.push(card);
    if (!openFlags.includes(key)) {
      openFlags.push(key);
    }
  }

  // Resolve old flags if not in current detections and health > 60
  if (analysis.healthIndex > 60) {
    const currentKeys = detections.map(d => d.diseaseName.toLowerCase().replace(/ /g, '_'));
    openFlags = openFlags.filter(f => currentKeys.includes(f));
  }
  
  await prisma.cropCycleState.update({
    where: { id: cycleState.id },
    data: { openDiseaseFlags: JSON.stringify(openFlags) }
  });

  return remediations;
};
