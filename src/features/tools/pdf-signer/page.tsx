import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import PdfSignerClientWrapper from "@/features/tools/pdf-signer/PdfSignerClientWrapper";

export const metadata: Metadata = {
  title: "DevDocuSign — Free Client-Side PDF Signer",
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
              / <span className="text-slate-200">DevDocuSign (PDF Signer)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              DevDocuSign — Client-Side PDF Signer
            </h1>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Draw or type a crisp signature, position and resize it across any
              page of your PDF, add an optional date stamp, and export a clean,
              watermark-free PDF—without ever uploading documents to a server.
            </p>
          </div>

          <PdfSignerClientWrapper />
        </div>
      </Container>
    </div>
  );
}
