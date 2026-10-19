"use client";

import type { ReactNode } from "react";

export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  max,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <span className="relative block">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          className={`field ${prefix ? "pl-7" : ""} ${suffix ? "pr-14" : ""}`}
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">{suffix}</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select className="field" value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Result({ label, value, big, hint }: { label: string; value: string; big?: boolean; hint?: string }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 border-b border-white/15 py-3 last:border-0 ${big ? "flex-col items-start gap-1" : ""}`}>
      <span className={`text-sm ${big ? "uppercase tracking-wider text-white/70" : "text-white/80"}`}>{label}</span>
      <span className={`font-heading font-extrabold ${big ? "text-4xl" : "text-lg"}`}>{value}</span>
      {hint && <span className="w-full text-xs text-white/60">{hint}</span>}
    </div>
  );
}

export function Panel({ inputs, results, note, children }: { inputs: ReactNode; results: ReactNode; note?: ReactNode; children?: ReactNode }) {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="card p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">{inputs}</div>
        </div>
        <div className="rounded-2xl grad-purple p-6 text-white sm:p-8">
          {results}
          {note && <p className="mt-4 text-xs leading-relaxed text-white/70">{note}</p>}
          <button type="button" onClick={() => window.print()} className="no-print btn btn-white mt-6 !py-2 !px-4 text-sm">
            Print results
          </button>
        </div>
      </div>
      {children}
    </>
  );
}

export function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-sm">
        <thead className="bg-lilac text-left text-xs uppercase tracking-wider text-ink-soft">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-2.5 ${j ? "tabular-nums" : "font-medium"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Bars({ a, b, labelA, labelB }: { a: number; b: number; labelA: string; labelB: string }) {
  const max = Math.max(a, b, 1);
  return (
    <div className="mt-5 space-y-3">
      {[
        [labelA, a, "bg-white"],
        [labelB, b, "bg-fuchsia"],
      ].map(([l, v, c]) => (
        <div key={l as string}>
          <div className="mb-1 flex justify-between text-xs text-white/80">
            <span>{l}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
            <div className={`h-full rounded-full ${c}`} style={{ width: `${Math.max(2, ((v as number) / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
