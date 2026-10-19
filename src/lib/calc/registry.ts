export type CalcMeta = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string;
  group: "Home loans" | "Buying" | "Other loans" | "Planning";
};

export const calculators: CalcMeta[] = [
  { slug: "borrowing-power", name: "Borrowing Power Calculator", short: "Borrowing Power", group: "Home loans", icon: "/assets/calculators/borrowing-power.svg", description: "Estimate how much you could borrow based on your income, expenses and debts – assessed the way lenders do, with a 3% rate buffer." },
  { slug: "loan-repayment", name: "Loan Repayment Calculator", short: "Loan Repayments", group: "Home loans", icon: "/assets/calculators/loan-repayment.svg", description: "Work out weekly, fortnightly or monthly repayments on any loan amount, rate and term – and the total interest you'll pay." },
  { slug: "extra-repayment", name: "Extra Repayment Calculator", short: "Extra Repayments", group: "Home loans", icon: "/assets/calculators/extra-repayment.svg", description: "See how much interest and time you save by paying a little extra each month, or making a one-off lump sum." },
  { slug: "home-loan-offset", name: "Home Loan Offset Calculator", short: "Offset Account", group: "Home loans", icon: "/assets/calculators/home-loan.svg", description: "Find out how much an offset account balance could save you in interest and how many years it could cut from your loan." },
  { slug: "how-long-to-repay", name: "How Long to Repay Calculator", short: "How Long to Repay", group: "Home loans", icon: "/assets/calculators/how-long-repay.svg", description: "Tell us what you can afford to repay and we'll tell you how long the loan will take to clear and what it costs." },
  { slug: "interest-only", name: "Interest Only Mortgage Calculator", short: "Interest Only", group: "Home loans", icon: "/assets/calculators/interest-only-mortgage.svg", description: "Compare interest-only repayments with principal and interest, including what happens when the interest-only period ends." },
  { slug: "split-loan", name: "Split Loan Calculator", short: "Split Loan", group: "Home loans", icon: "/assets/calculators/split-loan.svg", description: "Split your loan between fixed and variable portions and see the combined repayment." },
  { slug: "loan-comparison", name: "Loan Comparison Calculator", short: "Loan Comparison", group: "Home loans", icon: "/assets/calculators/loan-comparison.svg", description: "Compare two loans side by side – rate, fees and intro periods – to see which is cheaper over the life of the loan." },
  { slug: "comparison-rate", name: "Comparison Rate Calculator", short: "Comparison Rate", group: "Home loans", icon: "/assets/calculators/comparison-rate.svg", description: "Turn an advertised rate plus fees into a true comparison rate, calculated on the standard $150,000 over 25 years." },
  { slug: "stamp-duty", name: "Stamp Duty Calculator", short: "Stamp Duty", group: "Buying", icon: "/assets/calculators/stamp-duty.svg", description: "Estimate transfer duty and government fees in every state and territory, including first home buyer concessions." },
  { slug: "rent-vs-buy", name: "Rent vs Buy Calculator", short: "Rent vs Buy", group: "Buying", icon: "/assets/calculators/rent-vs-buy.svg", description: "Compare the long-term cost of renting against buying the same home, including growth, costs and what your deposit could earn instead." },
  { slug: "car-loan", name: "Car Loan Calculator", short: "Car Loan", group: "Other loans", icon: "/assets/calculators/car-loan.svg", description: "Calculate repayments on a new or used car loan, with optional deposit and balloon payment." },
  { slug: "personal-loan", name: "Personal Loan Calculator", short: "Personal Loan", group: "Other loans", icon: "/assets/calculators/personal-loan.svg", description: "Work out repayments and total cost on a personal loan for a renovation, holiday, wedding or debt consolidation." },
  { slug: "leasing", name: "Leasing Calculator", short: "Leasing", group: "Other loans", icon: "/assets/calculators/leasing.svg", description: "Estimate lease payments on a vehicle or equipment with a residual value at the end of the term." },
  { slug: "budget-planner", name: "Budget Planner", short: "Budget Planner", group: "Planning", icon: "/assets/calculators/budget.svg", description: "Add up your income and expenses to see what's left each month – the first step to working out what you can afford." },
  { slug: "income-tax", name: "Income Tax Calculator", short: "Income Tax", group: "Planning", icon: "/assets/calculators/income-tax.svg", description: "Estimate your take-home pay for FY2026-27, including the Medicare levy and low income tax offset." },
];

export const getCalc = (slug: string) => calculators.find((c) => c.slug === slug);
