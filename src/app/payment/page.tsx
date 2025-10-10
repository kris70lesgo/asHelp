"use client";
import NextDynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const PaymentClientWrapper = NextDynamic(() => import('@/components/payment-client'), { ssr: false });

export default function PaymentPage() {
  return <PaymentClientWrapper />;
}
