'use client';

import { useState } from 'react';

import { usePromptStore } from '@/zustand/store';

export default function Prompt() {
  const [promptInput, setPromptInput] = useState('');

  const promptStore = usePromptStore();

  const onSubmit = (prompt: string) => {
    if (prompt.trim().length === 0) {
      return;
    }

    promptStore.addMessage({
      id: new Date().toISOString(),
      author: 'human',
      avatar: 'https://thrangra.sirv.com/Avatar2.png',
      text: prompt,
    });

    alert(prompt);
  };

  return (
    <>
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
    </>
  );
}
