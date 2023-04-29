'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

import { usePromptStore } from '@/zustand/store';

export default function Message() {
  const promptStore = usePromptStore();
  const [text, setText] = useState('');

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
        return (
          <div className={`flex flex-row ${bgColorClass} p-4`} key={message.id}>
            <div className='w-[30px] relative mr-4'>
              <Image src={message.avatar} width={30} height={30} alt='' />
            </div>
            <div className='w-full'>{message.text}</div>
          </div>
        );
      })}
    </div>
  );
}
