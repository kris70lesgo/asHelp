import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { customerEmail, customerName, orderId, paymentId, items, totalAmount, isCOD } = await req.json();
    if (!customerEmail || !orderId) {
      return NextResponse.json({ error: "customerEmail and orderId required" }, { status: 400 });
    }

    try {
      await sendOrderEmail({
        to: customerEmail,
        customerName: customerName ?? "Customer",
        orderId,
        paymentId: paymentId ?? (isCOD ? `COD-${orderId}` : "N/A"),
        items: Array.isArray(items) ? items : [],
        totalAmount: Number(totalAmount ?? 0),
        isCOD: Boolean(isCOD),
      });
    } catch (mailErr) {
      console.error("[notify/confirmation] email failed:", mailErr, { orderId, customerEmail });
      // Persist to your DB for retry if desired.
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[notify/confirmation] error:", err);
    return NextResponse.json({ error: "notify_failed" }, { status: 500 });
  }
}

