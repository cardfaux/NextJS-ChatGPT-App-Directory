'use client';

import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';

const SESSION_KEYS = [
  'u1-2023-04-29T23:05:00.252Z',
  'u2-2023-04-29T23:05:00.123Z',
  'u3-2023-04-29T23:05:00.349Z',
  'u4-2023-04-29T23:05:00.907Z',
];

export default function SessionSelect() {
  const [activeSession, setActiveSession] = useState('');
  const [userSessionUID, setUserSessionUID] = useState('');
  const { user }: any = useUser();

  useEffect(() => {
    if (user) {
      setActiveSession(user.uid);
    }
  }, [user]);

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
      <div className='mt-4'>UID: {user?.uid}</div>
      <select
        onChange={handleSessionChange}
        value={activeSession}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[200px] p-2.5 mt-5'
        name=''
        id=''
      >
        <option value={''} disabled={activeSession !== ''}>
          Choose Session
        </option>
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
