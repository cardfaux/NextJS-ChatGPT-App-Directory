'use client';

import Link from 'next/link';
import Image from 'next/image';

export function StackImage({ stack }: { stack: { href: string; logo: string; name: string; hoverClass: string } }) {
  return (
    <Link
      key={stack.href}
      href={stack.href}
      className={`${stack.hoverClass} w-20 h-20 relative border-2 border-solid m-2 rounded-xl`}
    >
      <Image
        src={stack.logo}
        className='object-cover p-2'
        fill
        alt={`${stack.name} stack`}
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
      />
    </Link>
  );
}
