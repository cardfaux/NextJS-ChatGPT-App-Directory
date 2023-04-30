import './globals.css';
import { Inter } from 'next/font/google';

import Hydrate from '@/components/utils/Hydrate';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ask about Apple, Samsung, Motorola, and more!',
  description: 'Ask me questions about Apple, Samsung, Motorola, and more!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Hydrate>{children}</Hydrate>
      {/* {children} */}
    </html>
  );
}
