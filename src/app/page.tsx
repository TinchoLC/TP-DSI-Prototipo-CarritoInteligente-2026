'use client';

import React, { useState, useCallback } from 'react';
import { Product, CartItem } from '../types';
import { RealSupermarketAisle } from '../components/RealSupermarketAisle';
import { TabletZoomDisplay } from '../components/TabletZoomDisplay';
import {
  playScanBeep,
  playAddSuccess,
  playDiscardSound,
  toggleMute,
} from '../utils/sound';
import { Volume2, VolumeX, BookOpen, ShoppingBag } from 'lucide-react';
import { TPModal } from '../components/TPModal';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isTPModalOpen, setIsTPModalOpen] = useState<boolean>(false);

  // Totales acumulados
  const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Escaneo al arrastrar o clickear
  const handleScanProduct = useCallback((product: Product) => {
    playScanBeep();
    setScannedProduct(product);
  }, []);

  // Confirmar agregar desde el popup
  const handleConfirmAdd = useCallback(
    (quantity: number) => {
      if (!scannedProduct) return;

      playAddSuccess();

      setCartItems((prevItems) => {
        const existingIdx = prevItems.findIndex(
          (item) => item.product.id === scannedProduct.id
        );

        if (existingIdx > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIdx].quantity + quantity;
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: newQty,
            subtotal: newQty * scannedProduct.price,
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              product: scannedProduct,
              quantity,
              subtotal: quantity * scannedProduct.price,
              addedAt: new Date(),
            },
          ];
        }
      });

      setScannedProduct(null);
    },
    [scannedProduct]
  );

  // Descartar desde el popup
  const handleDiscardScan = useCallback(() => {
    playDiscardSound();
    setScannedProduct(null);
  }, []);

  // Quitar producto de la tabla
  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  // Vaciar carrito
  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleToggleAudio = () => {
    const active = toggleMute();
    setIsAudioMuted(!active);
  };

  return (
    <main className="min-h-screen bg-slate-200/80 p-3 md:p-5 flex flex-col justify-between max-w-[1720px] mx-auto text-slate-900">
      {/* HEADER LIMPIO */}
      <header className="mb-3 bg-white border-2 border-slate-300 rounded-2xl px-5 py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight">
              Prototipo DSI · Carrito Inteligente en Supermercado
            </h1>
            <p className="text-xs text-slate-500">
              Izquierda: Simulación del mundo real (Góndola y Carrito) | Derecha: Zoom a la Tablet Táctil
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTPModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>Ficha del TP</span>
          </button>

          <button
            type="button"
            onClick={handleToggleAudio}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Activar/Silenciar sonido de escaneo"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-500" />
                <span>Silenciado</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sonido Activado</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ESCENA PRINCIPAL */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch relative">
        {/* LADO IZQUIERDO (COL 1-6): MUNDO REAL (GÓNDOLA Y CARRITO) */}
        <div className="lg:col-span-6 flex flex-col h-[680px] lg:h-full relative">
          <RealSupermarketAisle
            cartItems={cartItems}
            onScanProduct={handleScanProduct}
            activeProductId={scannedProduct?.id}
          />

          {/* Línea conectora roja que simula el Zoom hacia la tablet derecha */}
          <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none w-10 h-28">
            <svg viewBox="0 0 40 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 25 C 25 25, 20 75, 40 75"
                stroke="#DC2626"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* LADO DERECHO (COL 7-12): ZOOM A LA TABLET TÁCTIL */}
        <div className="lg:col-span-6 flex flex-col h-[680px] lg:h-full relative">
          <TabletZoomDisplay
            items={cartItems}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            scannedProduct={scannedProduct}
            onConfirmAdd={handleConfirmAdd}
            onDiscardScan={handleDiscardScan}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </div>
      </div>

      {/* Modal Ficha del TP */}
      <TPModal
        isOpen={isTPModalOpen}
        onClose={() => setIsTPModalOpen(false)}
      />
    </main>
  );
}
