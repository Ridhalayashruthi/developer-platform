import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { tools } from "@/constants/tools";

const featuredTools = tools.filter(tool => tool.featured);

export default function DeveloperTools() {
  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <h2 className='text-4xl font-bold'>Popular Developer Tools</h2>

        <p className='mt-4 text-slate-400'>
          Free utilities used by developers every day.
        </p>

        <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {featuredTools.map((tool) => {
            const card = (
              <Card className='rounded-2xl border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-violet-500'>
                <div className='text-4xl'>{tool.icon}</div>

                <h3 className='mt-5 text-xl font-semibold'>{tool.title}</h3>

                <p className='mt-3 text-slate-400'>{tool.description}</p>
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
      </div>
    </section>
  );
}
