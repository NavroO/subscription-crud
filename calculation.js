/**
 * Calculate total annual cost of subscriptions
 * @param {Subscription[]} subscriptions - List of subscriptions
 * @returns {number} Total annual cost
 */
export function calculateAnnualCost(subscriptions) {
  return subscriptions.reduce((total, sub) => {
    const yearlyCost =
      sub.billingCycle === "monthly" ? sub.monthlyCost * 12 : sub.monthlyCost;
    return total + yearlyCost;
  }, 0);
}

/**
 * Suggest subscriptions to cancel to meet a savings goal
 * @param {Subscription[]} subscriptions - List of subscriptions
 * @param {number} targetSavings - Target amount to save
 * @returns {string[]} List of subscriptions to cancel
 */
export function suggestCancellations(subscriptions, targetSavings) {
  const sortedSubs = [...subscriptions].sort(
    (a, b) => b.monthlyCost * 12 - a.monthlyCost * 12
  );

  let accumulatedSavings = 0;
  const toCancel = [];

  for (const sub of sortedSubs) {
    const yearlyCost =
      sub.billingCycle === "monthly" ? sub.monthlyCost * 12 : sub.monthlyCost;
    if (accumulatedSavings >= targetSavings) break;
    toCancel.push(sub.name);
    accumulatedSavings += yearlyCost;
  }

  return toCancel;
}
