import React, { useState } from 'react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';
import { Plus, Minus, X, Check, Barcode, AlertCircle } from 'lucide-react';

interface ProductScanPopupProps {
  product: Product;
  currentCartTotal: number;
  onAdd: (quantity: number) => void;
  onDiscard: () => void;
}

export const ProductScanPopup: React.FC<ProductScanPopupProps> = ({
  product,
  currentCartTotal,
  onAdd,
  onDiscard,
}) => {
  const [quantity, setQuantity] = useState(1);

  const subtotal = product.price * quantity;
  const projectedTotal = currentCartTotal + subtotal;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      {/* Ventana Emergente (Diseño fiel al boceto del TP) */}
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-sky-400/80 rounded-2xl shadow-2xl shadow-sky-950/60 p-5 flex flex-col gap-4 animate-pop">
        {/* Cabecera del Popup */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Barcode className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                Producto Escaneado
              </h3>
              <p className="text-[11px] text-sky-400 font-mono">
                Cód: {product.barcode}
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Lector Infrarrojo
          </span>
        </div>

        {/* Fila 1: Producto */}
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 shrink-0">
            <ProductIcon type={product.iconType} className="w-10 h-10" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Producto:
            </div>
            <div className="text-base font-bold text-white truncate">
              {product.name}
            </div>
            <div className="text-xs text-slate-400">
              {product.brand} · {product.weightOrVolume}
            </div>
          </div>
        </div>

        {/* Fila 2: Precio x unidad y Cantidad (exacto al boceto de papel) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Precio x unidad */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-400">
              Precio x unidad:
            </span>
            <span className="text-lg font-black text-white font-mono mt-1">
              ${product.price.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Cant: [-] [ 1 ] [+] */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-400">
              Cant:
            </span>
            <div className="flex items-center justify-between gap-1 mt-1 bg-slate-900/90 rounded-lg p-1 border border-slate-700">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-md bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-800 text-white font-bold flex items-center justify-center transition-colors"
                title="Disminuir cantidad"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="text-base font-bold text-sky-400 font-mono px-2">
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                className="w-8 h-8 rounded-md bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold flex items-center justify-center transition-colors shadow-sm"
                title="Aumentar cantidad"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Fila 3: Precio total del ítem (según boceto) */}
        <div className="p-3 rounded-xl bg-sky-950/50 border border-sky-800/60 flex items-center justify-between">
          <span className="text-xs font-bold text-sky-200">
            Precio total del artículo:
          </span>
          <span className="text-xl font-black text-sky-300 font-mono">
            ${subtotal.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Fila 4: Botones táctiles "Descartar" y "Agregar" (según boceto) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onDiscard}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-rose-950/60 active:bg-rose-900/80 border border-slate-700 hover:border-rose-500/60 text-slate-200 hover:text-rose-200 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <X className="w-4 h-4 text-rose-400 group-hover:rotate-90 transition-transform" />
            <span>Descartar</span>
          </button>

          <button
            type="button"
            onClick={() => onAdd(quantity)}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 border border-emerald-400/50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60"
          >
            <Check className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>

        {/* Barra Inferior del Boceto: Se mantiene visible el total a pagar */}
        <div className="mt-1 pt-2.5 border-t border-slate-800 text-xs flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Total actual: ${currentCartTotal.toLocaleString('es-AR')}</span>
          </span>
          <span className="text-emerald-400 font-medium">
            → Nuevo total: ${projectedTotal.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </div>
  );
};
