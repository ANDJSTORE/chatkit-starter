import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Bullet Gym - Chat',
  description: 'Assistente virtuale The Bullet Gym',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
