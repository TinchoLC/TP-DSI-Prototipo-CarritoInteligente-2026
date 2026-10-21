import React, { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { ProductScanPopup } from './ProductScanPopup';
import { ProductIcon } from './ProductIcon';
import {
  Trash2,
  X,
  Wifi,
  Battery,
  Clock,
  ShoppingCart,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { playRemoveSound } from '../utils/sound';

interface SmartDisplayProps {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  scannedProduct: Product | null;
  onConfirmAdd: (quantity: number) => void;
  onDiscardScan: () => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenWalletModal: () => void;
}

export const SmartDisplay: React.FC<SmartDisplayProps> = ({
  items,
  totalPrice,
  totalQuantity,
  scannedProduct,
  onConfirmAdd,
  onDiscardScan,
  onRemoveItem,
  onClearCart,
  onOpenWalletModal,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('12:00');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Live digital clock for smart cart tablet
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-full bg-slate-950 rounded-3xl p-3 border-4 border-slate-700 shadow-2xl ring-1 ring-sky-500/30 overflow-hidden">
      {/* Marco de Tablet Inteligente: Bisel, Cámara/Sensor y Speaker */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600 ring-1 ring-sky-500/40" />
        <span className="w-12 h-1 rounded-full bg-slate-800" />
      </div>

      {/* Pantalla Interna de la Tablet */}
      <div className="relative flex-1 flex flex-col bg-slate-900/95 rounded-2xl border border-slate-800 overflow-hidden mt-3 text-white">
        {/* Barra Superior del Sistema (Status Bar del Carrito) */}
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider text-slate-200">
              CARRITO INTELIGENTE
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">
              Terminal #014
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-[11px] font-medium text-slate-400">
              Cliente: <strong className="text-white">Laura</strong>
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-sky-400">
              <Clock className="w-3.5 h-3.5" />
              {currentTime}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <Wifi className="w-3.5 h-3.5" />
              <span>WiFi Ok</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <Battery className="w-3.5 h-3.5" />
              <span>94%</span>
            </span>
          </div>
        </div>

        {/* Encabezado Principal (Fiel a la vista de Boceto Principal del PDF) */}
        <>
            <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Listado de Compra en Carrito</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Control en tiempo real de artículos y montos
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenWalletModal}
                  className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 active:bg-sky-500/30 text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Ver promociones y billeteras recomendadas"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Ver Billeteras Virtuales</span>
                </button>
              </div>
            </div>

            {/* TABLA PRINCIPAL (Boceto Página 2: Producto | Cantidad | Precio | Quitar [X]) */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Encabezados de Columna (Según Boceto de Papel) */}
              <div className="grid grid-cols-12 gap-2 px-5 py-2.5 bg-slate-950/70 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
                <div className="col-span-6 flex items-center gap-2">
                  <span>Producto</span>
                </div>
                <div className="col-span-2 text-center">
                  <span>Cantidad</span>
                </div>
                <div className="col-span-3 text-right">
                  <span>Precio</span>
                </div>
                <div className="col-span-1 text-center">
                  <span>Quitar</span>
                </div>
              </div>

              {/* Filas de Artículos o Estado Vacío */}
              <div className="flex-1 overflow-y-auto px-5 py-2 space-y-2">
                {items.length === 0 ? (
                  <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <div className="p-3 rounded-full bg-slate-800/80 border border-slate-700 mb-3">
                      <ShoppingCart className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-300">
                      No hay productos en el carrito todavía
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      Arrastrá un producto desde la góndola (izquierda) hacia el carrito físico o hacé click en su botón <strong>Escanear</strong>.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-12 gap-2 items-center px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/60 transition-all duration-150 group"
                    >
                      {/* Columna Producto: Icono + Nombre + Detalle */}
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/80 shrink-0">
                          <ProductIcon
                            type={item.product.iconType}
                            className="w-7 h-7"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-100 truncate group-hover:text-sky-300 transition-colors">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span>{item.product.brand}</span>
                            <span>·</span>
                            <span className="font-mono text-slate-500">
                              ${item.product.price.toLocaleString('es-AR')} c/u
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Columna Cantidad */}
                      <div className="col-span-2 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono font-bold text-sm text-sky-400">
                          {item.quantity}
                        </span>
                      </div>

                      {/* Columna Precio (Subtotal) */}
                      <div className="col-span-3 text-right">
                        <span className="font-mono font-bold text-sm text-white">
                          ${item.subtotal.toLocaleString('es-AR')}
                        </span>
                      </div>

                      {/* Columna Quitar [X] (Botón táctil exacto al boceto) */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            playRemoveSound();
                            onRemoveItem(item.product.id);
                          }}
                          className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-rose-950/80 active:bg-rose-900 border border-slate-700 hover:border-rose-500/60 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm"
                          title={`Quitar ${item.product.name}`}
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECCIÓN INFERIOR (Fiel a la Página 2 del boceto: "Total a pagar: $...") */}
            <div className="bg-slate-950 p-4 border-t-2 border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                {/* Cuadro Total a Pagar (Idéntico al rectángulo del boceto) */}
                <div className="flex-1 bg-gradient-to-r from-slate-900 to-slate-850 p-3.5 rounded-2xl border-2 border-slate-700 flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                      Total a pagar:
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {totalQuantity} {totalQuantity === 1 ? 'producto' : 'productos acumulados'}
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                    ${totalPrice.toLocaleString('es-AR')}
                  </div>
                </div>

                {/* Botón táctil para eliminar todo el carrito (según descripción del TP) */}
                {items.length > 0 && (
                  <div>
                    {showClearConfirm ? (
                      <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-600/80 p-1.5 rounded-xl animate-fadeIn">
                        <span className="text-[11px] text-rose-200 font-bold px-1">
                          ¿Vaciar?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playRemoveSound();
                            onClearCart();
                            setShowClearConfirm(false);
                          }}
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-bold"
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowClearConfirm(false)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(true)}
                        className="p-3 rounded-2xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow"
                        title="Eliminar todo el carrito"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Vaciar Todo</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Nota inferior */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Subtotal actualizado automáticamente al escanear</span>
                </span>
              </div>
            </div>
        </>

        {/* POPUP EMERGENTE AL ESCANEAR (Fiel al Boceto Página 3) */}
        {scannedProduct && (
          <ProductScanPopup
            product={scannedProduct}
            currentCartTotal={totalPrice}
            onAdd={onConfirmAdd}
            onDiscard={onDiscardScan}
          />
        )}
      </div>
    </div>
  );
};
