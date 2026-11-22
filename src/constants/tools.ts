export interface ToolItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: "dev" | "finance";
  available: boolean;
  featured: boolean;
  badge?: string;
}

export const tools: ToolItem[] = [
  {
    title: "DevDocuSign (PDF Signer)",
    description:
      "Draw or type signatures, drag to position across multi-page PDFs, and export locally with zero file uploads.",
    icon: "✍️",
    href: "/tools/pdf-signer",
    category: "dev",
    available: true,
    featured: true,
    badge: "Flagship",
  },
  {
    title: "JSON Formatter",
    description:
      "Beautify, minify, and validate raw JSON payloads in real time with instant syntax error detection and line numbers.",
    icon: "📝",
    href: "/tools/json-formatter",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "JWT Decoder",
    description:
      "Inspect JSON Web Token headers, payload claims, and expiration timestamps locally without sending tokens to a server.",
    icon: "🔑",
    href: "/tools/jwt-decoder",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "UUID Generator",
    description:
      "Generate cryptographically random v4 UUIDs in single or bulk batches with one-click copy for database seeds and APIs.",
    icon: "🆔",
    href: "/tools/uuid-generator",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "Base64 Encoder",
    description:
      "Encode plain UTF-8 text into Base64 strings or decode Base64 payloads back into readable text instantly in browser memory.",
    icon: "🔐",
    href: "/tools/base64-encoder",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "Color Picker",
    description:
      "Pick colors visually and convert seamlessly between HEX, RGB, HSL, and CSS custom variables for UI design systems.",
    icon: "🎨",
    href: "/tools/color-picker",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "Regex Tester",
    description:
      "Test JavaScript regular expressions with global/multiline flags, live match highlighting, and capture group inspection.",
    icon: "⚡",
    href: "/tools/regex-tester",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "Password Generator",
    description:
      "Create high-entropy, cryptographically secure passwords using Web Crypto CSPRNG with custom length and character rules.",
    icon: "🛡️",
    href: "/tools/password-generator",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "Unix Timestamp Converter",
    description:
      "Convert Unix epoch timestamps (seconds or milliseconds) to human-readable UTC, ISO-8601, and local dates in real time.",
    icon: "⏱️",
    href: "/tools/timestamp-converter",
    category: "dev",
    available: true,
    featured: true,
  },
  {
    title: "CTC to In-Hand Calculator",
    description:
      "Estimate monthly take-home salary from annual CTC with New Tax Regime slabs, EPF deductions, and professional tax.",
    icon: "💰",
    href: "/tools/ctc-calculator",
    category: "finance",
    available: true,
    featured: false,
  },
  {
    title: "Freelance Rate Calculator",
    description:
      "Calculate your ideal hourly and daily freelance developer rate based on target annual income, paid time off, and taxes.",
    icon: "💼",
    href: "/tools/freelance-rate-calculator",
    category: "finance",
    available: true,
    featured: false,
  },
  {
    title: "Salary Hike Calculator",
    description:
      "Compute exact percentage increments, monthly take-home gains, and compare competing job offers side-by-side.",
    icon: "📈",
    href: "/tools/salary-hike-calculator",
    category: "finance",
    available: true,
    featured: false,
  },
];