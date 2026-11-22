import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center px-4 text-center'>
      <p className='text-sm font-mono text-muted-foreground mb-2'>
        404 — PAGE MOVED OR NOT FOUND
      </p>
      <h1 className='text-3xl sm:text-4xl font-bold tracking-tight mb-3'>
        This page has moved to a new section
      </h1>
      <p className='text-muted-foreground max-w-md mb-8'>
        We recently upgraded DevToolkit Hub. Jump straight to any of our free
        browser tools, roadmaps, or interview guides below:
      </p>

      <div className='flex flex-wrap justify-center gap-3'>
        <Link
          href='/tools'
          className='px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition'
        >
          Explore All Tools
        </Link>
        <Link
          href='/interview'
          className='px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-muted transition'
        >
          Interview Q&amp;A
        </Link>
        <Link
          href='/roadmaps'
          className='px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-muted transition'
        >
          Career Roadmaps
        </Link>
        <Link
          href='/ai'
          className='px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-muted transition'
        >
          AI Lab
        </Link>
      </div>
    </div>
  );
}
