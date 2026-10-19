"use client";

import { useMemo, useState } from "react";
import { amortise, comparisonRate, fmt, incomeTax, interestOnly, months, pct, principalFor, repayment, type Frequency } from "@/lib/calc/finance";
import { Bars, NumberField, Panel, Result, SelectField, Table } from "./primitives";

const freqOpts = [
  { value: "weekly" as Frequency, label: "Weekly" },
  { value: "fortnightly" as Frequency, label: "Fortnightly" },
  { value: "monthly" as Frequency, label: "Monthly" },
];
const perLabel: Record<Frequency, string> = { weekly: "week", fortnightly: "fortnight", monthly: "month" };

/* ─────────────── Loan repayment ─────────────── */
export function LoanRepayment() {
  const [amount, setAmount] = useState(600000);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);
  const [freq, setFreq] = useState<Frequency>("monthly");
  const [type, setType] = useState<"pi" | "io">("pi");

  const r = useMemo(() => {
    const pay = type === "io" ? interestOnly(amount, rate, freq) : repayment(amount, rate, years, freq);
    const sim = type === "pi" ? amortise({ principal: amount, ratePa: rate, years, freq }) : null;
    const totalInt = sim ? sim.interest : pay * years * { weekly: 52, fortnightly: 26, monthly: 12 }[freq];
    return { pay, totalInt, sim };
  }, [amount, rate, years, freq, type]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} max={25} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
          <SelectField label="Repayment frequency" value={freq} onChange={setFreq} options={freqOpts} />
          <SelectField label="Repayment type" value={type} onChange={setType} options={[{ value: "pi", label: "Principal & interest" }, { value: "io", label: "Interest only" }]} />
        </>
      }
      results={
        <>
          <Result big label={`Repayment per ${perLabel[freq]}`} value={fmt(r.pay)} />
          <Result label="Total interest" value={fmt(r.totalInt)} />
          <Result label="Total repaid" value={fmt(amount + r.totalInt)} />
        </>
      }
      note="Assumes the rate stays the same for the whole term and repayments are made on time. Interest-only figures assume the full term is interest only."
    >
      {r.sim && (
        <Table head={["Year", "Interest", "Principal", "Balance"]} rows={r.sim.yearly.filter((_, i) => i % 5 === 4 || i === r.sim!.yearly.length - 1).map((y) => [`Year ${y.period}`, fmt(y.interest), fmt(y.principal), fmt(y.balance)])} />
      )}
    </Panel>
  );
}

/* ─────────────── Borrowing power ─────────────── */
export function BorrowingPower() {
  const [inc1, setInc1] = useState(95000);
  const [inc2, setInc2] = useState(0);
  const [other, setOther] = useState(0);
  const [dep, setDep] = useState(0);
  const [exp, setExp] = useState(2800);
  const [debt, setDebt] = useState(0);
  const [card, setCard] = useState(0);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);

  const r = useMemo(() => {
    const netM = (incomeTax(inc1).net + incomeTax(inc2).net + other * 0.8) / 12;
    const floor = (inc2 > 0 ? 4300 : 2600) + 500 * dep;
    const expUsed = Math.max(exp, floor);
    const surplus = netM - expUsed - debt - card * 0.038;
    const power = Math.max(0, Math.floor(principalFor(surplus, rate + 3, years) / 1000) * 1000);
    const repay = repayment(power, rate, years);
    return { netM, floor, expUsed, surplus, power, repay, buffered: rate + 3 };
  }, [inc1, inc2, other, dep, exp, debt, card, rate, years]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Your gross annual income" prefix="$" value={inc1} onChange={setInc1} step={1000} />
          <NumberField label="Partner's gross annual income" prefix="$" value={inc2} onChange={setInc2} step={1000} hint="Leave 0 if applying alone" />
          <NumberField label="Other income (rent, bonus) p.a." prefix="$" value={other} onChange={setOther} step={1000} hint="Counted at 80%" />
          <NumberField label="Dependants" value={dep} onChange={setDep} max={10} />
          <NumberField label="Monthly living expenses" prefix="$" value={exp} onChange={setExp} step={100} />
          <NumberField label="Other loan repayments (monthly)" prefix="$" value={debt} onChange={setDebt} step={50} />
          <NumberField label="Total credit card limits" prefix="$" value={card} onChange={setCard} step={500} hint="Assessed at 3.8% of limit per month" />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
        </>
      }
      results={
        <>
          <Result big label="You could borrow up to" value={fmt(r.power)} />
          <Result label="Monthly repayment at your rate" value={r.power ? fmt(r.repay) : "–"} />
          <Result label="Assessment rate (rate + 3% buffer)" value={pct(r.buffered)} />
          <Result label="Net monthly income" value={fmt(r.netM)} />
          <Result label="Monthly surplus for repayments" value={fmt(Math.max(0, r.surplus))} />
        </>
      }
      note={
        (r.floor > exp && (inc1 || inc2) ? `A minimum household living-expense benchmark of ${fmt(r.floor)}/month has been applied. ` : "") +
        "Indicative only. Uses FY2026-27 resident tax rates, a 3% serviceability buffer and credit cards at 3.8% of limit per month – the standard lender approach. Every lender's policy differs; we can check your real borrowing capacity across 40+ lenders."
      }
    />
  );
}

