'use client';

import { useState } from 'react';

const SESSION_KEYS = [
  'u1-2023-04-29T23:05:00.252Z',
  'u2-2023-04-29T23:05:00.123Z',
  'u3-2023-04-29T23:05:00.349Z',
  'u4-2023-04-29T23:05:00.907Z',
];

export default function SessionSelect() {
  const [activeSession, setActiveSession] = useState('');

  const handleSessionChange = async (event: any) => {
    const session = event.target.value;
    if (!session) {
      console.log('no session selected');
      return;
    }

    await fetch(`/api/completion?uid=${session}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ session }),
    });
    setActiveSession(session);
  };

  return (
    <>
      <div className='mt-4'>Active Session: {activeSession}</div>
      <select
        onChange={handleSessionChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[200px] p-2.5 mt-5'
        name=''
        id=''
      >
        <option value={''}>Choose Session</option>
        {SESSION_KEYS.map((sessionKey) => {
          return (
            <option key={sessionKey} value={sessionKey}>
              {sessionKey}
            </option>
          );
        })}
      </select>
    </>
  );
}
