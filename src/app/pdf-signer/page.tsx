import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import PdfSignerTool from "@/features/tools/pdf-signer/PdfSignerTool";

export const metadata: Metadata = {
  title: "Free Online PDF Signer — Sign PDFs Locally Without Uploading",
  description:
    "Sign PDF contracts, offer letters, and forms 100% locally in your browser with zero file uploads, no watermarks, and instant date stamps.",
};

export default function PdfSignerPage() {
  return (
    <div className="py-14">
      <Container>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="text-xs text-slate-400">
              <Link href="/tools" className="hover:text-violet-400">
                Tools
              </Link>{" "}
              / <span className="text-slate-200">PDF Signer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Client-Side PDF Signer &amp; Electronic Signature Tool
            </h1>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Draw or type a crisp signature, position and resize it across any
              page of your PDF, add an optional date stamp, and export a clean,
              watermark-free PDF—without ever uploading confidential documents to
              a server.
            </p>
          </div>

          <PdfSignerTool />

          {/* AdSense-Ready Editorial Guide & FAQs */}
          <article className="pt-10 border-t border-slate-800 space-y-8 text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white">
                How to Sign a PDF Online Without Uploading Your Document
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-300">
                <li>
                  <strong>Select your PDF:</strong> Drag and drop any PDF file
                  into the workspace above or browse from your device.
                </li>
                <li>
                  <strong>Draw or type your signature:</strong> Click{" "}
                  <em>Create Signature</em> to sign smoothly with your trackpad,
                  mouse, touchscreen, or type your name in signature script.
                </li>
                <li>
                  <strong>Position, resize &amp; date stamp:</strong> Drag your
                  signature onto the signature line, adjust its scale with the
                  zoom controls, and toggle the automatic date stamp.
                </li>
                <li>
                  <strong>Download your signed PDF:</strong> Click{" "}
                  <em>Download Signed PDF</em> to embed the signature directly
                  into the PDF document in browser memory.
                </li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">
                Electronic Signatures vs. Cryptographic Digital Certificates
              </h2>
              <p className="text-sm text-slate-400">
                This utility embeds a visual electronic signature image and
                optional date stamp directly into your PDF—ideal for HR offer
                letters, rental agreements, NDAs, invoices, and university forms.
                If a government portal or regulated filing requires a
                hardware-backed PKI / Aadhaar eSign / DSC cryptographic
                certificate, use your issuing authority&apos;s certificate tool.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-white">
                    Are my PDF files uploaded to a server?
                  </h3>
                  <p className="mt-1 text-slate-400">
                    No. PDF rendering (via PDF.js) and signature embedding (via
                    pdf-lib) execute 100% inside your browser&apos;s local memory.
                    Your files never leave your computer or phone.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-white">
                    Does it add watermarks or limit the number of pages?
                  </h3>
                  <p className="mt-1 text-slate-400">
                    Never. DevToolkit Hub&apos;s PDF Signer is completely free,
                    supports multi-page documents, and exports clean PDFs with
                    zero watermarks.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </div>
  );
}