/* ─────────────── Extra repayments ─────────────── */
export function ExtraRepayment() {
  const [amount, setAmount] = useState(600000);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);
  const [freq, setFreq] = useState<Frequency>("monthly");
  const [extra, setExtra] = useState(200);
  const [lump, setLump] = useState(0);

  const r = useMemo(() => {
    const base = amortise({ principal: amount, ratePa: rate, years, freq });
    const withExtra = amortise({ principal: amount, ratePa: rate, years, freq, extra, lumpSum: lump });
    const per = { weekly: 52, fortnightly: 26, monthly: 12 }[freq];
    return { base, withExtra, savedInt: Math.max(0, base.interest - withExtra.interest), savedMonths: ((base.periods - withExtra.periods) / per) * 12, newMonths: (withExtra.periods / per) * 12 };
  }, [amount, rate, years, freq, extra, lump]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Remaining term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
          <SelectField label="Repayment frequency" value={freq} onChange={setFreq} options={freqOpts} />
          <NumberField label={`Extra repayment per ${perLabel[freq]}`} prefix="$" value={extra} onChange={setExtra} step={50} />
          <NumberField label="One-off lump sum now" prefix="$" value={lump} onChange={setLump} step={1000} />
        </>
      }
      results={
        <>
          <Result big label="Interest saved" value={fmt(r.savedInt)} />
          <Result label="Time saved" value={months(r.savedMonths)} />
          <Result label="New loan term" value={months(r.newMonths)} />
          <Result label={`Minimum repayment per ${perLabel[freq]}`} value={fmt(r.base.payment)} />
          <Result label={`New repayment per ${perLabel[freq]}`} value={fmt(r.base.payment + extra)} />
          <Bars a={r.base.interest} b={r.withExtra.interest} labelA={`Interest without extras: ${fmt(r.base.interest)}`} labelB={`Interest with extras: ${fmt(r.withExtra.interest)}`} />
        </>
      }
      note="Assumes a constant rate and that extra repayments start immediately and continue until the loan is repaid. Fixed-rate loans may cap extra repayments."
    />
  );
}

