import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DRINKS ON CHAIN',
    template: '%s | DRINKS ON CHAIN',
  },
  description: 'Tokenizando activos reales de Bolivia en Stellar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}