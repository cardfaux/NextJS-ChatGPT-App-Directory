'use client';

import { useState } from 'react';

import { usePromptStore } from '@/zustand/store';
import Stack from '@/app/learning/[stack]/page';

export default function Prompt({ stackKey }: { stackKey: string }) {
  const [promptInput, setPromptInput] = useState('');

  const promptStore = usePromptStore();

  const onSubmit = async (prompt: string) => {
    if (prompt.trim().length === 0) {
      return;
    }

    promptStore.addMessage({
      id: new Date().toISOString(),
      author: 'human',
      avatar: 'https://thrangra.sirv.com/Avatar2.png',
      text: prompt,
    });

    const response = await fetch(`/api/completion?stack=${stackKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const json = await response.json();

    if (response.ok) {
      promptStore.addMessage({
        id: new Date().toISOString(),
        author: 'ai',
        avatar: '/logo-open-ai.png',
        text: json.result,
      });
    } else {
      console.error(json?.error?.message);
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <textarea
        onChange={(e) => setPromptInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(promptInput);
            setPromptInput('');
          }
        }}
        rows={4}
        className='w-full p-2.5 text-sm text-gray-900 bg-slate-200 rounded-lg border border-gray-300'
        placeholder='Write your prompt there...'
        value={promptInput}
      />
      <button
        className='w-full bg-red-400 text-white rounded-lg border-gray-300 text-sm py-2.5 mt-2'
        onClick={promptStore.clearMessages}
      >
        Clear Messages
      </button>
    </div>
  );
}
