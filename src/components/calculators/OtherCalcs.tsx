"use client";

import { useMemo, useState } from "react";
import { fmt, govFees, incomeTax, pct, repayment, stampDuty, type Buyer, type Frequency, type PropType, type StateCode } from "@/lib/calc/finance";
import { Bars, NumberField, Panel, Result, SelectField, Table } from "./primitives";

const freqOpts = [
  { value: "weekly" as Frequency, label: "Weekly" },
  { value: "fortnightly" as Frequency, label: "Fortnightly" },
  { value: "monthly" as Frequency, label: "Monthly" },
];
const PER: Record<Frequency, number> = { weekly: 52, fortnightly: 26, monthly: 12 };
const perLabel: Record<Frequency, string> = { weekly: "week", fortnightly: "fortnight", monthly: "month" };

/* ─────────────── Stamp duty ─────────────── */
export function StampDuty() {
  const [state, setState] = useState<StateCode>("VIC");
  const [price, setPrice] = useState(750000);
  const [buyer, setBuyer] = useState<Buyer>("fhb");
  const [typ, setTyp] = useState<PropType>("established");
  const [loan, setLoan] = useState(600000);

  const r = useMemo(() => {
    const sd = stampDuty(state, price, buyer, typ);
    const fees = govFees[state];
    const transfer = fees.transfer(price);
    const mortgage = loan > 0 ? fees.mortgage : 0;
    return { ...sd, transfer, mortgage, total: sd.duty + transfer + mortgage };
  }, [state, price, buyer, typ, loan]);

  return (
    <Panel
      inputs={
        <>
          <SelectField label="State / territory" value={state} onChange={setState} options={(["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as StateCode[]).map((s) => ({ value: s, label: s }))} />
          <NumberField label="Property price" prefix="$" value={price} onChange={setPrice} step={5000} />
          <SelectField label="Buyer type" value={buyer} onChange={setBuyer} options={[{ value: "fhb", label: "First home buyer (living in)" }, { value: "oo", label: "Owner-occupier" }, { value: "inv", label: "Investor" }]} />
          <SelectField label="Property type" value={typ} onChange={setTyp} options={[{ value: "established", label: "Established home" }, { value: "new", label: "New home / off the plan" }, { value: "land", label: "Vacant land" }]} />
          <NumberField label="Loan amount (for mortgage registration)" prefix="$" value={loan} onChange={setLoan} step={5000} />
        </>
      }
      results={
        <>
          <Result big label="Estimated stamp duty" value={fmt(r.duty)} />
          <Result label="Standard duty (no concessions)" value={fmt(r.full)} />
          <Result label="Concession saving" value={fmt(r.saving)} />
          <Result label="Transfer / registration fee" value={fmt(r.transfer)} />
          <Result label="Mortgage registration fee" value={fmt(r.mortgage)} />
          <Result label="Total government charges" value={fmt(r.total)} />
        </>
      }
      note={`${r.note ? r.note + " " : ""}FY2026-27 rates. Transfer duty and registration fees only – excludes foreign purchaser surcharges, eligibility criteria, grants and conveyancing. Confirm with your conveyancer before exchange.`}
    />
  );
}

/* ─────────────── Rent vs buy ─────────────── */
export function RentVsBuy() {
  const [price, setPrice] = useState(750000);
  const [deposit, setDeposit] = useState(150000);
  const [rate, setRate] = useState(5.89);
  const [years, setYears] = useState(10);
  const [growth, setGrowth] = useState(4);
  const [costs, setCosts] = useState(1.2);
  const [rent, setRent] = useState(650);
  const [rentGrowth, setRentGrowth] = useState(3.5);
  const [invest, setInvest] = useState(5);
  const [upfront, setUpfront] = useState(42000);

  const r = useMemo(() => {
    const loan = Math.max(0, price - deposit);
    const pay = repayment(loan, rate, 30);
    let bal = loan,
      value = price,
      buyOut = upfront + deposit,
      rentOut = 0,
      rentW = rent,
      investBal = deposit + upfront;
    const rows: (string | number)[][] = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        const i = (bal * rate) / 100 / 12;
        bal = Math.max(0, bal + i - pay);
      }
      const owning = pay * 12 + (value * costs) / 100;
      buyOut += owning;
      value *= 1 + growth / 100;
      const renting = rentW * 52;
      rentOut += renting;
      // renter invests the deposit + any monthly difference
      investBal = investBal * (1 + invest / 100) + Math.max(0, owning - renting);
      rentW *= 1 + rentGrowth / 100;
      if (y % Math.max(1, Math.floor(years / 5)) === 0 || y === years)
        rows.push([`Year ${y}`, fmt(value - bal), fmt(investBal)]);
    }
    const equity = value - bal;
    return { pay, equity, investBal, buyOut, rentOut, rows, better: equity >= investBal ? "Buying" : "Renting" };
  }, [price, deposit, rate, years, growth, costs, rent, rentGrowth, invest, upfront]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Property price" prefix="$" value={price} onChange={setPrice} step={5000} />
          <NumberField label="Deposit" prefix="$" value={deposit} onChange={setDeposit} step={5000} />
          <NumberField label="Upfront buying costs (duty, legals)" prefix="$" value={upfront} onChange={setUpfront} step={1000} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Annual property growth" suffix="%" value={growth} onChange={setGrowth} step={0.5} />
          <NumberField label="Ownership costs (rates, insurance, maintenance)" suffix="% of value" value={costs} onChange={setCosts} step={0.1} />
          <NumberField label="Weekly rent for a similar home" prefix="$" value={rent} onChange={setRent} step={10} />
          <NumberField label="Annual rent increase" suffix="%" value={rentGrowth} onChange={setRentGrowth} step={0.5} />
          <NumberField label="Return if you invested instead" suffix="% p.a." value={invest} onChange={setInvest} step={0.5} />
          <NumberField label="Years to compare" suffix="years" value={years} onChange={setYears} min={1} max={30} />
        </>
      }
      results={
        <>
          <Result big label={`Better off after ${years} years`} value={r.better} />
          <Result label="Equity in your home if you buy" value={fmt(r.equity)} />
          <Result label="Investments if you rent" value={fmt(r.investBal)} />
          <Result label="Total paid out – buying" value={fmt(r.buyOut)} />
          <Result label="Total paid out – renting" value={fmt(r.rentOut)} />
          <Result label="Monthly mortgage repayment" value={fmt(r.pay)} />
          <Bars a={r.equity} b={r.investBal} labelA="Buy: home equity" labelB="Rent: investments" />
        </>
      }
      note="Assumes the renter invests their deposit, upfront costs and any amount by which owning costs more than renting, earning the return shown. Ignores tax on investment earnings and capital gains tax exemption on a home. Highly sensitive to growth assumptions."
    >
      <Table head={["Year", "Buy – home equity", "Rent – investment balance"]} rows={r.rows} />
    </Panel>
  );
}

