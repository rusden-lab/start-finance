/** Pure finance maths shared by the calculators. All rates are % p.a. unless noted. */

export type Frequency = "weekly" | "fortnightly" | "monthly";
export const PERIODS: Record<Frequency, number> = { weekly: 52, fortnightly: 26, monthly: 12 };

export const fmt = (n: number, dp = 0) =>
  (isFinite(n) ? n : 0).toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: dp, maximumFractionDigits: dp });

export const pct = (n: number, dp = 2) => `${(isFinite(n) ? n : 0).toFixed(dp)}%`;

export const months = (m: number) => {
  const y = Math.floor(m / 12);
  const r = Math.round(m % 12);
  if (!y) return `${r} month${r === 1 ? "" : "s"}`;
  return `${y} yr${y === 1 ? "" : "s"}${r ? ` ${r} mo` : ""}`;
};

/** Periodic repayment for an amortising loan. */
export function repayment(principal: number, ratePa: number, years: number, freq: Frequency = "monthly") {
  const n = years * PERIODS[freq];
  const r = ratePa / 100 / PERIODS[freq];
  if (n <= 0 || principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Interest-only periodic payment. */
export const interestOnly = (principal: number, ratePa: number, freq: Frequency = "monthly") =>
  (principal * ratePa) / 100 / PERIODS[freq];

/** Principal that a given repayment can service. */
export function principalFor(payment: number, ratePa: number, years: number, freq: Frequency = "monthly") {
  const n = years * PERIODS[freq];
  const r = ratePa / 100 / PERIODS[freq];
  if (payment <= 0 || n <= 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

export type AmortRow = { period: number; interest: number; principal: number; balance: number };

/**
 * Simulate a loan with optional extra repayments, lump sum and offset balance.
 * Returns periods to repay, total interest and a yearly schedule.
 */
export function amortise(opts: {
  principal: number;
  ratePa: number;
  years: number;
  freq?: Frequency;
  extra?: number; // extra per period
  lumpSum?: number; // one-off at start
  offset?: number; // constant offset balance
  payment?: number; // override calculated payment
}) {
  const freq = opts.freq ?? "monthly";
  const per = PERIODS[freq];
  const n = Math.round(opts.years * per);
  const r = opts.ratePa / 100 / per;
  const base = opts.payment ?? repayment(opts.principal, opts.ratePa, opts.years, freq);
  const pay = base + (opts.extra ?? 0);
  let bal = opts.principal - (opts.lumpSum ?? 0);
  let interest = 0;
  let periods = 0;
  const yearly: AmortRow[] = [];
  let yInt = 0,
    yPrin = 0;
  const offset = opts.offset ?? 0;
  while (bal > 0.005 && periods < n * 2 + 1) {
    const i = Math.max(0, bal - offset) * r;
    const p = Math.min(bal, pay - i);
    if (p <= 0 && i > 0) break; // never repays
    interest += i;
    bal -= p;
    periods++;
    yInt += i;
    yPrin += p;
    if (periods % per === 0 || bal <= 0.005) {
      yearly.push({ period: Math.ceil(periods / per), interest: yInt, principal: yPrin, balance: Math.max(0, bal) });
      yInt = 0;
      yPrin = 0;
    }
  }
  return { payment: base, periods, interest, yearly, repaid: bal <= 0.005 };
}

/* ───────────── Income tax (FY2026-27 resident rates, excl. HELP) ───────────── */
export function incomeTax(g: number) {
  if (g <= 0) return { tax: 0, lito: 0, medicare: 0, net: 0, total: 0 };
  let tax =
    g <= 18200 ? 0 : g <= 45000 ? (g - 18200) * 0.16 : g <= 135000 ? 4288 + (g - 45000) * 0.3 : g <= 190000 ? 31288 + (g - 135000) * 0.37 : 51638 + (g - 190000) * 0.45;
  const lito = g <= 37500 ? 700 : g <= 45000 ? 700 - (g - 37500) * 0.05 : g <= 66667 ? 325 - (g - 45000) * 0.015 : 0;
  tax = Math.max(0, tax - lito);
  // Medicare levy – 2% above the low-income threshold, with the 10% phase-in band
  const medicare = g <= 27222 ? 0 : g <= 34027 ? (g - 27222) * 0.1 : g * 0.02;
  const total = tax + medicare;
  return { tax, lito, medicare, net: g - total, total };
}

/* ───────────── Comparison rate (AS/NZS-style: $150k over 25 years) ───────────── */
/** Solve the annual rate at which the PV of all repayments and fees equals the amount borrowed. */
export function comparisonRate(opts: { ratePa: number; upfront: number; ongoingMonthly: number; introRate?: number; introYears?: number; amount?: number; years?: number }) {
  const amount = opts.amount ?? 150000;
  const years = opts.years ?? 25;
  const n = years * 12;
  const introN = Math.round((opts.introYears ?? 0) * 12);
  // cash flows per month
  const flows: number[] = [];
  let bal = amount;
  const introPay = introN ? repayment(amount, opts.introRate ?? opts.ratePa, years) : 0;
  for (let m = 1; m <= n; m++) {
    const rate = m <= introN ? (opts.introRate ?? opts.ratePa) : opts.ratePa;
    const r = rate / 100 / 12;
    let pay: number;
    if (m <= introN) pay = introPay;
    else pay = repayment(bal, rate, (n - m + 1) / 12);
    const i = bal * r;
    bal = bal + i - pay;
    flows.push(pay + opts.ongoingMonthly);
  }
  const net = amount - opts.upfront;
  // bisection on monthly rate
  let lo = 0,
    hi = 1;
  const pv = (rm: number) => flows.reduce((s, f, k) => s + f / Math.pow(1 + rm, k + 1), 0);
  for (let k = 0; k < 100; k++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > net) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 12 * 100;
}

/* ───────────── Stamp duty (FY2026-27 scales) ───────────── */
export type StateCode = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
export type Buyer = "fhb" | "oo" | "inv";
export type PropType = "established" | "new" | "land";

function marginal(v: number, br: [number, number, number][]) {
  let b = br[0];
  for (const x of br) {
    if (v > x[0]) b = x;
    else break;
  }
  return b[1] + ((v - b[0]) * b[2]) / 100;
}

const SD = {
  NSW: (v: number) => Math.max(20, v > 3870000 ? 194137 + (v - 3870000) * 0.07 : marginal(v, [[0, 0, 1.25], [18000, 225, 1.5], [38000, 525, 1.75], [103000, 1662, 3.5], [387000, 11602, 4.5], [1290000, 52237, 5.5]])),
  VIC: (v: number) => (v <= 25000 ? v * 0.014 : v <= 130000 ? 350 + (v - 25000) * 0.024 : v <= 960000 ? 2870 + (v - 130000) * 0.06 : v <= 2000000 ? v * 0.055 : 110000 + (v - 2000000) * 0.065),
  VIC_PPR: (v: number) => (v > 130000 && v <= 440000 ? 2870 + (v - 130000) * 0.05 : v > 440000 && v <= 550000 ? 18370 + (v - 440000) * 0.06 : SD.VIC(v)),
  QLD: (v: number) => (v <= 5000 ? 0 : v <= 75000 ? (v - 5000) * 0.015 : v <= 540000 ? 1050 + (v - 75000) * 0.035 : v <= 1000000 ? 17325 + (v - 540000) * 0.045 : 38025 + (v - 1000000) * 0.0575),
  QLD_HOME: (v: number) => (v <= 350000 ? v * 0.01 : v <= 540000 ? 3500 + (v - 350000) * 0.035 : v <= 1000000 ? 10150 + (v - 540000) * 0.045 : 30850 + (v - 1000000) * 0.0575),
  WA: (v: number) => (v <= 120000 ? v * 0.019 : v <= 150000 ? 2280 + (v - 120000) * 0.0285 : v <= 360000 ? 3135 + (v - 150000) * 0.038 : v <= 725000 ? 11115 + (v - 360000) * 0.0475 : 28453 + (v - 725000) * 0.0515),
  SA: (v: number) => marginal(v, [[0, 0, 1], [12000, 120, 2], [30000, 480, 3], [50000, 1080, 3.5], [100000, 2830, 4], [200000, 6830, 4.25], [250000, 8955, 4.75], [300000, 11330, 5], [500000, 21330, 5.5]]),
  TAS: (v: number) => (v <= 3000 ? 50 : marginal(v, [[3000, 50, 1.75], [25000, 435, 2.25], [75000, 1560, 3.5], [200000, 5935, 4], [375000, 12935, 4.25], [725000, 27810, 4.5]])),
  ACT_OO: (v: number) => (v <= 260000 ? v * 0.0028 : v <= 300000 ? 728 + (v - 260000) * 0.022 : v <= 500000 ? 1608 + (v - 300000) * 0.034 : v <= 750000 ? 8408 + (v - 500000) * 0.0432 : v <= 1000000 ? 19208 + (v - 750000) * 0.059 : v <= 1455000 ? 33958 + (v - 1000000) * 0.064 : v * 0.0454),
  ACT_INV: (v: number) => (v <= 200000 ? v * 0.012 : v <= 300000 ? 2400 + (v - 200000) * 0.022 : v <= 500000 ? 4600 + (v - 300000) * 0.034 : v <= 750000 ? 11400 + (v - 500000) * 0.0432 : v <= 1000000 ? 22200 + (v - 750000) * 0.059 : v <= 1455000 ? 36950 + (v - 1000000) * 0.064 : v * 0.0454),
  NT: (v: number) => {
    if (v < 525000) {
      const V = v / 1000;
      return 0.06571441 * V * V + 15 * V;
    }
    return v < 3000000 ? v * 0.0495 : v <= 5000000 ? v * 0.0575 : v * 0.0595;
  },
};

export function stampDuty(state: StateCode, v: number, buyer: Buyer, typ: PropType) {
  let full = 0,
    duty = 0,
    note = "";
  switch (state) {
    case "NSW":
      full = SD.NSW(v);
      duty = full;
      if (buyer === "fhb") {
        duty = v <= 800000 ? 0 : v <= 1000000 ? (full * (v - 800000)) / 200000 : full;
        if (v <= 1000000) note = "First Home Buyers Assistance Scheme: full exemption to $800k, sliding concession to $1m.";
      }
      break;
    case "VIC":
      full = SD.VIC(v);
      duty = buyer === "inv" ? full : SD.VIC_PPR(v);
      if (buyer === "fhb") {
        duty = v <= 600000 ? 0 : v <= 750000 ? (SD.VIC_PPR(v) * (v - 600000)) / 150000 : SD.VIC_PPR(v);
        if (v <= 750000) note = "Victorian first home buyer duty: full exemption to $600k, sliding concession to $750k.";
      } else if (buyer === "oo" && v > 130000 && v <= 550000) note = "Includes Victoria’s principal place of residence concessional rate.";
      break;
    case "QLD":
      full = SD.QLD(v);
      duty = buyer === "inv" ? full : SD.QLD_HOME(v);
      if (buyer === "fhb") {
        if (typ === "new" || typ === "land") {
          duty = 0;
          note = "Queensland charges no transfer duty for first home buyers purchasing or building a new home (contracts from 1 May 2025).";
        } else {
          duty = v <= 700000 ? 0 : v <= 800000 ? (SD.QLD_HOME(v) * (v - 700000)) / 100000 : SD.QLD_HOME(v);
          if (v <= 800000) note = "QLD first home concession (established): full relief to $700k, phasing out to $800k.";
        }
      } else if (buyer === "oo") note = "Includes Queensland’s home (owner-occupier) concession rate.";
      break;
    case "WA":
      full = SD.WA(v);
      duty = full;
      if (buyer === "fhb") {
        duty = v <= 600000 ? 0 : v <= 800000 ? (v - 600000) * 0.1615 : full;
        if (v <= 800000) note = "WA first home owner rate: no duty to $600k, concessional rate to $800k.";
      }
      break;
    case "SA":
      full = SD.SA(v);
      duty = full;
      if (buyer === "fhb" && (typ === "new" || typ === "land")) {
        duty = 0;
        note = "SA charges no stamp duty for first home buyers building or buying a new home – no price cap.";
      } else if (buyer === "fhb") note = "SA’s first home relief applies to new homes and vacant land only – established homes pay standard duty.";
      break;
    case "TAS":
      full = SD.TAS(v);
      duty = full;
      if (buyer === "fhb") note = "Tasmania’s first home established-home duty exemption ended for contracts after 30 June 2026 – standard rates shown.";
      break;
    case "ACT":
      full = SD.ACT_INV(v);
      duty = buyer === "inv" ? full : SD.ACT_OO(v);
      if (buyer === "fhb") note = "Most eligible ACT first home buyers pay no duty under the income-tested Home Buyer Concession Scheme – the figure shown is without HBCS.";
      else if (buyer === "oo") note = "ACT owner-occupier rates applied (you must live in the home for 12 months).";
      break;
    case "NT":
      full = SD.NT(v);
      duty = full;
      if (buyer === "fhb") note = "The NT has no general first home duty concession – HomeGrown Territory grants may apply instead.";
      break;
  }
  return { full, duty, saving: Math.max(0, full - duty), note };
}

/** Rough mortgage registration + transfer fees by state (indicative, FY2026-27). */
export const govFees: Record<StateCode, { mortgage: number; transfer: (v: number) => number }> = {
  NSW: { mortgage: 176, transfer: () => 176 },
  VIC: { mortgage: 126, transfer: (v) => Math.min(3600, 100 + Math.ceil(v / 1000) * 2.34) },
  QLD: { mortgage: 232, transfer: (v) => 232 + Math.ceil(Math.max(0, v - 180000) / 10000) * 45 },
  WA: { mortgage: 200, transfer: (v) => (v <= 85000 ? 200 : v <= 120000 ? 210 : v <= 200000 ? 230 : v <= 300000 ? 250 : v <= 400000 ? 270 : v <= 500000 ? 290 : v <= 600000 ? 310 : v <= 700000 ? 330 : 350) },
  SA: { mortgage: 190, transfer: (v) => (v <= 5000 ? 190 : v <= 20000 ? 210 : v <= 40000 ? 230 : v <= 50000 ? 260 : 260 + Math.ceil((v - 50000) / 10000) * 90) },
  TAS: { mortgage: 155, transfer: () => 240 },
  ACT: { mortgage: 170, transfer: () => 460 },
  NT: { mortgage: 175, transfer: () => 175 },
};
