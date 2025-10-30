import Razorpay from "razorpay";

// Lazily create a Razorpay instance to avoid executing at module-load time
// (which can fail during build when env vars are not provided).
export function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}
