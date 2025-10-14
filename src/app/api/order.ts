import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', receipt = 'receipt_order_74394' } = body;
    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Number(amount) * 100, // amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Order creation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}