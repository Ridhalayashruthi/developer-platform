import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 px-4 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} DevToolkit Hub. All rights reserved.</p>

        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-6">
          <Link href="/about" className="hover:text-gray-900 underline-offset-4 hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-900 underline-offset-4 hover:underline">
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-gray-900 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-900 underline-offset-4 hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}