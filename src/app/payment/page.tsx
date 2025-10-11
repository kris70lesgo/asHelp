"use client";
import React, { useState, useEffect } from "react";
import { PaymentOptionsOverlay } from "@/components/payment";
import LoadingScreen from "@/components/LoadingScreen";

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <LoadingScreen
        isVisible={isLoading}
        loadingMessages={[
          "Preparing payment gateway...",
          "Almost ready to pay...",
        ]}
        variant="minimal"
        customDuration={2000}
      />
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <PaymentOptionsOverlay />
      </div>
    </>
  );
}
