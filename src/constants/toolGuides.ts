import type { FaqItem } from "@/components/tools/ToolGuide";

export interface ToolGuideContent {
  title: string;
  overview: string;
  steps: string[];
  useCases: string[];
  faqs: FaqItem[];
}

export const TOOL_GUIDES: Record<string, ToolGuideContent> = {
  "json-formatter": {
    title: "About the Online JSON Formatter & Validator",
    overview:
      "JSON (JavaScript Object Notation) is the standard data-interchange format for modern REST APIs, webhooks, and configuration files. Minified single-line JSON payloads from network logs are nearly impossible to inspect manually. This browser-based JSON Formatter beautifies raw JSON with clean indentation, validates strict RFC 8259 syntax rules, and minifies payloads for production.",
    steps: [
      "Paste raw or minified JSON into the input editor.",
      "Click Format to pretty-print with clean 2-space indentation, or Minify to strip whitespace.",
      "Review any highlighted syntax error messages (such as trailing commas or unquoted keys).",
      "Copy the formatted output directly to your clipboard with one click.",
    ],
    useCases: [
      "Debugging nested REST API and GraphQL responses during frontend development.",
      "Validating webhook payloads and package.json or tsconfig.json configurations.",
      "Compressing large JSON fixtures before embedding them in environment variables.",
    ],
    faqs: [
      {
        question: "Is my JSON data sent to any server?",
        answer:
          "No. Parsing and formatting run 100% locally inside your browser using native JSON.parse() and JSON.stringify(), keeping sensitive API tokens and customer payloads completely private.",
      },
      {
        question: "Why does valid JavaScript object syntax fail JSON validation?",
        answer:
          "Strict JSON requires double quotes around all property keys and string values, forbids trailing commas after the last item, and does not allow comments or single-quoted strings.",
      },
    ],
  },
  "jwt-decoder": {
    title: "About the Client-Side JWT Decoder",
    overview:
      "JSON Web Tokens (JWT) are compact, URL-safe tokens used for stateless authentication in OAuth 2.0 and OpenID Connect workflows. Each token consists of three Base64URL-encoded segments separated by dots: Header, Payload, and Signature. This tool decodes your token's header and payload claims locally so you can verify user roles, scopes, and expiration timestamps.",
    steps: [
      "Paste your three-part JWT string (eyJ...) into the token input field.",
      "Inspect the decoded Header to verify the signing algorithm (such as HS256 or RS256).",
      "Check the decoded Payload claims including sub, iat, and exp expiration timestamps.",
    ],
    useCases: [
      "Troubleshooting expired access tokens and 401 Unauthorized API errors.",
      "Verifying custom RBAC roles and tenant claims issued by Auth0, Clerk, Cognito, or Firebase.",
      "Inspecting OAuth ID tokens during single-sign-on integration.",
    ],
    faqs: [
      {
        question: "Is it safe to paste production JWTs here?",
        answer:
          "Yes. Decoding happens entirely in client-side JavaScript memory—your bearer tokens never leave your browser.",
      },
      {
        question: "Does decoding a JWT verify its cryptographic signature?",
        answer:
          "No. Anyone with a JWT can Base64URL-decode its header and payload. Cryptographic signature verification must always be performed on your backend server using your secret or public key.",
      },
    ],
  },
  "uuid-generator": {
    title: "About the Cryptographic UUID v4 Generator",
    overview:
      "Universally Unique Identifiers (UUIDs) are 128-bit labels used across distributed databases, microservices, and frontend state management to uniquely identify records without central coordination. Version 4 UUIDs generate 122 random bits using cryptographically secure randomness, making collisions practically impossible.",
    steps: [
      "Select how many UUIDs you need to generate in bulk.",
      "Toggle uppercase formatting or hyphen removal depending on your database schema.",
      "Click Generate and copy individual IDs or the entire batch at once.",
    ],
    useCases: [
      "Seeding primary keys in PostgreSQL, MongoDB, and DynamoDB test datasets.",
      "Generating correlation IDs for distributed API request tracing.",
      "Creating unique client-side keys for optimistic UI updates.",
    ],
    faqs: [
      {
        question: "How are these UUIDs generated?",
        answer:
          "They are generated natively via the Web Crypto API (crypto.randomUUID()), which uses a cryptographically strong pseudo-random number generator (CSPRNG).",
      },
      {
        question: "What is the probability of a UUID v4 collision?",
        answer:
          "With 122 bits of entropy (5.3 x 10^36 possible values), you would need to generate over 2.7 quintillion UUIDs to have a 50% chance of a single duplicate.",
      },
    ],
  },
  "base64-encoder": {
    title: "About the UTF-8 Safe Base64 Encoder & Decoder",
    overview:
      "Base64 encoding converts binary or UTF-8 text data into an ASCII string format using 64 printable characters. It prevents data corruption when transmitting payloads across text-based protocols such as HTTP Basic Auth headers, JSON bodies, email attachments, and HTML data URIs.",
    steps: [
      "Switch between Encode and Decode mode.",
      "Type or paste your plain text or Base64 string into the editor.",
      "Copy the converted output immediately.",
    ],
    useCases: [
      "Encoding username:password credentials for HTTP Basic Authorization headers.",
      "Decoding Base64-encoded environment secrets in Kubernetes and CI/CD pipelines.",
      "Embedding small SVG icons or metadata strings inside CSS and HTML data URLs.",
    ],
    faqs: [
      {
        question: "Does this tool support emojis and non-ASCII Unicode characters?",
        answer:
          "Yes. Unlike standard browser btoa() which throws errors on multi-byte characters, this encoder converts strings via UTF-8 byte arrays first.",
      },
      {
        question: "Is Base64 a form of encryption?",
        answer:
          "No. Base64 is a reversible encoding scheme, not encryption—never use it alone to protect confidential passwords without proper encryption.",
      },
    ],
  },
  "color-picker": {
    title: "About the HEX, RGB & HSL Color Picker",
    overview:
      "Modern CSS workflows require converting brand colors seamlessly between hexadecimal codes, RGB channels, and HSL (Hue, Saturation, Lightness) values. HSL is especially useful in Tailwind CSS and design systems because adjusting lightness creates consistent hover and border shades.",
    steps: [
      "Pick a shade visually using the interactive color swatch or paste an existing HEX code.",
      "Inspect the synchronized HEX, RGB, and HSL values side by side.",
      "Copy the exact CSS color string you need for your stylesheet.",
    ],
    useCases: [
      "Building accessible light and dark mode palettes for Tailwind CSS and CSS variables.",
      "Converting design tokens from Figma specs into CSS rgba() or hsl() declarations.",
      "Checking visual contrast and brightness variations for UI buttons.",
    ],
    faqs: [
      {
        question: "When should I use HSL instead of HEX in CSS?",
        answer:
          "HSL makes it intuitive to create lighter or darker hover states by keeping Hue and Saturation fixed while adjusting only the Lightness percentage.",
      },
    ],
  },
  "regex-tester": {
    title: "About the Live JavaScript Regex Tester",
    overview:
      "Regular Expressions (RegEx) let developers validate user input, extract structured tokens from logs, and perform complex string replacements. Testing patterns against real sample text before shipping prevents subtle edge-case bugs and catastrophic backtracking.",
    steps: [
      "Enter your regular expression pattern (without surrounding slashes) and toggle flags like g, i, or m.",
      "Paste multi-line sample text into the test string box.",
      "Review real-time highlighted matches and capture groups.",
    ],
    useCases: [
      "Validating email formats, semantic version numbers, and URL slugs.",
      "Extracting IP addresses, timestamps, or error codes from server logs.",
      "Writing search-and-replace patterns for code refactoring.",
    ],
    faqs: [
      {
        question: "Which regex engine does this tester use?",
        answer:
          "It runs directly on your browser's native ECMAScript RegExp engine, guaranteeing 100% behavioral parity with JavaScript and TypeScript applications.",
      },
    ],
  },
  "password-generator": {
    title: "About the Cryptographic Password Generator",
    overview:
      "Weak or reused passwords remain the primary cause of credential-stuffing breaches. Strong passwords combine high character length (16+ characters) with unpredictable randomness across uppercase letters, lowercase letters, digits, and special symbols.",
    steps: [
      "Adjust the slider to your desired password length (16 to 32+ characters recommended).",
      "Select the character sets required by your target service.",
      "Click Regenerate to create a fresh password and copy it to your password manager.",
    ],
    useCases: [
      "Creating high-entropy database passwords, API secrets, and JWT signing keys.",
      "Generating unique credentials for developer cloud accounts and staging environments.",
    ],
    faqs: [
      {
        question: "Why is crypto.getRandomValues() better than Math.random()?",
        answer:
          "Math.random() is predictable and not designed for security, whereas crypto.getRandomValues() pulls entropy directly from your operating system's cryptographic random source.",
      },
    ],
  },
};