/* ─────────────── Offset ─────────────── */
export function Offset() {
  const [amount, setAmount] = useState(600000);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(30);
  const [offset, setOffset] = useState(30000);
  const [monthly, setMonthly] = useState(500);

  const r = useMemo(() => {
    const base = amortise({ principal: amount, ratePa: rate, years });
    // growing offset: approximate by simulating with average balance over time via stepwise sim
    const per = 12;
    const n = years * per;
    const rr = rate / 100 / per;
    const pay = base.payment;
    let bal = amount,
      off = offset,
      interest = 0,
      p = 0;
    while (bal > 0.005 && p < n * 2) {
      const i = Math.max(0, bal - off) * rr;
      interest += i;
      bal -= pay - i;
      off += monthly;
      p++;
    }
    return { base, interest, periods: p, saved: Math.max(0, base.interest - interest), savedMonths: base.periods - p };
  }, [amount, rate, years, offset, monthly]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
          <NumberField label="Current offset balance" prefix="$" value={offset} onChange={setOffset} step={1000} />
          <NumberField label="Monthly deposit into offset" prefix="$" value={monthly} onChange={setMonthly} step={50} hint="Net savings you add each month" />
        </>
      }
      results={
        <>
          <Result big label="Interest saved with offset" value={fmt(r.saved)} />
          <Result label="Time saved" value={months(r.savedMonths)} />
          <Result label="Loan repaid in" value={months(r.periods)} />
          <Result label="Monthly repayment" value={fmt(r.base.payment)} />
          <Result label="Interest without offset" value={fmt(r.base.interest)} />
        </>
      }
      note="Assumes a 100% offset account, a constant rate, and that your repayment stays at the original minimum so the savings shorten the loan. Offset accounts usually carry a package or account fee – factor that in."
    />
  );
}

/* ─────────────── How long to repay ─────────────── */
export function HowLongToRepay() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(5.89);
  const [pay, setPay] = useState(3500);
  const [freq, setFreq] = useState<Frequency>("monthly");

  const r = useMemo(() => {
    const per = { weekly: 52, fortnightly: 26, monthly: 12 }[freq];
    const sim = amortise({ principal: amount, ratePa: rate, years: 60, freq, payment: pay });
    const minIO = interestOnly(amount, rate, freq);
    return { sim, minIO, monthsTaken: (sim.periods / per) * 12 };
  }, [amount, rate, pay, freq]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <SelectField label="Repayment frequency" value={freq} onChange={setFreq} options={freqOpts} />
          <NumberField label={`Repayment per ${perLabel[freq]}`} prefix="$" value={pay} onChange={setPay} step={50} />
        </>
      }
      results={
        r.sim.repaid ? (
          <>
            <Result big label="Loan repaid in" value={months(r.monthsTaken)} />
            <Result label="Total interest" value={fmt(r.sim.interest)} />
            <Result label="Total repaid" value={fmt(amount + r.sim.interest)} />
          </>
        ) : (
          <>
            <Result big label="Loan never repaid" value="–" />
            <Result label={`Interest alone per ${perLabel[freq]}`} value={fmt(r.minIO)} hint="Your repayment must exceed this amount for the balance to reduce." />
          </>
        )
      }
      note="Assumes a constant interest rate and regular on-time repayments."
    />
  );
}

/* ─────────────── Interest only ─────────────── */
export function InterestOnly() {
  const [amount, setAmount] = useState(600000);
  const [rate, setRate] = useState(6.19);
  const [piRate, setPiRate] = useState(5.89);
  const [years, setYears] = useState(30);
  const [ioYears, setIoYears] = useState(5);

  const r = useMemo(() => {
    const io = interestOnly(amount, rate);
    const after = repayment(amount, piRate, years - ioYears);
    const piFromStart = repayment(amount, piRate, years);
    const totalIO = io * 12 * ioYears + amortise({ principal: amount, ratePa: piRate, years: years - ioYears }).interest;
    const totalPI = amortise({ principal: amount, ratePa: piRate, years }).interest;
    return { io, after, piFromStart, totalIO, totalPI };
  }, [amount, rate, piRate, years, ioYears]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Interest-only rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="P&I rate after IO period" suffix="% p.a." value={piRate} onChange={setPiRate} step={0.01} />
          <NumberField label="Total loan term" suffix="years" value={years} onChange={setYears} min={2} max={40} />
          <NumberField label="Interest-only period" suffix="years" value={ioYears} onChange={setIoYears} min={1} max={Math.max(1, years - 1)} />
        </>
      }
      results={
        <>
          <Result big label="Interest-only monthly repayment" value={fmt(r.io)} />
          <Result label={`P&I repayment after ${ioYears} years`} value={fmt(r.after)} hint="Higher, because the balance is repaid over a shorter remaining term." />
          <Result label="P&I repayment from day one" value={fmt(r.piFromStart)} />
          <Result label="Total interest (IO then P&I)" value={fmt(r.totalIO)} />
          <Result label="Total interest (P&I from start)" value={fmt(r.totalPI)} />
          <Bars a={r.totalPI} b={r.totalIO} labelA="P&I from day one" labelB="Interest only first" />
        </>
      }
      note="Interest-only rates are usually higher than principal & interest. Lenders typically limit interest-only periods to 5 years for owner-occupiers."
    />
  );
}

