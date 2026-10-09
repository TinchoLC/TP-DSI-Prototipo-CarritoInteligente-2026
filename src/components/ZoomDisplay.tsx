import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { ProductSketchIcon } from './ProductSketchIcon';
import { Plus, Minus, X, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playRemoveSound } from '../utils/sound';

interface ZoomDisplayProps {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  scannedProduct: Product | null;
  onConfirmAdd: (quantity: number) => void;
  onDiscardScan: () => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const ZoomDisplay: React.FC<ZoomDisplayProps> = ({
  items,
  totalPrice,
  totalQuantity,
  scannedProduct,
  onConfirmAdd,
  onDiscardScan,
  onRemoveItem,
  onClearCart,
}) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleFinish = () => {
    if (items.length === 0) return;
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setPurchaseSuccess(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Etiqueta superior roja manuscrita/destacada exactamente como en el dibujo */}
      <div className="flex items-center justify-between pb-1 px-3">
        <span className="text-red-600 font-extrabold text-base tracking-wide flex items-center gap-1.5 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          zoom pantalla
        </span>
        <span className="text-xs text-slate-500 font-medium">
          Sistema en Carrito Inteligente
        </span>
      </div>

      {/* Gran Recuadro / Burbuja del Zoom con trazo rojo (como el círculo rojo del boceto) */}
      <div className="relative flex-1 bg-white border-4 border-red-500 rounded-[32px] p-4 shadow-xl flex flex-col justify-between overflow-hidden">
        {/* Barra de cabecera de la pantalla táctil */}
        <div className="bg-slate-100 border-2 border-slate-300 rounded-xl px-4 py-2 flex items-center justify-between text-xs text-slate-700 font-semibold mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-900">Carrito #14</span>
            <span className="text-slate-400">|</span>
            <span>Cliente: <strong>Laura</strong></span>
          </div>
          <div className="flex items-center gap-3 font-mono text-slate-600">
            <span>Red: OK</span>
            <span>Bat: 95%</span>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {purchaseSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-3" />
            <h3 className="text-2xl font-black text-slate-900">
              ¡Compra Finalizada!
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-sm">
              Podés pasar por la salida express. El total acumulado fue:
            </p>
            <div className="my-4 text-3xl font-black text-slate-900 font-mono bg-slate-100 border-2 border-slate-300 rounded-xl px-6 py-2">
              ${totalPrice.toLocaleString('es-AR')}
            </div>
            <button
              type="button"
              onClick={() => {
                setPurchaseSuccess(false);
                onClearCart();
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nueva Compra</span>
            </button>
          </div>
        ) : (
          <>
            {/* TABLA PRINCIPAL (Fiel a la Página 2 del Boceto a mano) */}
            <div className="flex-1 flex flex-col bg-white border-2 border-slate-800 rounded-2xl overflow-hidden mb-3">
              {/* Encabezados de Columna: Producto | Cantidad | Precio | Quitar */}
              <div className="grid grid-cols-12 gap-2 bg-slate-200 border-b-2 border-slate-800 px-4 py-2 text-xs font-black text-slate-900 uppercase tracking-wide">
                <div className="col-span-5">Producto</div>
                <div className="col-span-3 text-center">Cantidad</div>
                <div className="col-span-3 text-right">Precio</div>
                <div className="col-span-1 text-center">Quitar</div>
              </div>

              {/* Filas del Listado */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-200 p-1">
                {items.length === 0 ? (
                  <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-center p-4 text-slate-400">
                    <span className="text-base font-bold text-slate-600">
                      El carrito está vacío
                    </span>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Arrastrá un producto desde las góndolas de la izquierda hacia el carrito para agregarlo.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      {/* Producto */}
                      <div className="col-span-5 flex items-center gap-2 min-w-0">
                        <ProductSketchIcon
                          type={item.product.iconType}
                          className="w-6 h-6 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            ${item.product.price.toLocaleString('es-AR')} c/u
                          </div>
                        </div>
                      </div>

                      {/* Cantidad */}
                      <div className="col-span-3 text-center">
                        <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                          {item.quantity}
                        </span>
                      </div>

                      {/* Precio */}
                      <div className="col-span-3 text-right font-mono font-bold text-sm text-slate-900">
                        ${item.subtotal.toLocaleString('es-AR')}
                      </div>

                      {/* Quitar [X] (Botón con cruz exacto al boceto de papel) */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            playRemoveSound();
                            onRemoveItem(item.product.id);
                          }}
                          className="w-7 h-7 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-400 hover:border-red-500 rounded flex items-center justify-center font-bold text-xs transition-colors shadow-2xs"
                          title="Quitar producto"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECCIÓN INFERIOR (Rectángulo de "Total a pagar: $" exacto al boceto) */}
            <div className="flex flex-col gap-2">
              <div className="bg-white border-2 border-slate-800 rounded-xl p-3 flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-xs font-black uppercase text-slate-600 tracking-wider">
                    Total a pagar:
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {totalQuantity} {totalQuantity === 1 ? 'artículo' : 'artículos en total'}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
                  ${totalPrice.toLocaleString('es-AR')}
                </div>
              </div>

              {/* Botones de acción inferiores */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {items.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      playRemoveSound();
                      onClearCart();
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar Carrito</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={items.length === 0}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar Compra</span>
                </button>
              </div>
            </div>
          </>
          )}

        {/* POPUP DE ESCANEO (Fiel al Boceto Página 3) */}
        {scannedProduct && (
          <CleanScanPopup
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

// Componente del Popup de Escaneo en estilo blanco, claro y limpio
interface CleanScanPopupProps {
  product: Product;
  currentCartTotal: number;
  onAdd: (qty: number) => void;
  onDiscard: () => void;
}

const CleanScanPopup: React.FC<CleanScanPopupProps> = ({
  product,
  currentCartTotal,
  onAdd,
  onDiscard,
}) => {
  const [quantity, setQuantity] = useState(1);

  const subtotal = product.price * quantity;

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Marco de la Ventana Emergente (Boceto Página 3) */}
      <div className="w-full max-w-sm bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
        {/* Título Popup */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-slate-800">
          <span className="text-xs font-black uppercase text-red-600 tracking-wider">
            ¡Producto Escaneado!
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {product.barcode}
          </span>
        </div>

        {/* Fila 1: Producto */}
        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-300 rounded-xl">
          <ProductSketchIcon type={product.iconType} className="w-10 h-10 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-slate-500 font-bold block">
              Producto:
            </span>
            <strong className="text-sm text-slate-900 block truncate">
              {product.name}
            </strong>
          </div>
        </div>

        {/* Fila 2: Precio x unidad | Cant: [-] [1] [+] */}
        <div className="grid grid-cols-2 gap-2">
          {/* Precio x unidad */}
          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block">
              Precio x unidad:
            </span>
            <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
              ${product.price.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Cant: [-] [ 1 ] [+] */}
          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block">
              Cant:
            </span>
            <div className="flex items-center justify-between mt-0.5 bg-white border border-slate-400 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-800 font-bold text-xs flex items-center justify-center transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono font-bold text-sm text-slate-900 px-2">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Fila 3: Precio total */}
        <div className="p-2.5 bg-red-50 border border-red-300 rounded-xl flex items-center justify-between">
          <span className="text-xs font-bold text-red-900">
            Precio total:
          </span>
          <span className="text-base font-black text-red-700 font-mono">
            ${subtotal.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Fila 4: Botones Descartar y Agregar (Fiel al Boceto) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onDiscard}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-400 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Descartar</span>
          </button>

          <button
            type="button"
            onClick={() => onAdd(quantity)}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            <span>Agregar</span>
          </button>
        </div>

        {/* Barra inferior: Total a pagar visible tal como indica el boceto */}
        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Total acumulado actual:</span>
          <span className="font-mono font-bold text-slate-800">
            ${currentCartTotal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </div>
  );
};
