'use client';

import Image from 'next/image';

export default function Header({
  stack,
  params,
}: {
  stack: { logo: string; info: string };
  params: { stack: string };
}) {
  console.log(stack.logo);
  return (
    <div className='header flex bg-slate-200 p-4 rounded-2xl'>
      <div className='flex mr-4 justify-center items-center'>
        {stack.logo && <Image src={stack.logo} width={200} height={200} alt={`${params.stack} stack`} />}
        {!stack.logo && <Image src='/apple-logo.png' width={200} height={200} alt={`${params.stack} stack`} />}
      </div>
      <div className='flex font-bold text-sm'>{stack.info}</div>
    </div>
  );
}
