"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const PaymentOptionsOverlay = dynamic(() => import('@/components/payment').then(m => m.PaymentOptionsOverlay), { ssr: false });

export default function PaymentClientWrapper() {
  return <PaymentOptionsOverlay />;
}
