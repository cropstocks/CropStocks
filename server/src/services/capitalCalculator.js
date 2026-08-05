const PER_UNIT_COSTS = {
  wheat: { seeds: 100, fertilizer: 200, labor: 300, other: 50 },
  rice: { seeds: 150, fertilizer: 250, labor: 400, other: 100 },
  poultry: { feed: 300, vaccines: 50, labor: 100, other: 50 },
  default: { input: 200, labor: 200, other: 100 }
};

export const calculateCapital = (type, produceName, size) => {
  const normalizedName = produceName.toLowerCase();
  const costs = PER_UNIT_COSTS[normalizedName] || PER_UNIT_COSTS.default;
  
  let inputBreakdown = [];
  let totalCapital = 0;
  
  for (const [key, value] of Object.entries(costs)) {
    const cost = value * size;
    inputBreakdown.push({ name: key, quantity: size, unitCost: value, totalCost: cost });
    totalCapital += cost;
  }
  
  const riskTier = determineRisk(normalizedName);
  const { farmerSplit, investorSplit } = determineSplit(riskTier);
  const insurancePremium = totalCapital * (riskTier === 'HIGH' ? 0.05 : riskTier === 'MEDIUM' ? 0.04 : 0.03);
  
  inputBreakdown.push({ name: 'insurance', quantity: 1, unitCost: insurancePremium, totalCost: insurancePremium });
  totalCapital += insurancePremium;
  
  return {
    capitalRequired: totalCapital,
    inputBreakdown: JSON.stringify(inputBreakdown),
    riskTier,
    profitSplitFarmer: farmerSplit,
    profitSplitInvestor: investorSplit
  };
};

const determineRisk = (produce) => {
  if (['poultry', 'cotton'].includes(produce)) return 'HIGH';
  if (['wheat', 'rice'].includes(produce)) return 'MEDIUM';
  return 'LOW';
};

const determineSplit = (riskTier) => {
  if (riskTier === 'HIGH') return { farmerSplit: 50, investorSplit: 50 };
  if (riskTier === 'MEDIUM') return { farmerSplit: 60, investorSplit: 40 };
  return { farmerSplit: 70, investorSplit: 30 };
};
