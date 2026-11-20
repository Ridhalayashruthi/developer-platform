import Container from "@/components/common/Container";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the Developer Platform Privacy Policy explaining our local browser-based tool processing and third-party advertising cookie disclosures.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last Updated: November 2026</p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              1. Local Client-Side Processing
            </h2>
            <p>
              All developer tools on this website process text, JSON, JWTs,
              regular expressions, and generated credentials exclusively inside
              your browser memory. We do not log, store, or transmit your input
              data to any backend server.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              2. Advertising &amp; Cookies (Google AdSense)
            </h2>
            <p>
              We may partner with Google AdSense to display non-intrusive ads
              that keep this platform free for developers worldwide. Google uses
              cookies to serve relevant ads based on a user&apos;s prior visits
              to this site or other websites. Users may opt out of personalized
              advertising via Google Ad Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              3. Contact Information
            </h2>
            <p>
              For privacy-related inquiries, contact{" "}
              <a
                href="mailto:contact@devplatform.dev"
                className="text-violet-400 hover:underline"
              >
                contact@devplatform.dev
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}