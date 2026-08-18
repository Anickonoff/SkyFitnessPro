import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import AuthModalProvider from '@/context/AuthModalProvider';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'SkyFitnessPro',
  description: 'Ваш персональный фитнес-тренер в кармане',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="md:bg-[#fafafa] pb-7.25 md:pb-20.25">
          <AuthProvider>
            <AuthModalProvider>{children}</AuthModalProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
