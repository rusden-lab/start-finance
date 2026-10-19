import { repayment, amortise, stampDuty, incomeTax, comparisonRate, principalFor } from "../src/lib/calc/finance";
const r = (n: number) => Math.round(n);
let fails = 0;
const check = (label: string, got: number, want: number, tol = 1) => {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? "✓" : "✗"} ${label}: got ${got} want ${want}`);
};

// $600k @ 5.89% over 30y P&I ≈ $3,555/month (standard amortisation)
check("repayment 600k/5.89/30", r(repayment(600000, 5.89, 30)), 3555, 2);
const a = amortise({ principal: 600000, ratePa: 5.89, years: 30 });
check("amortise periods", a.periods, 360, 0);
check("amortise interest == pay*n - P", r(a.interest), r(a.payment * 360 - 600000), 2);
check("principalFor inverse", r(principalFor(repayment(600000, 5.89, 30), 5.89, 30)), 600000, 2);
// Extra $200/mo should shorten the loan
const b = amortise({ principal: 600000, ratePa: 5.89, years: 30, extra: 200 });
console.log(`  extra $200/mo: ${b.periods} periods, saves ${r(a.interest - b.interest)} interest`);
// Stamp duty
check("VIC investor 750k", r(stampDuty("VIC", 750000, "inv", "established").duty), 40070);
check("VIC FHB 600k = 0", r(stampDuty("VIC", 600000, "fhb", "established").duty), 0);
check("VIC OO 500k PPR rate", r(stampDuty("VIC", 500000, "oo", "established").duty), 21970);
check("NSW FHB 900k half", r(stampDuty("NSW", 900000, "fhb", "established").duty), 17344, 2);
check("QLD OO 700k home conc", r(stampDuty("QLD", 700000, "oo", "established").duty), 17350);
check("QLD FHB new = 0", r(stampDuty("QLD", 700000, "fhb", "new").duty), 0);
check("WA FHB 700k", r(stampDuty("WA", 700000, "fhb", "established").duty), 16150);
// Income tax FY26-27: 95k -> tax 19,288; medicare 1,900
const t = incomeTax(95000);
check("tax 95k", r(t.tax), 19288);
check("medicare 95k", r(t.medicare), 1900);
check("net 95k", r(t.net), 73812);
const t2 = incomeTax(40000); // 16% band + LITO 575
check("tax 40k", r(t2.tax), r((40000 - 18200) * 0.16 - (700 - (40000 - 37500) * 0.05)));
// Comparison rate
check("comparison rate no fees == rate", +comparisonRate({ ratePa: 5.89, upfront: 0, ongoingMonthly: 0 }).toFixed(2), 5.89, 0.01);
const cr = comparisonRate({ ratePa: 5.89, upfront: 600, ongoingMonthly: 10 });
console.log(`  comparison rate w/ $600 + $10/mo: ${cr.toFixed(2)}% (expect ≈ 6.0–6.1)`);
check("comparison rate w/ fees plausible", cr > 5.95 && cr < 6.2 ? 1 : 0, 1, 0);

console.log(fails ? `\n${fails} FAILED` : "\nALL OK");
process.exit(fails ? 1 : 0);
