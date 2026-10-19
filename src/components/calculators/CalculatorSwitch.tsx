"use client";

import { BorrowingPower, ComparisonRate, ExtraRepayment, HowLongToRepay, InterestOnly, LoanComparison, LoanRepayment, Offset, SplitLoan } from "./HomeLoanCalcs";
import { BudgetPlanner, CarLoan, IncomeTax, Leasing, PersonalLoan, RentVsBuy, StampDuty } from "./OtherCalcs";

const map: Record<string, React.ComponentType> = {
  "borrowing-power": BorrowingPower,
  "loan-repayment": LoanRepayment,
  "extra-repayment": ExtraRepayment,
  "home-loan-offset": Offset,
  "how-long-to-repay": HowLongToRepay,
  "interest-only": InterestOnly,
  "split-loan": SplitLoan,
  "loan-comparison": LoanComparison,
  "comparison-rate": ComparisonRate,
  "stamp-duty": StampDuty,
  "rent-vs-buy": RentVsBuy,
  "car-loan": CarLoan,
  "personal-loan": PersonalLoan,
  leasing: Leasing,
  "budget-planner": BudgetPlanner,
  "income-tax": IncomeTax,
};

export default function CalculatorSwitch({ slug }: { slug: string }) {
  const C = map[slug];
  if (!C) return <p className="text-ink-soft">This calculator is coming soon.</p>;
  return <C />;
}