/* ─────────────── Split loan ─────────────── */
export function SplitLoan() {
  const [amount, setAmount] = useState(600000);
  const [fixedPct, setFixedPct] = useState(50);
  const [fixedRate, setFixedRate] = useState(5.69);
  const [varRate, setVarRate] = useState(5.99);
  const [years, setYears] = useState(30);

  const r = useMemo(() => {
    const f = (amount * fixedPct) / 100;
    const v = amount - f;
    const fp = repayment(f, fixedRate, years);
    const vp = repayment(v, varRate, years);
    const blended = ((f * fixedRate + v * varRate) / amount) || 0;
    return { f, v, fp, vp, blended, allFixed: repayment(amount, fixedRate, years), allVar: repayment(amount, varRate, years) };
  }, [amount, fixedPct, fixedRate, varRate, years]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Total loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Fixed portion" suffix="%" value={fixedPct} onChange={setFixedPct} max={100} />
          <NumberField label="Fixed rate" suffix="% p.a." value={fixedRate} onChange={setFixedRate} step={0.01} />
          <NumberField label="Variable rate" suffix="% p.a." value={varRate} onChange={setVarRate} step={0.01} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
        </>
      }
      results={
        <>
          <Result big label="Combined monthly repayment" value={fmt(r.fp + r.vp)} />
          <Result label={`Fixed portion (${fmt(r.f)})`} value={fmt(r.fp)} />
          <Result label={`Variable portion (${fmt(r.v)})`} value={fmt(r.vp)} />
          <Result label="Blended rate" value={pct(r.blended)} />
          <Result label="If 100% fixed" value={fmt(r.allFixed)} />
          <Result label="If 100% variable" value={fmt(r.allVar)} />
        </>
      }
      note="Repayments on the fixed portion stay the same for the fixed term; the variable portion moves with the market. Offset and unlimited extra repayments usually apply to the variable portion only."
    />
  );
}

/* ─────────────── Loan comparison ─────────────── */
type Loan = { rate: number; intro: number; introYears: number; upfront: number; monthlyFee: number };
function LoanInputs({ l, set, label }: { l: Loan; set: (l: Loan) => void; label: string }) {
  return (
    <div className="space-y-3 rounded-xl bg-lilac/60 p-4 sm:col-span-1">
      <p className="font-heading font-bold">{label}</p>
      <NumberField label="Interest rate" suffix="% p.a." value={l.rate} onChange={(v) => set({ ...l, rate: v })} step={0.01} />
      <NumberField label="Intro / fixed rate" suffix="% p.a." value={l.intro} onChange={(v) => set({ ...l, intro: v })} step={0.01} />
      <NumberField label="Intro period" suffix="years" value={l.introYears} onChange={(v) => set({ ...l, introYears: v })} max={10} />
      <NumberField label="Upfront fees" prefix="$" value={l.upfront} onChange={(v) => set({ ...l, upfront: v })} step={50} />
      <NumberField label="Monthly fee" prefix="$" value={l.monthlyFee} onChange={(v) => set({ ...l, monthlyFee: v })} />
    </div>
  );
}

