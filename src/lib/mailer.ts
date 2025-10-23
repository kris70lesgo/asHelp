import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 465),
  secure: Number(SMTP_PORT ?? 465) === 465, // true for 465
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export async function sendOrderEmail(opts: {
  to: string;
  customerName: string;
  orderId: string;
  paymentId: string;
  items: Array<{ name: string; qty: number }>;
  totalAmount: number;
  isCOD?: boolean;
}) {
  const { to, customerName, orderId, paymentId, items, totalAmount, isCOD } = opts;

  const itemsHtml = items
    .map(i => `<tr><td style="padding:6px 8px;border:1px solid #e5e7eb">${i.name}</td>
                   <td style="padding:6px 8px;border:1px solid #e5e7eb;text-align:right">${i.qty}</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;max-width:640px;margin:auto">
      <h2>Thanks for your ${isCOD ? "order (Cash on Delivery)" : "payment"}, ${customerName}!</h2>
      <p>Your order is confirmed. Here are the details:</p>
      <table style="border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 8px"><b>Order ID</b></td><td style="padding:6px 8px">${orderId}</td></tr>
        <tr><td style="padding:6px 8px"><b>${isCOD ? "Payment Method" : "Payment ID"}</b></td><td style="padding:6px 8px">${isCOD ? "Cash on Delivery" : paymentId}</td></tr>
        <tr><td style="padding:6px 8px"><b>Total</b></td><td style="padding:6px 8px">₹${totalAmount}</td></tr>
      </table>
      <h3 style="margin-top:16px">Items</h3>
      <table style="border-collapse:collapse;border:1px solid #e5e7eb">
        <thead>
          <tr>
            <th style="padding:6px 8px;border:1px solid #e5e7eb;text-align:left">Item</th>
            <th style="padding:6px 8px;border:1px solid #e5e7eb;text-align:right">Qty</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p style="margin-top:16px;color:#6b7280">If you have questions, just reply to this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject: `Order Confirmation • ${orderId}`,
    html,
  });
}
