export const mockInvestments = [
  {
    id: 'INV001',
    farmName: 'Green Acres Corp',
    farmerName: 'Ramesh Patel',
    cropName: 'Organic Wheat',
    season: 'Rabi 2026',
    totalValue: 500000,
    valuePerShare: 100,
    issueSize: 5000,
    remainingIssue: 1200,
    riskFactor: 'Low',
    maturityDate: '2027-04-15',
    farmerSuccessRate: 92,
    history: [
      { month: 'Jan', performance: 65 },
      { month: 'Feb', performance: 72 },
      { month: 'Mar', performance: 85 },
      { month: 'Apr', performance: 92 }
    ]
  },
  {
    id: 'INV002',
    farmName: 'Sunrise Plantations',
    farmerName: 'Suresh Kumar',
    cropName: 'Alphonso Mangoes',
    season: 'Summer 2026',
    totalValue: 1200000,
    valuePerShare: 500,
    issueSize: 2400,
    remainingIssue: 300,
    riskFactor: 'Medium',
    maturityDate: '2026-06-30',
    farmerSuccessRate: 88,
    history: [
      { month: 'Jan', performance: 40 },
      { month: 'Feb', performance: 55 },
      { month: 'Mar', performance: 70 },
      { month: 'Apr', performance: 88 }
    ]
  },
  {
    id: 'INV003',
    farmName: 'Golden Fields Ltd',
    farmerName: 'Anita Desai',
    cropName: 'Basmati Rice',
    season: 'Kharif 2026',
    totalValue: 800000,
    valuePerShare: 200,
    issueSize: 4000,
    remainingIssue: 4000,
    riskFactor: 'Low',
    maturityDate: '2026-11-20',
    farmerSuccessRate: 95,
    history: [
      { month: 'Jan', performance: 80 },
      { month: 'Feb', performance: 85 },
      { month: 'Mar', performance: 90 },
      { month: 'Apr', performance: 95 }
    ]
  }
];

export const userPortfolio = [
  {
    investmentId: 'INV001',
    sharesOwned: 150,
    currentValue: 16500,
    growth: 10
  }
];
