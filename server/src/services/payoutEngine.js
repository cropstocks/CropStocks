export const computePayout = (listing, investments) => {
  const revenue = listing.harvestRevenue || 0;
  const capitalRaised = listing.capitalRaised;
  const profit = revenue - capitalRaised;
  
  const payouts = [];
  
  // If failed, insurance covers capital
  if (listing.status === 'FAILED') {
    for (const inv of investments) {
      payouts.push({
        investorId: inv.investorId,
        investmentId: inv.id,
        amount: inv.amount, // Principal back via insurance
        type: 'INSURANCE'
      });
    }
    return payouts;
  }
  
  if (profit <= 0) {
    // Loss, return whatever revenue is left proportionally
    for (const inv of investments) {
      const returnAmount = (inv.amount / capitalRaised) * revenue;
      payouts.push({
        investorId: inv.investorId,
        investmentId: inv.id,
        amount: returnAmount,
        type: 'PRINCIPAL'
      });
    }
  } else {
    // Profit
    const investorTotalProfit = profit * (listing.profitSplitInvestor / 100);
    
    for (const inv of investments) {
      const investorShare = inv.amount / capitalRaised;
      const profitShare = investorTotalProfit * investorShare;
      payouts.push({
        investorId: inv.investorId,
        investmentId: inv.id,
        amount: inv.amount + profitShare,
        type: 'PROFIT'
      });
    }
    
    // Farmer payout
    const farmerProfit = profit * (listing.profitSplitFarmer / 100);
    payouts.push({
      farmerId: listing.farmerId,
      amount: farmerProfit,
      type: 'PROFIT'
    });
  }
  
  return payouts;
};
