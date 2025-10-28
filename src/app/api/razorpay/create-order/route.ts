import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { amount, receipt } = await req.json();
    // amount should be in INR paise (₹1 = 100)
    if (!amount) return NextResponse.json({ error: "amount required" }, { status: 400 });

    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency: "INR",
      receipt: receipt ?? `rcpt_${Date.now()}`,
    });

    return NextResponse.json({ order });
  } catch (err: any) {
    console.error("[create-order] error:", err);
    return NextResponse.json({ error: "failed_to_create_order" }, { status: 500 });
  }
}
