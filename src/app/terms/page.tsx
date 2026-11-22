import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | DevToolkit Hub',
  description:
    'Terms of Service and usage disclaimer for DevToolkit Hub developer utilities.',
};

export default function TermsPage() {
  return (
    <main className='max-w-3xl mx-auto px-4 py-12 space-y-6'>
      <h1 className='text-3xl font-bold'>Terms of Service</h1>
      <p className='text-sm text-gray-500'>Last Updated: November 22, 2026</p>

      <p>
        Welcome to <strong>DevToolkit Hub</strong> (
        <code>https://devtoolkit-hub.vercel.app/</code>). By accessing and using
        this website and its developer utilities, you agree to comply with and
        be bound by the following terms and conditions.
      </p>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>1. Use of Developer Tools</h2>
        <p>
          All utilities on DevToolkit Hub are provided free of charge for
          educational, personal, and professional software development purposes.
          You agree not to misuse the platform, attempt to disrupt its
          infrastructure, or run automated scrapers against our services.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          2. No Warranty (&ldquo;As-Is&rdquo; Disclaimer)
        </h2>
        <p>
          All tools, formatters, converters, and documentation on DevToolkit Hub
          are provided on an <strong>&ldquo;as-is&rdquo;</strong> basis without
          warranties of any kind. Always verify critical outputs before using
          them in production environments.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          3. Sensitive Data Responsibility
        </h2>
        <p>
          Although our tools run locally in your browser, you are advised not to
          paste confidential production secrets, private API keys, passwords, or
          regulated personal information into any online web utility.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          4. Third-Party Links &amp; Advertisements
        </h2>
        <p>
          DevToolkit Hub may display advertisements served by{' '}
          <strong>Google AdSense</strong> or link to external third-party
          websites. We are not responsible for the content or privacy practices
          of third-party advertisers or external sites.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>5. Contact</h2>
        <p>
          For questions regarding these Terms of Service, contact{' '}
          <a
            href='mailto:shruthilakshmanan21@gmail.com'
            className='text-blue-600 underline'
          >
            shruthilakshmanan21@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
