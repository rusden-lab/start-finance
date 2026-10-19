import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";


const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot – bots fill hidden fields
  if (body.company) return NextResponse.json({ ok: true });

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Start Finance Website <website@startfinance.com.au>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set – message not sent", { firstName, lastName, email });
    return NextResponse.json({ error: "Email isn't configured yet. Please call us on " + site.phone + "." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website enquiry${subject ? ` – ${subject}` : ""}: ${firstName} ${lastName}`,
    html: `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone) || "–"}</p>
      <p><strong>Topic:</strong> ${esc(subject) || "–"}</p>
      <p><strong>Message:</strong></p>
      <p>${esc(message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  if (error) {
    console.error("[contact] resend error", error);
    return NextResponse.json({ error: "We couldn't send your message. Please try again or call us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
