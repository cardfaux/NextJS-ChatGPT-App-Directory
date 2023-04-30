import './globals.css';
import { Inter } from 'next/font/google';

import Hydrate from '@/components/utils/Hydrate';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'chatGPT App | NextJS',
  description: 'An app I am building to use chatGPT with NextJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Hydrate>{children}</Hydrate>
      {/* {children} */}
    </html>
  );
}
