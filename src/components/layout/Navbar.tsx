import Link from 'next/link';

import Container from '@/components/common/Container';
import Logo from '@/components/common/Logo';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Tools', href: '/tools' },
  { name: 'Interview', href: '/interview' },
  { name: 'Roadmaps', href: '/roadmaps' },
  { name: 'AI', href: '/ai' },
];
export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-slate-800 bg-background/80 backdrop-blur-md'>
      <Container>
        <div className='flex h-16 items-center justify-between'>
          <Logo />
          <nav>
            <ul className='flex items-center gap-8'>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='transition hover:text-violet-400'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
