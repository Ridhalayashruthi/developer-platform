import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Container from '@/components/common/Container';
import { tools } from "@/constants/tools";

export default function ToolsHome() {
  return (
    <main className='py-20'>
      <Container>
        <div className='text-center'>
          <h1 className='text-5xl font-bold'>Developer Tools</h1>

          <p className='mt-4 text-lg text-slate-400'>
            Free, fast, and reliable tools built for developers.
          </p>
        </div>

        <div className='mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {tools.map((tool) => {
            const card = (
              <Card className='h-full cursor-pointer rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg'>
                <div className='text-5xl'>{tool.icon}</div>

                <h2 className='mt-5 text-2xl font-semibold'>{tool.title}</h2>

                <p className='mt-3 text-slate-400'>{tool.description}</p>

                <span
                  className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    tool.available
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}
                >
                  {tool.available ? "Available" : "Coming Soon"}
                </span>
              </Card>
            );

            return tool.available ? (
              <Link key={tool.title} href={tool.href}>
                {card}
              </Link>
            ) : (
              <div key={tool.title} className='cursor-not-allowed opacity-70'>
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
