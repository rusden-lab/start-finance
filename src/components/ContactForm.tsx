"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ subjectDefault = "" }: { subjectDefault?: string }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
        <p className="font-heading text-lg font-bold text-purple">Thanks – message received!</p>
        <p className="mt-2 text-sm text-ink-soft">A loan specialist will be in touch as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label className="label" htmlFor="firstName">First name *</label>
        <input id="firstName" name="firstName" required className="field" autoComplete="given-name" />
      </div>
      <div>
        <label className="label" htmlFor="lastName">Last name *</label>
        <input id="lastName" name="lastName" required className="field" autoComplete="family-name" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required className="field" autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="subject">What can we help with?</label>
        <select id="subject" name="subject" className="field" defaultValue={subjectDefault}>
          <option value="">Select one…</option>
          <option>Home loan</option>
          <option>Refinancing</option>
          <option>Investment loan</option>
          <option>Business loan</option>
          <option>Car loan</option>
          <option>Personal loan</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="message">Message *</label>
        <textarea id="message" name="message" required rows={5} className="field" />
      </div>
      {error && <p className="text-sm text-coral sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
          {state === "sending" ? "Sending…" : "Send Message"}
        </button>
        <p className="mt-3 text-xs text-muted">
          By submitting you agree to our Privacy Policy. We&apos;ll only use your details to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}
