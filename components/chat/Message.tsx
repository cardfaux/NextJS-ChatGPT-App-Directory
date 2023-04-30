'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { usePromptStore } from '@/zustand/store';

const SyntaxHighlighterTypescript = SyntaxHighlighter as any;

export default function Message({ params }: { params: { stack: string } }) {
  console.log(params);
  const promptStore = usePromptStore();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanChatHistory = async () => {
      await fetch('/api/completion', { method: 'DELETE' });
    };

    cleanChatHistory();
    promptStore.clearMessages();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [promptStore.messages]);

  return (
    <div ref={chatRef} className='chat flex flex-col h-full overflow-scroll'>
      {promptStore.messages.length === 0 && (
        <div className='bg-yellow-200 p-4 rounded-2xl'>
          <h1>No Messages Yet. Ask Me Something about {params.stack.toUpperCase()}</h1>
        </div>
      )}
      {promptStore.messages.map((message, index) => {
        const bgColorClass = index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200';
        return (
          <div className={`flex flex-row ${bgColorClass} p-4`} key={message.id}>
            <div className='w-[30px] relative mr-4'>
              <Image src={message.avatar} width={30} height={30} alt='' />
            </div>
            <ReactMarkdown
              className='w-full'
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighterTypescript language={match[1]} PreTag='div' {...props} style={dracula}>
                      {children}
                    </SyntaxHighlighterTypescript>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}
