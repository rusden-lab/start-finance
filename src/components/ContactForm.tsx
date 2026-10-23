"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";
type Mode = "contact" | "callback";

const TOPICS = ["Home loan", "Refinancing", "Investment loan", "Business loan", "Car loan", "Personal loan", "Something else"];

/**
 * General enquiry form, or – with mode="callback" – a short "request a call back" form
 * (phone required, best time to call, optional note). Both post to /api/contact.
 */
export default function ContactForm({ subjectDefault = "", mode = "contact" }: { subjectDefault?: string; mode?: Mode }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const callback = mode === "callback";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (callback) {
      data.subject = `Call back request${data.subject ? ` – ${data.subject}` : ""}`;
      data.message = [`Please call back${data.bestTime ? ` – best time: ${data.bestTime}` : ""}.`, data.message].filter(Boolean).join("\n\n");
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setState("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl bg-lilac p-6 text-center">
        <p className="font-heading text-lg font-bold text-purple">{callback ? "Thanks – we'll call you back" : "Thanks – message received!"}</p>
        <p className="mt-2 text-sm text-ink-soft">
          {callback ? "A broker will call you within one business day, at the time you asked for where we can." : "A loan specialist will be in touch as soon as possible."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label className="label" htmlFor={`${mode}-firstName`}>First name *</label>
        <input id={`${mode}-firstName`} name="firstName" required className="field" autoComplete="given-name" />
      </div>
      <div>
        <label className="label" htmlFor={`${mode}-lastName`}>Last name *</label>
        <input id={`${mode}-lastName`} name="lastName" required className="field" autoComplete="family-name" />
      </div>
      <div>
        <label className="label" htmlFor={`${mode}-phone`}>Phone{callback ? " *" : ""}</label>
        <input id={`${mode}-phone`} name="phone" type="tel" required={callback} className="field" autoComplete="tel" inputMode="tel" />
      </div>
      <div>
        <label className="label" htmlFor={`${mode}-email`}>Email *</label>
        <input id={`${mode}-email`} name="email" type="email" required className="field" autoComplete="email" />
      </div>
      <div className={callback ? "" : "sm:col-span-2"}>
        <label className="label" htmlFor={`${mode}-subject`}>What can we help with?</label>
        <select id={`${mode}-subject`} name="subject" className="field" defaultValue={subjectDefault}>
          <option value="">Select one…</option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      {callback && (
        <div>
          <label className="label" htmlFor="callback-bestTime">Best time to call</label>
          <select id="callback-bestTime" name="bestTime" className="field" defaultValue="">
            <option value="">Any time, Mon–Fri 9–5</option>
            <option>Morning (9am–12pm)</option>
            <option>Lunchtime (12–2pm)</option>
            <option>Afternoon (2–5pm)</option>
          </select>
        </div>
      )}
      <div className="sm:col-span-2">
        <label className="label" htmlFor={`${mode}-message`}>{callback ? "Anything we should know first? (optional)" : "Message *"}</label>
        <textarea id={`${mode}-message`} name="message" required={!callback} rows={callback ? 3 : 5} className="field" placeholder={callback ? "e.g. buying our first home, pre-approval expires in March" : undefined} />
      </div>
      {error && <p className="text-sm text-coral sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
          {state === "sending" ? "Sending…" : callback ? "Request a call back" : "Send Message"}
        </button>
        <p className="mt-3 text-xs text-muted">
          By submitting you agree to our Privacy Policy. We&apos;ll only use your details to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}
