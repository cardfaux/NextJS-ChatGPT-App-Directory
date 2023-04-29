import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'chatGPT App | NextJS',
  description: 'An app I am building to use chatGPT with NextJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='h-full max-w-5xl mx-auto pt-10'>{children}</div>
      </body>
    </html>
  );
}
