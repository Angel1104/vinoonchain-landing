import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRINKS ON CHAIN",
  description: "Landing page de DRINKS ON CHAIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
