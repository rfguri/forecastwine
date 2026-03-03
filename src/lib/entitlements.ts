// Entitlements & paywall scaffold
// Currently returns false for all premium checks.
// When Stripe is integrated, this will check subscription status.

const FREE_FORECAST_DAYS = 3; // Today + 2 days

export function hasPremiumAccess(): boolean {
  // TODO: Check Stripe subscription status
  if (typeof window !== "undefined" && localStorage.getItem("fw-dev-premium") === "1") {
    return true;
  }
  return false;
}

export function toggleDevPremium(): boolean {
  const next = localStorage.getItem("fw-dev-premium") === "1" ? false : true;
  if (next) {
    localStorage.setItem("fw-dev-premium", "1");
  } else {
    localStorage.removeItem("fw-dev-premium");
  }
  return next;
}

export function getVisibleDays(): number {
  return hasPremiumAccess() ? 30 : FREE_FORECAST_DAYS;
}

export function isPaywalled(dayIndex: number): boolean {
  if (hasPremiumAccess()) return false;
  return dayIndex >= FREE_FORECAST_DAYS;
}

// Stripe stubs for future integration
export const STRIPE_CONFIG = {
  priceId: "", // Stripe price ID for €0.99/month
  productId: "", // Stripe product ID
  successUrl: "/subscribe/success",
  cancelUrl: "/subscribe",
} as const;

export async function createCheckoutSession(): Promise<string> {
  // TODO: Call /api/stripe/checkout to create a Stripe Checkout session
  // Returns the checkout URL
  throw new Error("Stripe not yet integrated");
}

export async function getSubscriptionStatus(): Promise<{
  active: boolean;
  expiresAt: Date | null;
}> {
  // TODO: Check subscription status via Stripe API
  return { active: false, expiresAt: null };
}
