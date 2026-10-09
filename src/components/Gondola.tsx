import React from 'react';
import { Product } from '../types';
import { SUPERMARKET_PRODUCTS } from '../data/products';
import { ProductIcon } from './ProductIcon';
import { Sparkles, Scan, MousePointerClick } from 'lucide-react';

interface GondolaProps {
  onScanProduct: (product: Product) => void;
  activeProductId?: string | null;
}

export const Gondola: React.FC<GondolaProps> = ({ onScanProduct, activeProductId }) => {
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex flex-col h-full">
      {/* Header de la góndola */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-base font-bold text-white tracking-wide uppercase">
              Góndola Supermercado
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Seleccioná o arrastrá artículos al carrito
          </p>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          8 Artículos Disponibles
        </span>
      </div>

      {/* Instrucción visual */}
      <div className="my-2.5 px-3 py-2 bg-sky-950/40 border border-sky-800/40 rounded-xl text-sky-200 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong>Arrastrá</strong> un artículo hacia el carrito o hacé click en <strong>Escanear</strong>.
          </span>
        </div>
      </div>

      {/* Estantes de la góndola */}
      <div className="flex-1 grid grid-cols-2 gap-2.5 overflow-y-auto pr-1">
        {SUPERMARKET_PRODUCTS.map((prod) => {
          const isSelected = activeProductId === prod.id;
          return (
            <div
              key={prod.id}
              draggable
              onDragStart={(e) => handleDragStart(e, prod)}
              className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
                isSelected
                  ? 'bg-sky-900/40 border-sky-400 shadow-lg shadow-sky-500/20 scale-[0.98]'
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-500 hover:shadow-md'
              }`}
            >
              {/* Badge promocional superior */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-slate-400 truncate max-w-[90px]">
                  {prod.category}
                </span>
                {prod.badge && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 truncate">
                    {prod.badge}
                  </span>
                )}
              </div>

              {/* Centro: Icono + Detalles */}
              <div className="flex items-center gap-2.5 my-1">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40 group-hover:scale-110 transition-transform duration-200 shrink-0">
                  <ProductIcon type={prod.iconType} className="w-9 h-9" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{prod.weightOrVolume}</p>
                </div>
              </div>

              {/* Precio góndola estilo supermercado */}
              <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between">
                <div className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-xs shadow-sm flex items-baseline gap-0.5">
                  <span className="text-[10px] font-bold">$</span>
                  <span>{prod.price.toLocaleString('es-AR')}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onScanProduct(prod)}
                  className="px-2 py-1 text-[11px] font-medium bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-md shadow flex items-center gap-1 transition-all group-hover:ring-2 group-hover:ring-sky-400/40"
                  title="Escanear y agregar al carrito"
                >
                  <Scan className="w-3 h-3" />
                  <span>Escanear</span>
                </button>
              </div>

              {/* Efecto hover arrastrable */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
