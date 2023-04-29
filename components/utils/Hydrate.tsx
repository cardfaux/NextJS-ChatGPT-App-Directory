'use client';

import { useEffect, useState, ReactNode } from 'react';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body>
          <div className='h-full max-w-5xl mx-auto pt-10'>{children}</div>
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}