/* ─────────────── Car loan ─────────────── */
export function CarLoan() {
  const [price, setPrice] = useState(45000);
  const [deposit, setDeposit] = useState(5000);
  const [rate, setRate] = useState(8.49);
  const [years, setYears] = useState(5);
  const [balloon, setBalloon] = useState(0);
  const [fees, setFees] = useState(400);
  const [freq, setFreq] = useState<Frequency>("monthly");

  const r = useMemo(() => {
    const loan = Math.max(0, price - deposit + fees);
    const n = years * PER[freq];
    const rr = rate / 100 / PER[freq];
    const bal = (loan * balloon) / 100;
    const pv = loan - bal / Math.pow(1 + rr, n);
    const pay = rr ? (pv * rr) / (1 - Math.pow(1 + rr, -n)) : pv / n;
    const total = pay * n + bal;
    return { loan, pay, bal, total, interest: total - loan };
  }, [price, deposit, rate, years, balloon, fees, freq]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Vehicle price" prefix="$" value={price} onChange={setPrice} step={500} />
          <NumberField label="Deposit / trade-in" prefix="$" value={deposit} onChange={setDeposit} step={500} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={7} />
          <NumberField label="Balloon / residual" suffix="% of loan" value={balloon} onChange={setBalloon} max={60} hint="Lump sum due at the end" />
          <NumberField label="Establishment fees" prefix="$" value={fees} onChange={setFees} step={50} />
          <SelectField label="Repayment frequency" value={freq} onChange={setFreq} options={freqOpts} />
        </>
      }
      results={
        <>
          <Result big label={`Repayment per ${perLabel[freq]}`} value={fmt(r.pay)} />
          <Result label="Amount financed" value={fmt(r.loan)} />
          <Result label="Balloon payment at end" value={fmt(r.bal)} />
          <Result label="Total interest" value={fmt(r.interest)} />
          <Result label="Total cost of credit" value={fmt(r.total)} />
        </>
      }
      note="Car loan rates vary widely with the age of the vehicle, your credit profile and whether the loan is secured. Monthly account fees are not included."
    />
  );
}

