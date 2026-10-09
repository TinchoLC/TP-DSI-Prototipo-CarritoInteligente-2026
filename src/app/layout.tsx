import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prototipo DSI - Carrito Inteligente',
  description: 'Prototipo interactivo de góndola, carrito y zoom de pantalla táctil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
