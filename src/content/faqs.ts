export type Faq = { q: string; a: string[]; category: "Borrowing" | "Buying" | "Refinancing" | "Business" };

/**
 * Trimmed from 38 long-form articles to the questions people actually search for.
 * Questions are phrased the way people type them into Google; answers lead with the
 * direct answer, then one useful next step.
 */
export const faqs: Faq[] = [
  {
    category: "Borrowing",
    q: "How much can I borrow for a home loan?",
    a: [
      "Most lenders will let you borrow an amount whose repayments – assessed at your interest rate plus a 3% buffer – fit comfortably inside your income after living expenses and existing debts. For many households that lands between 4 and 6 times gross annual income, but it varies a lot with dependants, credit card limits and how your income is paid.",
      "Use our Borrowing Power Calculator for an instant estimate, then talk to us – different lenders assess the same income very differently, and we know which ones will look most favourably at your situation.",
    ],
  },
  {
    category: "Borrowing",
    q: "What is LVR and why does it matter?",
    a: [
      "LVR is your loan-to-value ratio: the loan amount divided by the property's value. Borrow $480,000 on a $600,000 home and your LVR is 80%.",
      "Lenders use LVR to price risk. At 80% or below you'll usually get the sharpest rates and avoid Lenders Mortgage Insurance. Above 80% you can still borrow – some lenders go to 95% or more – but LMI applies and rates are typically a little higher.",
    ],
  },
  {
    category: "Borrowing",
    q: "What is Lenders Mortgage Insurance (LMI) and can I avoid it?",
    a: [
      "LMI is a one-off insurance premium that protects the lender (not you) when your deposit is under 20%. It's usually added to the loan rather than paid in cash, so it doesn't eat into your deposit – but it does increase the amount you repay.",
      "You can avoid it with a 20% deposit, a family guarantee, the Federal Home Guarantee Scheme, or through professional LMI waivers that some lenders offer to doctors, lawyers, accountants and other occupations. Ask us which applies to you.",
    ],
  },
  {
    category: "Borrowing",
    q: "How can I increase my borrowing capacity?",
    a: [
      "The fastest win is reducing or cancelling credit card limits. Lenders assess around 3.8% of your total limit as a monthly expense – whether you use the card or not – so a $20,000 limit costs you roughly $760 a month of assessable surplus.",
      "Beyond that: clear small personal loans and buy-now-pay-later accounts, tidy up discretionary spending for three months before applying, and consider a longer loan term. We'll also run your numbers across lenders, because some count bonuses, overtime and rental income far more generously than others.",
    ],
  },
  {
    category: "Borrowing",
    q: "Can I get a home loan if I'm self-employed?",
    a: [
      "Yes. If you have two years of tax returns and financials, most lenders will treat you like any other borrower. If your returns aren't ready or don't reflect current earnings, low-doc (alt-doc) loans let you verify income with BAS statements, bank statements or an accountant's declaration instead.",
      "Expect a slightly higher rate and a maximum LVR of around 80% on low-doc loans. Keep your tax lodged and paid on time, reduce debt, and show a consistent savings history – those three things make the biggest difference.",
    ],
  },
  {
    category: "Buying",
    q: "Should I get pre-approval before I find a property?",
    a: [
      "Yes – always. Pre-approval tells you exactly what you can spend, lets you bid at auction with confidence, and shows agents you're a serious buyer. Without it you risk falling in love with a property you can't finance, or forfeiting a deposit if finance falls through.",
      "Pre-approval generally lasts 90 days and is free. We can usually have one in place within a few business days.",
    ],
  },
  {
    category: "Buying",
    q: "How much is stamp duty in Victoria?",
    a: [
      "Victorian stamp duty (transfer duty) is tiered by price: roughly 5.5% on an established $750,000 home, rising to 6.5% on the portion above $2 million. Owner-occupiers get a concessional rate between $130,000 and $550,000, and first home buyers pay nothing up to $600,000 with a sliding concession to $750,000.",
      "Every state is different – our Stamp Duty Calculator covers all eight states and territories with current rates and first home buyer concessions, so you can budget for it on top of your deposit.",
    ],
  },
  {
    category: "Buying",
    q: "What are the hidden costs of buying a home?",
    a: [
      "On top of the deposit and stamp duty, budget for: loan application and valuation fees, mortgage registration and transfer fees, conveyancing (typically $1,000–$2,500), building and pest inspections, LMI if your deposit is under 20%, and home and contents insurance from settlement day.",
      "A sensible rule of thumb is to allow 5–6% of the purchase price for stamp duty and costs in Victoria, more for investors. We'll give you an itemised funds-to-complete estimate before you make an offer.",
    ],
  },
  {
    category: "Refinancing",
    q: "Fixed or variable rate – which should I choose?",
    a: [
      "A fixed rate locks your repayments for 1–5 years – great for budgeting certainty, but usually with limits on extra repayments, no offset account and break costs if you exit early. A variable rate moves with the market but gives you flexibility: offset, redraw and unlimited extra repayments.",
      "Many borrowers split the loan – part fixed, part variable – to get both. The right mix depends on your cash flow, how long you'll hold the property and your view on rates. We model all three side by side so you can see the real cost of each.",
    ],
  },
  {
    category: "Refinancing",
    q: "What happens when my fixed rate ends?",
    a: [
      "Your loan automatically rolls onto the lender's standard variable rate – which is often well above what new customers are offered. This is the single most common way borrowers overpay.",
      "Two to three months before expiry, contact us. We'll ask your current lender to reprice you, and compare that against refinancing elsewhere, including any cashback offers and switching costs. If you don't act, the default is almost never the best deal.",
    ],
  },
  {
    category: "Refinancing",
    q: "When is it worth refinancing my home loan?",
    a: [
      "Refinancing is usually worth it when you can save more than the switching costs within the first year – typically a rate gap of 0.25% or more on a $500,000 loan – or when you need something your current loan can't do: access equity for a renovation or investment, consolidate debt, or add an offset account.",
      "It isn't suitable for everyone. If your LVR is above 80% you may have to pay LMI again, and fixed loans may carry break costs. A free home loan health check will tell you quickly whether it stacks up.",
    ],
  },
  {
    category: "Refinancing",
    q: "How much does a mortgage broker cost?",
    a: [
      "For most home and investment loans, nothing. We're paid a commission by the lender you settle with, and that commission doesn't change your interest rate. Our Credit Guide sets out the commission ranges and any fees in full.",
      "If a fee ever applies to a particular service, we'll disclose it in writing before we do any work – no surprises.",
    ],
  },
  {
    category: "Business",
    q: "How do I get a business loan?",
    a: [
      "Options range from secured business loans (against property, vehicles or equipment) and unsecured loans assessed on cash flow, to invoice financing, equipment finance and lines of credit. Lenders look for a clear credit history, an existing credit relationship, up-to-date financials and a plan for how the funds will be used.",
      "Brokers do more than mortgages. Tell us what you're trying to achieve – expansion, equipment, working capital – and we'll match you with the right product and lender.",
    ],
  },
  {
    category: "Borrowing",
    q: "Do I need a mortgage broker or a financial planner?",
    a: [
      "For loans – buying, refinancing, investing with borrowed money – you need a licensed finance broker. For investment strategy, superannuation, insurance and retirement planning, you need a financial planner.",
      "The two often work together: we arrange the finance, a planner advises on whether the investment suits your long-term goals. We're happy to refer you to a planner if you need one.",
    ],
  },
];
