'use client';

import Image from 'next/image';

import { usePromptStore } from '@/zustand/store';

export function Message({ text, avatar, idx, author }: { text: string; avatar: string; idx: number; author: string }) {
  const bgColorClass = idx % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200';
  const promptStore = usePromptStore();

  console.log(promptStore);

  return (
    <>
      <div className={`flex flex-row ${bgColorClass} p-4`}>
        <div className='w-[30px] relative mr-4'>
          <Image src={avatar} width={30} height={30} alt='' />
        </div>
        <div className='w-full'>{text}</div>
      </div>
    </>
  );
}
