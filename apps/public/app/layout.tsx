import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Go Champs',
  description: 'Go Champs — campeonatos, times e jogadores'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
