import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DevToolkit Hub',
  description:
    'Privacy Policy for DevToolkit Hub, including details on client-side processing, Google Analytics, and Google AdSense.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className='max-w-3xl mx-auto px-4 py-12 space-y-6'>
      <h1 className='text-3xl font-bold'>Privacy Policy for DevToolkit Hub</h1>
      <p className='text-sm text-gray-500'>Last Updated: November 22, 2026</p>

      <p>
        At <strong>DevToolkit Hub</strong> (accessible from{' '}
        <code>https://devtoolkit-hub.vercel.app/</code>), one of our main
        priorities is the privacy of our visitors. This Privacy Policy outlines
        the types of information collected and recorded by DevToolkit Hub and
        how we use it.
      </p>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          1. Client-Side Data Processing
        </h2>
        <p>
          All developer utilities available on DevToolkit Hub (such as JSON
          formatting, Base64 encoding/decoding, regex testing, and token
          inspection) operate primarily{' '}
          <strong>client-side within your web browser</strong>. Input data
          pasted into our tools is processed locally on your device and is not
          permanently stored on our servers.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          2. Log Files &amp; Google Analytics (GA4)
        </h2>
        <p>
          DevToolkit Hub uses standard log files and{' '}
          <strong>Google Analytics (GA4)</strong> to understand how visitors
          interact with our website. Information collected includes anonymized
          IP addresses, browser type, Internet Service Provider (ISP), date/time
          stamps, referring/exit pages, and event interactions to improve site
          performance and fix broken links.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>3. Cookies and Web Beacons</h2>
        <p>
          DevToolkit Hub uses cookies to store visitors&apos; preferences and
          optimize user experience by customizing web page content based on
          browser type or other technical information.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          4. Google AdSense &amp; DoubleClick DART Cookie
        </h2>
        <p>
          <strong>Google</strong> is a third-party vendor on our site and uses
          cookies (known as <strong>DART cookies</strong>) to serve ads to
          visitors based upon their visit to{' '}
          <code>https://devtoolkit-hub.vercel.app/</code> and other websites on
          the internet.
        </p>
        <ul className='list-disc pl-6 space-y-1'>
          <li>
            Visitors may decline the use of DART cookies by visiting the{' '}
            <a
              href='https://google.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              Google Ad and Content Network Privacy Policy
            </a>
            .
          </li>
          <li>
            Users can opt out of personalized advertising anytime via{' '}
            <a
              href='https://google.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              Google Ads Settings
            </a>
            .
          </li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          5. GDPR &amp; CCPA Data Protection Rights
        </h2>
        <p>
          Depending on your region, you have the right to request access to,
          correction of, or deletion of personal data, and to opt out of
          non-essential analytics and advertising cookies via your browser
          settings.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>6. Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
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
