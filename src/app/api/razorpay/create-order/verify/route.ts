import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOrderEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // for email:
      customerEmail,
      customerName,
      items,           // [{name, qty}]
      totalAmount,     // in rupees (for email only)
      orderIdPublic,   // your own app order id (if you have one)
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "missing_razorpay_params" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
    }

    // Signature OK → send email
    try {
      await sendOrderEmail({
        to: customerEmail,
        customerName,
        orderId: orderIdPublic ?? razorpay_order_id,
        paymentId: razorpay_payment_id,
        items: Array.isArray(items) ? items : [],
        totalAmount: Number(totalAmount ?? 0),
        isCOD: false,
      });
    } catch (mailErr) {
      // Log email failure for retry
      console.error("[verify] email send failed:", mailErr, { customerEmail, razorpay_order_id });
      // You can persist to DB here if you want a retry queue.
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[verify] error:", err);
    return NextResponse.json({ error: "verify_failed" }, { status: 500 });
  }
}
