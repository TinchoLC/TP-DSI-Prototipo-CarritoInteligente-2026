import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { ProductIcon } from './ProductIcon';
import { ShoppingCart, Radio, ArrowRight, Zap } from 'lucide-react';

interface PhysicalCartProps {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  onDropProduct: (product: Product) => void;
  isScanning: boolean;
  hasOpenPopup: boolean;
}

export const PhysicalCart: React.FC<PhysicalCartProps> = ({
  items,
  totalPrice,
  totalQuantity,
  onDropProduct,
  isScanning,
  hasOpenPopup,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        const product: Product = JSON.parse(data);
        onDropProduct(product);
      }
    } catch (err) {
      console.error('Error parseando producto arrastrado', err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative bg-slate-900/90 border-2 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex flex-col transition-all duration-300 ${
        isDragOver
          ? 'border-emerald-400 bg-emerald-950/30 ring-4 ring-emerald-500/30 scale-[1.01]'
          : isScanning
          ? 'border-sky-400 ring-2 ring-sky-400/50'
          : 'border-slate-700/80'
      }`}
    >
      {/* Header del carrito físico */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Carrito Inteligente Físico
            </h3>
            <p className="text-[11px] text-slate-400">
              Equipado con Pantalla Táctil y Lector Infrarrojo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            Lector Activo
          </span>
        </div>
      </div>

      {/* Zona de Manija + Pantallita Montada + Lector Infrarrojo */}
      <div className="my-3 p-3 bg-gradient-to-b from-slate-800/90 to-slate-950 rounded-xl border border-slate-700/80 shadow-inner relative">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
          <span>Soporte de Manillar & Scanner</span>
          <span className="text-sky-400 flex items-center gap-1 font-semibold">
            <Zap className="w-3 h-3" />
            Sensor Infrarrojo
          </span>
        </div>

        {/* Manillar con la Tablet integrada y haz láser */}
        <div className="relative flex items-center justify-between gap-3">
          {/* Manija izquierda */}
          <div className="h-4 w-12 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-full shadow-md" />

          {/* Mini Pantalla Táctil montada en el carrito */}
          <div className="relative flex-1 bg-black p-1.5 rounded-lg border-2 border-slate-600 shadow-xl overflow-hidden group">
            {/* Marco de la mini tablet */}
            <div className="bg-slate-900 rounded p-1.5 text-center flex flex-col justify-between h-20 border border-slate-800">
              <div className="flex items-center justify-between text-[9px] text-sky-300 font-mono">
                <span>Carrito Inteligente</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {hasOpenPopup ? (
                <div className="bg-sky-950/80 border border-sky-400 rounded px-1 py-0.5 animate-pulse text-[10px] text-sky-200 font-bold">
                  ⚠️ [POPUP ACTIVO EN PANTALLA]
                </div>
              ) : (
                <div className="text-[11px] font-bold text-white flex flex-col">
                  <span className="text-slate-400 text-[9px] font-normal">
                    {totalQuantity} productos
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    ${totalPrice.toLocaleString('es-AR')}
                  </span>
                </div>
              )}

              <div className="text-[8px] text-slate-400 flex items-center justify-center gap-1">
                <span>Ver a la derecha</span>
                <ArrowRight className="w-2.5 h-2.5 text-sky-400 animate-bounce" />
              </div>
            </div>

            {/* Líneas indicadoras de Zoom hacia la derecha */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-sky-500 rounded-full animate-ping opacity-60 pointer-events-none" />
          </div>

          {/* Manija derecha */}
          <div className="h-4 w-12 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-full shadow-md" />
        </div>

        {/* Haz infrarrojo proyectado hacia abajo (zona de escaneo) */}
        <div className="mt-3 relative h-12 rounded-lg bg-slate-950 border border-dashed border-red-500/40 flex items-center justify-center overflow-hidden">
          {/* Línea láser roja animada */}
          <div
            className={`absolute inset-x-2 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] ${
              isScanning ? 'animate-laser opacity-100' : 'opacity-40 animate-pulse'
            }`}
          />
          <div className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-red-300">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-spin" />
            <span>Zona de Escaneo Infrarrojo (Drop Zone)</span>
          </div>
          {isDragOver && (
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center z-20 text-xs font-bold text-emerald-300 animate-pulse">
              ¡Soltá aquí para escanear el producto!
            </div>
          )}
        </div>
      </div>

      {/* Canasta de rejilla física con productos dentro */}
      <div className="flex-1 flex flex-col min-h-[140px]">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="font-semibold text-slate-300">Canasta del Carrito</span>
          <span className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
            {totalQuantity} {totalQuantity === 1 ? 'artículo' : 'artículos'} adentro
          </span>
        </div>

        <div className="flex-1 border-2 border-slate-700/80 rounded-xl p-2.5 bg-gradient-to-b from-slate-950/80 to-slate-900/90 relative overflow-hidden flex flex-col justify-end">
          {/* Trama de rejilla metálica de fondo */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-3 text-slate-500 z-10">
              <ShoppingCart className="w-8 h-8 stroke-1 text-slate-600 mb-1" />
              <p className="text-xs font-medium text-slate-400">Canasta vacía</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Arrastrá artículos desde la góndola para colocarlos adentro
              </p>
            </div>
          ) : (
            <div className="z-10 flex flex-wrap gap-2 overflow-y-auto max-h-[130px] p-1 content-start">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/90 border border-slate-600 shadow-sm animate-drop-in hover:bg-slate-700/90 transition-colors"
                >
                  <ProductIcon type={item.product.iconType} className="w-5 h-5" />
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-200 truncate max-w-[80px] inline-block align-bottom">
                      {item.product.name.split(' ')[0]}
                    </span>
                    <span className="ml-1 text-sky-400 font-bold font-mono">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ruedas del carrito decorativas inferiores */}
          <div className="absolute -bottom-2 left-6 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-500 shadow-md" />
          <div className="absolute -bottom-2 right-6 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-500 shadow-md" />
        </div>
      </div>
    </div>
  );
};
