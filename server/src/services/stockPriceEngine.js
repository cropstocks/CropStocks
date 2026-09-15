/**
 * Stock Price Engine
 * 
 * Computes a dynamic "stock price" per share unit for each listing.
 * The price is influenced by:
 *   1. Base capital (capitalRequired / 100 share units)
 *   2. NDVI vegetation health (healthy crops = higher price, up to +30%)
 *   3. Funding momentum (higher demand = slight premium, up to +10%)
 *   4. Risk tier (HIGH = -10%, MEDIUM = 0%, LOW = +5%)
 */

const SHARE_UNITS = 100; // Each listing has 100 "share units"

/**
 * Compute the current stock price for a listing.
 * @param {Object} listing — The listing object from Prisma
 * @returns {number} — Stock price per share unit (in ₹)
 */
export const computeStockPrice = (listing) => {
  const basePrice = listing.capitalRequired / SHARE_UNITS;

  // NDVI multiplier: 0.0 → no boost, 1.0 → +30% boost
  const ndvi = listing.ndviScore ?? 0.5; // default to 0.5 if no satellite data yet
  const ndviMultiplier = 1.0 + (ndvi * 0.3);

  // Funding momentum: fully funded → +10% premium
  const fundingRatio = listing.capitalRequired > 0
    ? Math.min(listing.capitalRaised / listing.capitalRequired, 1.0)
    : 0;
  const fundingMultiplier = 1.0 + (fundingRatio * 0.1);

  // Risk adjustment
  const riskMultiplier = listing.riskTier === 'HIGH' ? 0.90
    : listing.riskTier === 'LOW' ? 1.05
    : 1.00; // MEDIUM

  const price = basePrice * ndviMultiplier * fundingMultiplier * riskMultiplier;
  return Math.round(price * 100) / 100; // round to 2 decimal places
};

/**
 * Convert an NDVI score to a human-readable vegetation status.
 * @param {number|null} ndviScore — 0.0 to 1.0
 * @returns {string} — Vegetation health status
 */
export const computeVegetationStatus = (ndviScore) => {
  if (ndviScore === null || ndviScore === undefined) return 'Awaiting Data';
  if (ndviScore >= 0.8) return 'Excellent';
  if (ndviScore >= 0.6) return 'Good';
  if (ndviScore >= 0.4) return 'Fair';
  if (ndviScore >= 0.2) return 'Poor';
  return 'Critical';
};

/**
 * Get the CSS color class for a vegetation status.
 * (Used by the frontend via the API response)
 */
export const getVegetationColor = (status) => {
  const colors = {
    'Excellent': '#22c55e',  // green-500
    'Good': '#84cc16',       // lime-500
    'Fair': '#eab308',       // yellow-500
    'Poor': '#f97316',       // orange-500
    'Critical': '#ef4444',   // red-500
    'Awaiting Data': '#6b7280' // gray-500
  };
  return colors[status] || colors['Awaiting Data'];
};

/**
 * Apply a weekly reprice delta to a listing's stock price.
 * Called by the weekly loop's repricingEngine after T7.
 * @param {Object} listing — The listing from Prisma
 * @param {number} deltaPercent — The computed price change percentage
 * @param {number} maxClamp — Maximum allowed weekly movement (default 8%)
 * @returns {{ newPrice: number, clamped: boolean, actualDelta: number }}
 */
export const applyWeeklyReprice = (listing, deltaPercent, maxClamp = 8) => {
  const currentPrice = listing.stockPrice || computeStockPrice(listing);
  let actualDelta = deltaPercent;
  let clamped = false;
  
  if (Math.abs(deltaPercent) > maxClamp) {
    actualDelta = maxClamp * Math.sign(deltaPercent);
    clamped = true;
  }
  
  const newPrice = Math.round(currentPrice * (1 + actualDelta / 100) * 100) / 100;
  return { newPrice: Math.max(newPrice, 1), clamped, actualDelta }; // floor at ₹1
};
