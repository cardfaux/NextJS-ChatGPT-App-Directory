'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';

import { usePromptStore } from '@/zustand/store';

export default function Message() {
  const promptStore = usePromptStore();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [promptStore.messages]);

  return (
    <div ref={chatRef} className='chat flex flex-col h-full overflow-scroll'>
      {promptStore.messages.map((message, index) => {
        const bgColorClass = index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200';
        const avatarToUse = index % 2 === 0 ? message.avatar : '/logo-open-ai.png';
        return (
          <div className={`flex flex-row ${bgColorClass} p-4`} key={message.id}>
            <div className='w-[30px] relative mr-4'>
              <Image src={avatarToUse} width={30} height={30} alt='' />
            </div>
            <div className='w-full'>{message.text}</div>
          </div>
        );
      })}
    </div>
  );
}
