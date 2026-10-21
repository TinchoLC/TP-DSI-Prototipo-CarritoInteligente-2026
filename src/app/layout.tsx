import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Prototipo DSI - Carrito Inteligente',
  description: 'Prototipo interactivo de góndola, carrito y zoom de pantalla táctil',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-800 antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