/* ─────────────── Personal loan ─────────────── */
export function PersonalLoan() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(11.9);
  const [years, setYears] = useState(5);
  const [fee, setFee] = useState(250);
  const [monthlyFee, setMonthlyFee] = useState(10);
  const [freq, setFreq] = useState<Frequency>("monthly");

  const r = useMemo(() => {
    const pay = repayment(amount + fee, rate, years, freq);
    const n = years * PER[freq];
    const feeTotal = monthlyFee * years * 12;
    const total = pay * n + feeTotal;
    return { pay, total, interest: pay * n - amount - fee, feeTotal, perMonth: (pay * PER[freq]) / 12 + monthlyFee };
  }, [amount, rate, years, fee, monthlyFee, freq]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Loan amount" prefix="$" value={amount} onChange={setAmount} step={500} />
          <NumberField label="Interest rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Loan term" suffix="years" value={years} onChange={setYears} min={1} max={7} />
          <NumberField label="Establishment fee" prefix="$" value={fee} onChange={setFee} step={50} />
          <NumberField label="Monthly fee" prefix="$" value={monthlyFee} onChange={setMonthlyFee} />
          <SelectField label="Repayment frequency" value={freq} onChange={setFreq} options={freqOpts} />
        </>
      }
      results={
        <>
          <Result big label={`Repayment per ${perLabel[freq]}`} value={fmt(r.pay)} />
          <Result label="Total interest" value={fmt(r.interest)} />
          <Result label="Total fees" value={fmt(r.feeTotal + fee)} />
          <Result label="Total cost of loan" value={fmt(r.total)} />
          <Result label="Approx. monthly outlay incl. fees" value={fmt(r.perMonth)} />
        </>
      }
      note="Personal loan rates are risk-based – your actual rate depends on your credit score and whether the loan is secured. Establishment fee is financed into the loan."
    />
  );
}

/* ─────────────── Leasing ─────────────── */
export function Leasing() {
  const [price, setPrice] = useState(60000);
  const [residual, setResidual] = useState(30);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(4);
  const [fees, setFees] = useState(500);
  const [freq, setFreq] = useState<Frequency>("monthly");

  const r = useMemo(() => {
    const n = years * PER[freq];
    const rr = rate / 100 / PER[freq];
    const res = (price * residual) / 100;
    const financed = price + fees;
    const pv = financed - res / Math.pow(1 + rr, n);
    const pay = rr ? (pv * rr) / (1 - Math.pow(1 + rr, -n)) : pv / n;
    const total = pay * n;
    return { pay, res, total, interest: total + res - financed };
  }, [price, residual, rate, years, fees, freq]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Asset value" prefix="$" value={price} onChange={setPrice} step={500} />
          <NumberField label="Residual value" suffix="% of value" value={residual} onChange={setResidual} max={80} hint="ATO minimum residuals: 1yr 65.6%, 2yr 56.1%, 3yr 46.9%, 4yr 37.5%, 5yr 28.1%" />
          <NumberField label="Lease rate" suffix="% p.a." value={rate} onChange={setRate} step={0.01} />
          <NumberField label="Lease term" suffix="years" value={years} onChange={setYears} min={1} max={7} />
          <NumberField label="Establishment fees" prefix="$" value={fees} onChange={setFees} step={50} />
          <SelectField label="Payment frequency" value={freq} onChange={setFreq} options={freqOpts} />
        </>
      }
      results={
        <>
          <Result big label={`Lease payment per ${perLabel[freq]}`} value={fmt(r.pay)} />
          <Result label="Residual payment at end" value={fmt(r.res)} />
          <Result label="Total lease payments" value={fmt(r.total)} />
          <Result label="Total interest / lease charges" value={fmt(r.interest)} />
        </>
      }
      note="Excludes GST, running costs and any novated lease salary-packaging effects. Residual values must meet ATO minimums for novated and finance leases."
    />
  );
}

/* ─────────────── Budget planner ─────────────── */
type Line = { label: string; amount: number; freq: Frequency | "annually" };
const toMonthly = (l: Line) => (l.freq === "annually" ? l.amount / 12 : (l.amount * PER[l.freq]) / 12);

