import Container from "@/components/common/Container";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Developer Platform—our mission to provide fast, privacy-first browser developer utilities, interview preparation, and structured career roadmaps.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-bold text-white">
            About Developer Platform
          </h1>
          <p>
            Developer Platform is an all-in-one, browser-first engineering hub
            created to help software developers write cleaner code, debug faster,
            and prepare effectively for technical interviews.
          </p>
          <h2 className="text-xl font-semibold text-white">
            100% Client-Side Privacy Architecture
          </h2>
          <p>
            All utilities on Developer Platform—including our JSON Formatter,
            JWT Decoder, Base64 Encoder, UUID Generator, Regex Tester, and
            Password Generator—run locally inside your web browser. Your API
            payloads, tokens, and secrets are never transmitted to or stored on
            any external server.
          </p>
          <h2 className="text-xl font-semibold text-white">
            Contact &amp; Feedback
          </h2>
          <p>
            Have suggestions for new developer tools or interview topics? Reach
            out anytime at{" "}
            <a
              href="mailto:contact@devplatform.dev"
              className="text-violet-400 hover:underline"
            >
              contact@devplatform.dev
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}