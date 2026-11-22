import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DevToolkit Hub",
  description: "Get in touch with the DevToolkit Hub team for support, feedback, or bug reports.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-base leading-relaxed">
        Have a feature request, bug report, or question about any utility on{" "}
        <strong>DevToolkit Hub</strong>? We welcome feedback from developers and students worldwide.
      </p>

      <div className="p-6 rounded-lg border space-y-3">
        <h2 className="text-xl font-semibold">Direct Email Support</h2>
        <p>
          Email us anytime at:{" "}
          <a
            href="mailto:shruthilakshmanan21@gmail.com"
            className="text-blue-600 underline font-medium"
          >
            shruthilakshmanan21@gmail.com
          </a>
        </p>
        <p className="text-sm text-gray-500">
          We typically respond within 24–48 business hours.
        </p>
      </div>
    </main>
  );
}