function BudgetRows({ lines, set }: { lines: Line[]; set: (l: Line[]) => void }) {
  return (
    <div className="space-y-2 sm:col-span-2">
      {lines.map((l, i) => (
        <div key={l.label} className="grid grid-cols-[1fr_110px_120px] items-center gap-2">
          <span className="text-sm">{l.label}</span>
          <input type="number" inputMode="decimal" className="field !py-1.5" value={l.amount} min={0} onChange={(e) => set(lines.map((x, k) => (k === i ? { ...x, amount: Number(e.target.value) || 0 } : x)))} />
          <select className="field !py-1.5 text-sm" value={l.freq} onChange={(e) => set(lines.map((x, k) => (k === i ? { ...x, freq: e.target.value as Line["freq"] } : x)))}>
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export function BudgetPlanner() {
  const [income, setIncome] = useState<Line[]>([
    { label: "Salary / wages (after tax)", amount: 1400, freq: "weekly" },
    { label: "Partner's income (after tax)", amount: 0, freq: "weekly" },
    { label: "Other income", amount: 0, freq: "monthly" },
  ]);
  const [expenses, setExpenses] = useState<Line[]>([
    { label: "Rent / mortgage", amount: 650, freq: "weekly" },
    { label: "Groceries", amount: 220, freq: "weekly" },
    { label: "Utilities (power, gas, water)", amount: 350, freq: "monthly" },
    { label: "Phone & internet", amount: 120, freq: "monthly" },
    { label: "Transport / fuel / public transport", amount: 80, freq: "weekly" },
    { label: "Car costs (rego, insurance, servicing)", amount: 2400, freq: "annually" },
    { label: "Insurance (health, home, life)", amount: 250, freq: "monthly" },
    { label: "Loan & credit card repayments", amount: 0, freq: "monthly" },
    { label: "Childcare / education", amount: 0, freq: "weekly" },
    { label: "Eating out & entertainment", amount: 120, freq: "weekly" },
    { label: "Subscriptions & memberships", amount: 80, freq: "monthly" },
    { label: "Clothing, personal, medical", amount: 150, freq: "monthly" },
    { label: "Holidays & gifts", amount: 3000, freq: "annually" },
  ]);

  const inM = income.reduce((s, l) => s + toMonthly(l), 0);
  const outM = expenses.reduce((s, l) => s + toMonthly(l), 0);
  const surplus = inM - outM;

  return (
    <Panel
      inputs={
        <>
          <p className="font-heading font-bold sm:col-span-2">Income</p>
          <BudgetRows lines={income} set={setIncome} />
          <p className="mt-4 font-heading font-bold sm:col-span-2">Expenses</p>
          <BudgetRows lines={expenses} set={setExpenses} />
        </>
      }
      results={
        <>
          <Result big label={surplus >= 0 ? "Monthly surplus" : "Monthly shortfall"} value={fmt(Math.abs(surplus))} />
          <Result label="Monthly income" value={fmt(inM)} />
          <Result label="Monthly expenses" value={fmt(outM)} />
          <Result label="Annual surplus" value={fmt(surplus * 12)} />
          <Result label="Savings rate" value={inM ? pct((surplus / inM) * 100, 0) : "–"} />
          <Bars a={inM} b={outM} labelA="Income" labelB="Expenses" />
        </>
      }
      note="Lenders look at your real spending across three months of statements – use this planner to see where your money goes before you apply. A consistent monthly surplus is the strongest signal of borrowing capacity."
    />
  );
}

/* ─────────────── Income tax ─────────────── */
export function IncomeTax() {
  const [gross, setGross] = useState(95000);
  const [superPct, setSuperPct] = useState(12);
  const [salarySac, setSalarySac] = useState(0);

  const r = useMemo(() => {
    const taxable = Math.max(0, gross - salarySac);
    const t = incomeTax(taxable);
    return { ...t, taxable, superAmt: (gross * superPct) / 100, effective: taxable ? (t.total / taxable) * 100 : 0 };
  }, [gross, superPct, salarySac]);

  return (
    <Panel
      inputs={
        <>
          <NumberField label="Gross annual salary (excl. super)" prefix="$" value={gross} onChange={setGross} step={1000} />
          <NumberField label="Employer super" suffix="%" value={superPct} onChange={setSuperPct} step={0.5} />
          <NumberField label="Salary sacrifice to super p.a." prefix="$" value={salarySac} onChange={setSalarySac} step={500} />
        </>
      }
      results={
        <>
          <Result big label="Take-home pay per year" value={fmt(r.net)} />
          <Result label="Per month" value={fmt(r.net / 12)} />
          <Result label="Per fortnight" value={fmt(r.net / 26)} />
          <Result label="Per week" value={fmt(r.net / 52)} />
          <Result label="Income tax" value={fmt(r.tax)} />
          <Result label="Medicare levy" value={fmt(r.medicare)} />
          <Result label="Low income tax offset" value={fmt(r.lito)} />
          <Result label="Effective tax rate" value={pct(r.effective, 1)} />
          <Result label="Employer super contribution" value={fmt(r.superAmt)} />
        </>
      }
      note="FY2026-27 Australian resident rates. Excludes HELP/HECS repayments, Medicare levy surcharge, private health rebate, and other offsets or deductions. Check with the ATO or your accountant for your exact position."
    />
  );
}

