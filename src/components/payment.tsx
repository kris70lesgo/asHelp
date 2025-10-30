"use client";

import React, { useState, useMemo } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSearchParams } from "next/navigation";
import { GradientIconButton } from "@/components/ui/GradientIconButton";
import Script from "next/script";

// Types for window.Razorpay
declare global {
  interface Window {
    Razorpay?: any;
  }
}

export function PaymentOptionsOverlay() {
  const searchParams = useSearchParams();

  // ---- Read data from query params (with fallbacks) ----
  const amountStr = searchParams.get("amount") || "100";
  const amountRupees = Number(amountStr) || 100;
  const customerName = searchParams.get("name") || "Customer";
  const customerEmail = searchParams.get("email") || "customer@example.com";
  // Your internal order id (e.g., assignment id). If you don't have one, we generate a temporary one.
  const appOrderId =
    searchParams.get("orderId") || `ASHELP-${new Date().getTime()}`;

  // Basic item model. You can expand this to match your actual cart.
  const items = useMemo(() => {
    const qpName = searchParams.get("itemName");
    const qpQty = Number(searchParams.get("qty") || "1");
    const pages = Number(searchParams.get("pages") || "0");
    // If pages are provided, show that as quantity; else default 1.
    if (qpName) {
      return [{ name: qpName, qty: qpQty > 0 ? qpQty : 1 }];
    }
    if (pages > 0) {
      return [{ name: "Assignment Pages", qty: pages }];
    }
    return [{ name: "Assignment", qty: 1 }];
  }, [searchParams]);

  // ---- UI state ----
  const [selected, setSelected] = useState<"cod" | "online">("cod");
  const [confirmed, setConfirmed] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  // Show thank-you panel after the short animation
  React.useEffect(() => {
    if (confirmed) {
      const t = setTimeout(() => setShowThankYou(true), 2000);
      return () => clearTimeout(t);
    }
  }, [confirmed]);

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  // ---------------------------
  // COD: send confirmation email via server
  // ---------------------------
  const placeCOD = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/notify/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          customerName,
          orderId: appOrderId,
          paymentId: `COD-${appOrderId}`,
          items,
          totalAmount: amountRupees,
          isCOD: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        // Email failed (or route error). We still confirm the order, but we notify the user.
        alert(
          "Order placed. We couldn't send the email right now—no worries, we'll follow up."
        );
      }
      setConfirmed(true);
    } catch (err) {
      console.error("[COD] notify/confirmation failed:", err);
      alert(
        "Order placed. We couldn't send the email right now—no worries, we'll follow up."
      );
      setConfirmed(true);
    } finally {
      setBusy(false);
    }
  };

  // ---------------------------
  // Razorpay: create order (server) → open checkout → verify (server) → email
  // ---------------------------
  const handleRazorpayPayment = async () => {
    if (busy) return;
    if (!razorpayLoaded || !window.Razorpay) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }
    if (!razorpayKey) {
      alert("Razorpay key is not configured.");
      return;
    }

    setBusy(true);
    try {
      const amountPaise = Math.round(amountRupees * 100);

      // 1) Create order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPaise,
          receipt: `ashelp_${Date.now()}`,
        }),
      });
      const { order, error } = await orderRes.json();
      if (!orderRes.ok || !order?.id) {
        console.error("[create-order] error:", error || orderRes.statusText);
        alert("Could not start payment. Please try again.");
        setBusy(false);
        return;
      }

      // 2) Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: amountPaise,
        currency: "INR",
        name: "AsHelp",
        description: "Assignment/Order Payment",
        image: "/logo.png",
        order_id: order.id, // IMPORTANT
        prefill: {
          name: customerName,
          email: customerEmail,
        },
        notes: {
          app_order_id: appOrderId,
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 3) Verify payment on server (also sends email)
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // Email payload:
                customerEmail,
                customerName,
                items,
                totalAmount: amountRupees,
                orderIdPublic: appOrderId,
              }),
            });
            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok || !verifyJson?.ok) {
              alert(
                "Payment received. We couldn't send the email right now—no worries, we'll follow up."
              );
            }
            setConfirmed(true);
          } catch (e) {
            console.error("[verify] failed:", e);
            alert(
              "Payment received. We couldn't send the email right now—no worries, we'll follow up."
            );
            setConfirmed(true);
          } finally {
            setBusy(false);
          }
        },
        theme: { color: "#6C5CE7" },
        modal: {
          ondismiss: () => {
            setBusy(false);
          },
        },
      };

      // 4) Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("[razorpay] error:", err);
      alert("Something went wrong starting the payment. Please try again.");
      setBusy(false);
    }
  };

  if (showThankYou) {
    return (
      <BackgroundBeamsWithCollision>
        <div className="z-20 relative flex flex-col items-center justify-center w-full h-full min-h-[32rem] px-2 sm:px-4">
          <div className="bg-black font-sans rounded-2xl shadow-2xl p-3 sm:p-6 w-full max-w-2xl flex flex-col items-center transition-all duration-500 max-h-screen overflow-y-auto">
            <span className="text-white text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
              Thank you for ordering from us
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              What happens next?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 w-full mb-6 sm:mb-8">
              {/* Order Confirmation */}
              <div className="flex flex-col items-center flex-1 min-w-[140px] sm:min-w-[180px]">
                <span className="bg-blue-100 rounded-full p-3 sm:p-4 mb-2 sm:mb-3">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="12" fill="#e0edff" />
                    <path
                      d="M6 8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5v7A2.5 2.5 0 0 1 15.5 18h-7A2.5 2.5 0 0 1 6 15.5v-7Z"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.75 8.75 12 12.25l4.25-3.5"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-bold text-black text-base sm:text-lg mb-1">
                  Order Confirmation
                </span>
                <span className="text-gray-500 text-center text-xs sm:text-sm">
                  You&apos;ll receive an email confirmation shortly with your
                  order details.
                </span>
              </div>
              {/* Processing */}
              <div className="flex flex-col items-center flex-1 min-w-[140px] sm:min-w-[180px]">
                <span className="bg-orange-100 rounded-full p-3 sm:p-4 mb-2 sm:mb-3">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="12" fill="#fff7ed" />
                    <path
                      d="M7 9.5V15a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9.5m-10 0L12 6l5 3.5m-10 0h10"
                      stroke="#fb923c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-bold text-black text-base sm:text-lg mb-1">
                  Processing
                </span>
                <span className="text-gray-500 text-center text-xs sm:text-sm">
                  We&apos;ll prepare your order for shipment within 1-2 business
                  days.
                </span>
              </div>
              {/* Shipping */}
              <div className="flex flex-col items-center flex-1 min-w-[140px] sm:min-w-[180px]">
                <span className="bg-green-100 rounded-full p-3 sm:p-4 mb-2 sm:mb-3">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="12" fill="#e6f9f0" />
                    <path
                      d="M3 13V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7m-13 0h13m-13 0v5a1 1 0 0 0 1 1h1m11-6h2.382a1 1 0 0 1 .894.553l1.382 2.764A1 1 0 0 1 21 15.236V18a1 1 0 0 1-1 1h-1m-2-6v5m-10 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6"
                      stroke="#22c55e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-bold text-black text-base sm:text-lg mb-1">
                  Shipping
                </span>
                <span className="text-gray-500 text-center text-xs sm:text-sm">
                  Track your package with the tracking number we&apos;ll send
                  you.
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
              <GradientIconButton href="/dashboard">
                Continue Shopping
              </GradientIconButton>
            </div>
          </div>

          {/* Footer: Need Help? */}
          <footer className="mt-8 flex flex-col items-center w-full text-center px-2">
            <span className="font-bold text-white text-base sm:text-lg mb-2">
              Need Help?
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 w-full justify-center">
              <span className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm justify-center w-full sm:w-auto">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4Z" stroke="#64748b" strokeWidth="1.5" />
                  <path
                    d="M4 4l8 8 8-8"
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                </svg>{" "}
                fukutsu07@gmail.com
              </span>
              <span className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm justify-center w-full sm:w-auto">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6.5 4h11A1.5 1.5 0 0 1 19 5.5v13A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-13A1.5 1.5 0 0 1 6.5 4Z"
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 7h8M8 11h8M8 15h4"
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                </svg>{" "}
                6398317816
              </span>
            </div>
            <span className="text-gray-400 text-xs text-center">
              Customer service is available Monday-Friday, 9AM-6PM EST
            </span>
          </footer>
        </div>
      </BackgroundBeamsWithCollision>
    );
  }

  return (
    <>
      {/* Load Razorpay safely on client */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayLoaded(true)}
      />

      <BackgroundBeamsWithCollision>
        <div className="z-20 relative flex flex-col items-center justify-center w-full h-full min-h-[32rem] px-4">
          {/* Overlay animation when confirmed */}
          {confirmed && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <DotLottieReact
                src="https://lottie.host/020f0878-a50b-4658-a8a9-6a05fe1ee407/ciy6ttNvHa.lottie"
                loop={false}
                autoplay
                style={{ width: 180, height: 180 }}
              />
            </div>
          )}

          <div className="bg-[#1a2636] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md flex flex-col items-center border border-[#25324a] transition-all duration-500">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
              Payment Options
            </h2>
            <p className="text-[#b0bed0] mb-6 sm:mb-8 text-center text-sm sm:text-base">
              Choose your preferred payment method to complete your order
            </p>

            <div className="space-y-3 sm:space-y-4 w-full">
              {/* Cash on Delivery Option */}
              <label
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selected === "cod"
                    ? "border-green-400 bg-[#163024]"
                    : "border-[#25324a] bg-[#202e44]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selected === "cod"}
                  onChange={() => setSelected("cod")}
                  className="accent-green-400 w-4 h-4 sm:w-5 sm:h-5"
                />
                <span
                  className={`flex items-center justify-center rounded-full ${
                    selected === "cod" ? "bg-green-700" : "bg-[#22304a]"
                  } w-8 h-8 sm:w-10 sm:h-10`}
                >
                  <svg
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 13V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7m-13 0h13m-13 0v5a1 1 0 0 0 1 1h1m11-6h2.382a1 1 0 0 1 .894.553l1.382 2.764A1 1 0 0 1 21 15.236V18a1 1 0 0 1-1 1h-1m-2-6v5m-10 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-white text-sm sm:text-base">
                    Cash on Delivery
                  </span>
                  <span className="text-[#7b8ca6] text-xs sm:text-sm">
                    Pay when your order arrives
                  </span>
                </span>
                <span className="bg-green-700 text-green-200 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded whitespace-nowrap">
                  ₹{amountRupees}
                </span>
              </label>

              {/* Online Payment Option */}
              <label
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selected === "online"
                    ? "border-blue-400 bg-[#1a2336]"
                    : "border-[#25324a] bg-[#202e44]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={selected === "online"}
                  onChange={() => setSelected("online")}
                  className="accent-blue-400 w-4 h-4 sm:w-5 sm:h-5"
                />
                <span
                  className={`flex items-center justify-center rounded-full ${
                    selected === "online" ? "bg-blue-700" : "bg-[#22304a]"
                  } w-8 h-8 sm:w-10 sm:h-10`}
                >
                  <svg
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3 10h18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-white text-sm sm:text-base">
                    Online Payment
                  </span>
                  <span className="text-[#7b8ca6] text-xs sm:text-sm">
                    Pay securely with Razorpay
                  </span>
                </span>
                <span className="bg-blue-700 text-blue-200 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded whitespace-nowrap">
                  ₹{amountRupees}
                </span>
              </label>
            </div>

            <Button
              disabled={busy}
              className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 text-base sm:text-lg font-bold rounded-md bg-white text-black hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                if (selected === "online") {
                  handleRazorpayPayment();
                } else {
                  placeCOD();
                }
              }}
            >
              {busy ? "Please wait…" : "Confirm Order"}
            </Button>

            <p className="text-[#7b8ca6] text-xs mt-4 sm:mt-6 text-center">
              By confirming your order, you agree to our terms and conditions
            </p>

            {confirmed && (
              <div className="mt-4 sm:mt-6 text-center flex flex-col items-center opacity-0 pointer-events-none select-none">
                <span className="text-white text-lg sm:text-xl font-semibold">
                  Order Confirmed!
                </span>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Thank you for your order.
                </p>
              </div>
            )}
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
}
