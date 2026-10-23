import React, { useState, useRef } from 'react';
import { CartItem, Product } from '../types';
import { ProductSketchIcon } from './ProductSketchIcon';
import { Plus, Minus, X, Battery, Wifi, Clock, ShoppingCart } from 'lucide-react';
import { playRemoveSound, playScanBeep } from '../utils/sound';

interface TabletZoomDisplayProps {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  scannedProduct: Product | null;
  onConfirmAdd: (quantity: number) => void;
  onDiscardScan: () => void;
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export const TabletZoomDisplay: React.FC<TabletZoomDisplayProps> = ({
  items,
  totalPrice,
  totalQuantity,
  scannedProduct,
  onConfirmAdd,
  onDiscardScan,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [isTouchPressed, setIsTouchPressed] = useState(false);
  const tabletRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Solo simular el círculo táctil con mouse (en celular ya es táctil)
    if (e.pointerType !== 'mouse' || !tabletRef.current) return;
    const rect = tabletRef.current.getBoundingClientRect();
    setTouchPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerLeave = () => {
    setTouchPos(null);
    setIsTouchPressed(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setIsTouchPressed(true);
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setIsTouchPressed(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Etiqueta superior roja que indica el Zoom a la Tablet */}
      <div className="flex items-center justify-between pb-1 px-2 sm:px-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-600 animate-ping" />
          <h2 className="text-red-600 font-black text-xs sm:text-sm md:text-base tracking-wide uppercase font-mono">
            ZOOM A LA TABLET DEL CARRITO
          </h2>
        </div>
        <span className="text-[9px] sm:text-[11px] text-slate-500 font-bold bg-white border border-slate-300 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs">
          Simulador Táctil (10")
        </span>
      </div>

      {/* MARCO FÍSICO DE TABLET REAL */}
      <div
        ref={tabletRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className={`relative flex-1 bg-slate-900 border-4 sm:border-8 border-slate-800 rounded-[28px] sm:rounded-[42px] p-2 sm:p-3 shadow-2xl flex flex-col overflow-hidden select-none ${
          touchPos ? 'cursor-none' : ''
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 2px #475569',
        }}
      >
        {/* Cámara frontal y sensor en el bisel de la tablet */}
        <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-40 pointer-events-none">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-950 border border-slate-700 ring-1 ring-slate-800" />
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* PANTALLA TÁCTIL INTERNA */}
        <div className="relative flex-1 bg-white rounded-[20px] sm:rounded-[30px] border border-slate-200 overflow-hidden flex flex-col justify-between">
          {/* Status bar de la tablet táctil */}
          <div className="bg-slate-100 border-b border-slate-300 px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500" />
              <strong className="text-slate-900 font-black">Carrito #14</strong>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[11px] text-slate-600 font-mono">
              <span className="flex items-center gap-0.5 sm:gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
                <span>12:45</span>
              </span>
              <span className="flex items-center gap-0.5 sm:gap-1 text-emerald-600">
                <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>WiFi</span>
              </span>
              <span className="flex items-center gap-0.5 sm:gap-1 text-slate-800 font-bold">
                <Battery className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                <span>92%</span>
              </span>
            </div>
          </div>

          {/* CUERPO DEL SISTEMA */}
          <div className="flex-1 flex flex-col p-2 sm:p-4 justify-between overflow-hidden">
            {/* TABLA PRINCIPAL */}
            <div className="flex-1 flex flex-col bg-white border-2 border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
              {/* Cabecera de la tabla */}
              <div className="grid grid-cols-12 gap-1.5 sm:gap-2 bg-slate-200 border-b-2 border-slate-800 px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-xs font-black text-slate-900 uppercase tracking-wide">
                <div className="col-span-5">Producto</div>
                <div className="col-span-3 text-center">Cantidad</div>
                <div className="col-span-3 text-right">Precio</div>
                <div className="col-span-1 text-center">Quitar</div>
              </div>

              {/* Filas de la tabla */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-200 p-1">
                {items.length === 0 ? (
                  <div className="h-full min-h-[140px] sm:min-h-[190px] flex flex-col items-center justify-center text-center p-2 sm:p-4 text-slate-400">
                    <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mb-1" />
                    <strong className="text-xs sm:text-sm text-slate-600">
                      No hay productos en el carrito
                    </strong>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-1 max-w-xs">
                      Tocá o arrastrá un producto desde las góndolas (izquierda) para escanearlo.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center px-2 sm:px-3 py-1.5 sm:py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      {/* Producto */}
                      <div className="col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <ProductSketchIcon
                          type={item.product.iconType}
                          className="w-5 h-5 sm:w-7 sm:h-7 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] sm:text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[8px] sm:text-[10px] text-slate-500 font-mono">
                            ${item.product.price.toLocaleString('es-AR')} c/u
                          </div>
                        </div>
                      </div>

                      {/* Cantidad con botones [-] y [+] */}
                        <div className="col-span-3 flex items-center justify-center">
                          <div className="inline-flex items-center gap-1 bg-slate-100 border border-slate-300 rounded-lg p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  playRemoveSound();
                                  onUpdateQuantity(item.product.id, -1);
                                }
                              }}
                              disabled={item.quantity <= 1}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white hover:bg-slate-200 active:bg-slate-300 disabled:opacity-30 disabled:hover:bg-white text-slate-700 font-bold flex items-center justify-center transition-colors border border-slate-200 shadow-2xs touch-manipulation"
                              title="Restar 1 unidad"
                            >
                              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                            </button>

                            <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 px-1 sm:px-1.5 min-w-[18px] text-center">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                playScanBeep();
                                onUpdateQuantity(item.product.id, 1);
                              }}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white font-bold flex items-center justify-center transition-colors shadow-2xs touch-manipulation"
                              title="Sumar 1 unidad"
                            >
                              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>

                      {/* Precio */}
                      <div className="col-span-3 text-right font-mono font-bold text-xs sm:text-sm text-slate-900">
                        ${item.subtotal.toLocaleString('es-AR')}
                      </div>

                      {/* Botón táctil Quitar [X] */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            playRemoveSound();
                            onRemoveItem(item.product.id);
                          }}
                          className="w-6 h-6 sm:w-7 sm:h-7 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-400 hover:border-red-500 rounded-lg flex items-center justify-center font-bold text-xs transition-colors shadow-2xs touch-manipulation"
                          title="Quitar este artículo"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECCIÓN INFERIOR: Total a pagar */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="bg-white border-2 border-slate-800 rounded-xl p-2 sm:p-3 flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-[10px] sm:text-xs font-black uppercase text-slate-600 tracking-wider">
                    Total a pagar:
                  </div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">
                    {totalQuantity} {totalQuantity === 1 ? 'producto' : 'productos'}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-mono">
                  ${totalPrice.toLocaleString('es-AR')}
                </div>
              </div>

            </div>
          </div>

          {/* POPUP DE ESCANEO TÁCTIL */}
          {scannedProduct && (
            <TabletScanPopup
              product={scannedProduct}
              currentCartTotal={totalPrice}
              onAdd={onConfirmAdd}
              onDiscard={onDiscardScan}
            />
          )}
        </div>

        {/* CURSOR TÁCTIL SIMULADO (sólo visible si hay movimiento de mouse en desktop) */}
        {touchPos && (
          <div
            className="pointer-events-none absolute z-50 transition-transform duration-75 ease-out"
            style={{
              left: `${touchPos.x}px`,
              top: `${touchPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`rounded-full transition-all duration-100 flex items-center justify-center ${
                isTouchPressed
                  ? 'w-10 h-10 bg-slate-900/35 border-2 border-slate-700 scale-90 ring-4 ring-sky-400/40 shadow-lg'
                  : 'w-8 h-8 bg-slate-900/20 border-2 border-slate-700/60 scale-100 shadow-md backdrop-blur-2xs'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  isTouchPressed ? 'bg-sky-400' : 'bg-slate-700/50'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Popup que se abre dentro de la tablet al escanear
interface TabletScanPopupProps {
  product: Product;
  currentCartTotal: number;
  onAdd: (qty: number) => void;
  onDiscard: () => void;
}

const TabletScanPopup: React.FC<TabletScanPopupProps> = ({
  product,
  currentCartTotal,
  onAdd,
  onDiscard,
}) => {
  const [quantity, setQuantity] = useState(1);
  const subtotal = product.price * quantity;
  const projectedTotal = currentCartTotal + subtotal;

  return (
    <div className="absolute inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white border-2 sm:border-3 border-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col gap-2 sm:gap-3 max-h-[95%] overflow-y-auto">
        {/* Cabecera del popup */}
        <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b-2 border-slate-800">
          <span className="text-[10px] sm:text-xs font-black uppercase text-red-600 tracking-wider">
            ¡Producto Escaneado!
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">
            {product.barcode}
          </span>
        </div>

        {/* Fila 1: Producto */}
        <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-50 border border-slate-300 rounded-xl">
          <ProductSketchIcon type={product.iconType} className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold block">
              Producto:
            </span>
            <strong className="text-xs sm:text-sm text-slate-900 block truncate">
              {product.name}
            </strong>
          </div>
        </div>

        {/* Fila 2: Precio x unidad y selector de cantidad */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {/* Precio x unidad */}
          <div className="p-2 sm:p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold block">
              Precio x unidad:
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 block">
              ${product.price.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Cant: [-] [ 1 ] [+] */}
          <div className="p-2 sm:p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold block">
              Cant:
            </span>
            <div className="flex items-center justify-between mt-0.5 bg-white border border-slate-400 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-800 font-bold text-xs flex items-center justify-center transition-colors touch-manipulation"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 px-1 sm:px-2">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center transition-colors touch-manipulation"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Fila 3: Precio total del producto */}
        <div className="p-2 sm:p-2.5 bg-red-50 border border-red-300 rounded-xl flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-bold text-red-900">
            Precio total:
          </span>
          <span className="text-sm sm:text-base font-black text-red-700 font-mono">
            ${subtotal.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Fila 4: Botones Descartar y Agregar */}
        <div className="grid grid-cols-2 gap-2 pt-0.5 sm:pt-1">
          <button
            type="button"
            onClick={onDiscard}
            className="py-2 sm:py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-400 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors touch-manipulation"
          >
            <X className="w-3.5 h-3.5" />
            <span>Descartar</span>
          </button>

          <button
            type="button"
            onClick={() => onAdd(quantity)}
            className="py-2 sm:py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow touch-manipulation"
          >
            <span>Agregar</span>
          </button>
        </div>

        {/* Total acumulado visible */}
<div className="pt-1.5 sm:pt-2 border-t border-slate-200 text-[10px] sm:text-[11px] text-slate-500 flex items-center justify-between">
          <span>Total acumulado:</span>
          <span className="font-mono font-bold text-slate-800">
            ${projectedTotal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </div>
  );
};
