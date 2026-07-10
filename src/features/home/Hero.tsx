import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import CodePreview from '@/components/common/CodePreview';

export default function Hero() {
  return (
    <section className='py-24'>
      <Container>
        <div className='grid items-center gap-16 lg:grid-cols-2'>
          {/* Left Side */}
          <div>
            <span className='inline-flex rounded-full border px-4 py-2 text-sm font-medium'>
              🚀 Modern Developer Platform
            </span>

            <h1 className='mt-8 text-6xl font-bold leading-tight'>
              Build Faster.
              <br />
              Learn Smarter.
              <br />
              Get Hired.
            </h1>

            <p className='mt-8 text-xl leading-8 text-muted-foreground'>
              One platform for developer tools, coding practice, AI-powered
              learning, interview preparation, career growth, and the latest in
              technology. Practice interviews, use free developer tools, explore
              AI resources, and grow your career.
            </p>

            <div className='mt-10 flex gap-4'>
              <Button
                size='lg'
                className='bg-violet-600 hover:bg-violet-500 px-8 shadow-lg'
              >
                🚀 Explore Tools
              </Button>

              <Button variant='outline' size='lg'>
                Start Learning
              </Button>
            </div>

            <div className='mt-12 flex flex-wrap gap-8'>
              <div>
                <h3 className='text-3xl font-bold text-violet-400'>100+</h3>
                <p className='text-sm text-slate-400'>Developer Tools</p>
              </div>

              <div>
                <h3 className='text-3xl font-bold text-cyan-400'>500+</h3>
                <p className='text-sm text-slate-400'>Interview Questions</p>
              </div>

              <div>
                <h3 className='text-3xl font-bold text-green-400'>AI</h3>
                <p className='text-sm text-slate-400'>Learning Assistant</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <CodePreview />
        </div>
      </Container>
    </section>
  );
}