export function LoanComparison() {
  const [amount, setAmount] = useState(600000);
  const [years, setYears] = useState(30);
  const [a, setA] = useState<Loan>({ rate: 5.89, intro: 5.89, introYears: 0, upfront: 600, monthlyFee: 0 });
  const [b, setB] = useState<Loan>({ rate: 6.09, intro: 5.49, introYears: 2, upfront: 0, monthlyFee: 10 });

  const cost = (l: Loan) => {
    const n = years * 12;
    const introN = Math.round(l.introYears * 12);
    let bal = amount,
      interest = 0,
      firstPay = 0,
      laterPay = 0;
    for (let m = 1; m <= n; m++) {
      const rate = m <= introN ? l.intro : l.rate;
      const pay = repayment(bal, rate, (n - m + 1) / 12);
      if (m === 1) firstPay = pay;
      if (m === introN + 1) laterPay = pay;
      const i = (bal * rate) / 100 / 12;
      interest += i;
      bal = bal + i - pay;
    }
    const fees = l.upfront + l.monthlyFee * n;
    return { interest, fees, total: interest + fees, firstPay, laterPay: introN ? laterPay : firstPay };
  };
  const ra = cost(a),
    rb = cost(b);
  const cheaper = ra.total <= rb.total ? "Loan A" : "Loan B";

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={1000} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={40} />
          <LoanInputs l={a} set={setA} label="Loan A" />
          <LoanInputs l={b} set={setB} label="Loan B" />
        </>
      }
      results={
        <>
          <Result big label="Cheaper over the full term" value={cheaper} hint={`Saves ${fmt(Math.abs(ra.total - rb.total))} in interest and fees`} />
          <Result label="Loan A – total interest + fees" value={fmt(ra.total)} />
          <Result label="Loan B – total interest + fees" value={fmt(rb.total)} />
          <Result label="Loan A – monthly repayment" value={a.introYears ? `${fmt(ra.firstPay)} → ${fmt(ra.laterPay)}` : fmt(ra.firstPay)} />
          <Result label="Loan B – monthly repayment" value={b.introYears ? `${fmt(rb.firstPay)} → ${fmt(rb.laterPay)}` : fmt(rb.firstPay)} />
          <Bars a={ra.total} b={rb.total} labelA="Loan A" labelB="Loan B" />
        </>
      }
      note="Assumes rates stay the same after any intro period and that you keep each loan for the full term. In practice most borrowers refinance well before then – ask us to model a 5-year horizon."
    />
  );
}

/* ─────────────── Comparison rate ─────────────── */
export function ComparisonRate() {
  const [rate, setRate] = useState(5.89);
  const [upfront, setUpfront] = useState(600);
  const [monthly, setMonthly] = useState(10);
  const [intro, setIntro] = useState(5.89);
  const [introYears, setIntroYears] = useState(0);

  const cr = useMemo(() => comparisonRate({ ratePa: rate, upfront, ongoingMonthly: monthly, introRate: intro, introYears }), [rate, upfront, monthly, intro, introYears]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Advertised interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Upfront fees (application, valuation, settlement)" prefix="$" value={upfront} onChange={setUpfront} step={50} />
          <NumberField label="Ongoing monthly fee" prefix="$" value={monthly} onChange={setMonthly} />
          <NumberField label="Intro / honeymoon rate" suffix="% p.a." value={intro} onChange={setIntro} step={0.01} />
          <NumberField label="Intro period" suffix="years" value={introYears} onChange={setIntroYears} max={10} />
        </>
      }
      results={
        <>
          <Result big label="Comparison rate" value={pct(cr)} />
          <Result label="Advertised rate" value={pct(rate)} />
          <Result label="Difference" value={pct(cr - rate)} />
        </>
      }
      note="Calculated on the regulated basis of a $150,000 loan over 25 years with principal & interest repayments. The comparison rate for your actual loan amount may differ – lender fees have a smaller impact on larger loans."
    />
  );
}
