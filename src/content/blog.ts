export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readMinutes: number;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "is-your-first-home-buying-guide-right-mate",
    title: "What Should Be Your First Step Towards Home Ownership?",
    description:
      "Navigating your first home ownership journey? Our guide simplifies property buying steps, helpful advice and smart mortgage tips.",
    date: "2024-06-07",
    author: "Start Finance",
    readMinutes: 12,
    excerpt:
      "From saving a deposit and working out what you can borrow, to settlement and life after you move in – the true essentials of buying your first property.",
  },
  {
    slug: "mull-over-home-loan-rate-factors-2",
    title: "Comparing Home Loan Rates: What Factors to Consider?",
    description:
      "Ace your home loan selection with our comprehensive guide to comparing home loan rates, fees, features and loan types.",
    date: "2024-05-10",
    author: "Start Finance",
    readMinutes: 11,
    excerpt:
      "Why the advertised rate is only half the story – and the fees, features, loan term and LVR that actually decide what your home loan costs.",
  },
  {
    slug: "mull-over-home-loan-rate-factors",
    title: "Understanding Home Loans: What Should You Know",
    description:
      "Understanding home loans can feel daunting. We break down the factors influencing your loan options, the types of home loans, and how to manage your loan.",
    date: "2024-04-04",
    author: "Start Finance",
    readMinutes: 11,
    excerpt:
      "Fixed, variable, split, principal and interest, interest-only – what each one means, what they cost, and how to manage your loan once you have it.",
  },
  {
    slug: "australia-2024-economic-outlook",
    title: "What's Australia's Economic Outlook for 2024 Like?",
    description:
      "Is the economic outlook for Australia in 2024 positive? Insights into GDP trends, inflation, interest rates and economic challenges.",
    date: "2024-02-27",
    author: "Start Finance",
    readMinutes: 9,
    excerpt:
      "GDP, inflation, interest rates and the roadblocks ahead – plus what it all means for borrowers and the role of mortgage brokers.",
  },
  {
    slug: "australian-real-estate-future-shines",
    title: "Future of Australian Real Estate",
    description:
      "Predicting the future of Australian real estate? Explore key trends and the role technology plays in reshaping property investing across the nation.",
    date: "2024-02-04",
    author: "Start Finance",
    readMinutes: 13,
    excerpt:
      "Property trends, the potential of new technology, environmental risk and where the investment opportunities are emerging across Australia.",
  },
  {
    slug: "ai-potential-to-replace-mortgage-brokers",
    title: "How Is AI Shaping the Mortgage Brokerage Industry?",
    description:
      "Is AI set to replace mortgage brokers? Explore AI's impact and the future possibilities in the mortgage industry.",
    date: "2024-01-16",
    author: "Start Finance",
    readMinutes: 6,
    excerpt:
      "Faster processing and sharper risk assessment – but can technology replace the human touch? A look at where the industry is heading.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
