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
import { Volume2, VolumeX, ShoppingBag, ShoppingCart, Tablet, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(true);

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

  // Modificar cantidad (+ / -) de un producto
  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: newQty * item.product.price,
            };
          }
          return item;
        })
        .filter((item) => item !== null);
    });
  }, []);
  const handleToggleAudio = () => {
    const active = toggleMute();
    setIsAudioMuted(!active);
  };

  return (
    <main className="min-h-screen bg-slate-200/80 p-2 sm:p-3 md:p-5 flex flex-col justify-between max-w-[1720px] mx-auto text-slate-900">
      {/* MODAL DE BIENVENIDA A PANTALLA COMPLETA */}
      {isWelcomeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl bg-white border-2 sm:border-4 border-slate-900 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl flex flex-col items-center text-center gap-4 sm:gap-6 my-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <ShoppingCart className="w-6 h-6 sm:w-9 sm:h-9" />
            </div>

            <div className="space-y-2 sm:space-y-3 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-full border border-red-200">
                Diseño de Sistemas de Información · Prototipo Interactivo
              </span>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                ¡Te damos la bienvenida al Carrito Inteligente!
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                Estás a punto de probar una nueva forma de hacer las compras. Este simulador interactivo te permitirá experimentar cómo funcionará la pantalla táctil que estará integrada directamente en los carritos de supermercado.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Para que la prueba sea más fácil, dividimos tu pantalla en dos partes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full text-left my-1 sm:my-2">
              <div className="p-3 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-300 flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-xl bg-red-600 text-white shrink-0">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-red-600 block">
                    <span className="md:hidden">Parte Superior (La interacción física):</span>
                    <span className="hidden md:inline">Tarjeta Izquierda (La interacción física):</span>
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    El Supermercado (Simulador)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    Esta sección representa el mundo real. Vas a encontrar las góndolas y el lector láser. Para simular que estás comprando, simplemente tocá o arrastrá los productos hacia el escáner rojo de la parte inferior.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-300 flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-xl bg-slate-900 text-white shrink-0">
                  <Tablet className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-700 block">
                    <span className="md:hidden">Parte Inferior (El software):</span>
                    <span className="hidden md:inline">Tarjeta Derecha (El software):</span>
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    La Pantalla del Carrito
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                    Este es el sistema real que verás en tu carrito. Observá cómo se actualiza al instante tu lista de compra. Podrás ver el detalle de cada producto, modificar cantidades, quitar artículos y controlar el total a pagar en todo momento.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsWelcomeModalOpen(false)}
              className="mt-1 sm:mt-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>¡Comenzar la experiencia!</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* HEADER LIMPIO */}
      <header className="mb-2 sm:mb-3 bg-white border-2 border-slate-300 rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight">
              Prototipo DSI · Carrito Inteligente
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500">
              <span className="md:hidden">Arriba: Simulación física | Abajo: Zoom a la Tablet</span>
              <span className="hidden md:inline">Izquierda: Simulación del mundo real (Góndola y Carrito) | Derecha: Zoom a la Tablet Táctil</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-600">
            <span className="font-bold text-slate-800">Integrantes:</span>
            <span>Cabrera Martín · Corbella Leonardo · Grieco Giuliana · Squarzon Nicolás</span>
          </div>
          <div className="sm:hidden flex flex-wrap gap-1 text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
            <span>Cabrera · Corbella · Grieco · Squarzon</span>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[11px] sm:text-xs font-bold rounded-xl flex items-center gap-1 sm:gap-1.5 transition-colors shadow-2xs"
            title="Activar/Silenciar sonido de escaneo"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-500" />
                <span className="hidden sm:inline">Silenciado</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Sonido</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ESCENA PRINCIPAL */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-stretch relative">
        {/* LADO IZQUIERDO / ARRIBA (COL 1-6): MUNDO REAL (GÓNDOLA Y CARRITO) */}
        <div className="lg:col-span-6 flex flex-col min-h-[460px] sm:min-h-[520px] lg:h-full relative">
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

        {/* LADO DERECHO / ABAJO (COL 7-12): ZOOM A LA TABLET TÁCTIL */}
        <div className="lg:col-span-6 flex flex-col min-h-[460px] sm:min-h-[520px] lg:h-full relative">
          <TabletZoomDisplay
            items={cartItems}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            scannedProduct={scannedProduct}
            onConfirmAdd={handleConfirmAdd}
            onDiscardScan={handleDiscardScan}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>

      
    </main>
  );
}
