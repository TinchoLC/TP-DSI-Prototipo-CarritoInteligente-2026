import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { SUPERMARKET_PRODUCTS } from '../data/products';
import { ProductSketchIcon } from './ProductSketchIcon';
import { ShoppingCart, ArrowRight, Sparkles, Layers } from 'lucide-react';

interface RealSupermarketAisleProps {
  cartItems: CartItem[];
  onScanProduct: (product: Product) => void;
  activeProductId?: string | null;
}

export const RealSupermarketAisle: React.FC<RealSupermarketAisleProps> = ({
  cartItems,
  onScanProduct,
  activeProductId,
}) => {
  const [isDragOverCart, setIsDragOverCart] = useState(false);

  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOverCart(true);
  };

  const handleDragLeave = () => {
    setIsDragOverCart(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCart(false);
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        const product: Product = JSON.parse(data);
        onScanProduct(product);
      }
    } catch (err) {
      console.error('Error al soltar en el carrito', err);
    }
  };

  const topShelfProducts = SUPERMARKET_PRODUCTS.slice(0, 4);
  const bottomShelfProducts = SUPERMARKET_PRODUCTS.slice(4, 8);
  const totalItemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-300 shadow-lg flex flex-col justify-between select-none">
      {/* IMAGEN DE FONDO REAL DEL SUPERMERCADO */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none filter brightness-95"
        style={{ backgroundImage: "url('/images/supermarket_aisle.jpg')" }}
      />
      {/* Degradado para garantizar contraste y legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/90 pointer-events-none" />

      {/* CABECERA: CARTEL DE SUPERMERCADO REAL (Coto / Carrefour) */}
      <div className="relative z-10 bg-white/95 border-b-2 border-slate-300 px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-wider">
            PASILLO 4
          </span>
          <span className="font-extrabold text-slate-800 text-xs md:text-sm">
            GÓNDOLA DE ALIMENTOS Y BEBIDAS
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-semibold hidden sm:flex items-center gap-1">
          <span>Mundo Real (Simulación Física)</span>
        </div>
      </div>

      {/* SECCIÓN 1: GÓNDOLA CON PRODUCTOS REALES EN ESTANTES */}
      <div className="relative z-10 p-3 flex flex-col gap-3">
        {/* ESTANTE 1 */}
        <div className="bg-white/90 backdrop-blur-xs border-2 border-slate-300 rounded-2xl p-2.5 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Estante Superior</span>
            <span className="text-red-600 font-semibold">Tomar y arrastrar hacia el carrito ↓</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {topShelfProducts.map((prod) => (
              <RealShelfProductItem
                key={prod.id}
                product={prod}
                onDragStart={handleDragStart}
                onClick={() => onScanProduct(prod)}
                isActive={activeProductId === prod.id}
              />
            ))}
          </div>
          {/* Riel porta-precios del estante metálico */}
          <div className="mt-1.5 h-1.5 bg-red-600 rounded-full" />
        </div>

        {/* ESTANTE 2 */}
        <div className="bg-white/90 backdrop-blur-xs border-2 border-slate-300 rounded-2xl p-2.5 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Estante Inferior</span>
            <span className="text-slate-400">Precios actualizados en góndola</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {bottomShelfProducts.map((prod) => (
              <RealShelfProductItem
                key={prod.id}
                product={prod}
                onDragStart={handleDragStart}
                onClick={() => onScanProduct(prod)}
                isActive={activeProductId === prod.id}
              />
            ))}
          </div>
          {/* Riel porta-precios del estante */}
          <div className="mt-1.5 h-1.5 bg-red-600 rounded-full" />
        </div>
      </div>

      {/* SECCIÓN 2: EL CARRITO DE SUPERMERCADO REAL EN EL PASILLO */}
      <div className="relative z-10 px-4 pb-3 flex-1 flex flex-col justify-end">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-white/95 backdrop-blur-sm border-3 rounded-2xl p-3 transition-all duration-200 shadow-xl ${
            isDragOverCart
              ? 'border-red-500 ring-4 ring-red-400/40 scale-[1.02] bg-red-50/90'
              : 'border-slate-800'
          }`}
        >
          {/* Encabezado del Carrito en el Pasillo */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-600" />
              <div>
                <strong className="text-xs font-black text-slate-800 block">
                  Carrito de Supermercado
                </strong>
                <span className="text-[10px] text-slate-500 block">
                  Equipado con Tablet y Escáner Infrarrojo
                </span>
              </div>
            </div>

            {/* Pantallita pequeña en el carrito con indicador de Zoom */}
            <div className="flex items-center gap-2">
              <div
                id="cart-tablet-mini"
                className="px-2 py-1 bg-slate-900 text-white rounded-md border-2 border-red-500 shadow-sm flex items-center gap-1.5 animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono font-bold text-red-400">
                  TABLET #14
                </span>
              </div>

              {/* Conector / Flecha hacia la derecha */}
              <div className="flex items-center text-red-600 font-extrabold text-[11px] animate-bounce">
                <span className="hidden sm:inline">Ver zoom</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>

          {/* CUERPO DEL CARRITO CON FOTO REAL Y CANASTA DE ALAMBRE */}
          <div className="mt-2 grid grid-cols-12 gap-3 items-center">
            {/* Foto del carrito de supermercado real */}
            <div className="col-span-5 relative h-32 flex items-center justify-center bg-slate-100 rounded-xl overflow-hidden border border-slate-300">
              <img
                src="/images/shopping_cart.jpg"
                alt="Carrito de supermercado"
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-slate-900/80 text-white text-[9px] font-mono rounded">
                Carrito Real
              </div>
            </div>

            {/* Drop Zone: Canasta interactiva para soltar productos */}
            <div className="col-span-7 h-32 bg-slate-50 border-2 border-dashed border-red-500 rounded-xl p-2 flex flex-col justify-between overflow-hidden relative">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                <span>Canasta del Carrito</span>
                <span className="bg-red-600 text-white px-1.5 py-0.2 rounded font-mono">
                  {totalItemCount} {totalItemCount === 1 ? 'ítem' : 'ítems'} adentro
                </span>
              </div>

              {/* Items colocados dentro del carrito */}
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-1 text-slate-400">
                  <span className="text-xs font-bold text-red-600 animate-pulse">
                    ↓↓ Soltá el producto acá ↓↓
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    El lector infrarrojo lo escaneará automáticamente
                  </span>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto flex flex-wrap gap-1 content-start p-1 max-h-20">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5 shadow-2xs"
                    >
                      <ProductSketchIcon
                        type={item.product.iconType}
                        className="w-4 h-4 shrink-0"
                      />
                      <span className="text-[10px] font-semibold text-slate-800 truncate max-w-[65px]">
                        {item.product.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-red-600">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Haz láser infrarrojo simulado */}
              <div className="h-1 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444] opacity-80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de producto en el estante de góndola
interface RealShelfProductItemProps {
  product: Product;
  onDragStart: (e: React.DragEvent, p: Product) => void;
  onClick: () => void;
  isActive: boolean;
}

const RealShelfProductItem: React.FC<RealShelfProductItemProps> = ({
  product,
  onDragStart,
  onClick,
  isActive,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, product)}
      onClick={onClick}
      className={`group bg-white border-2 rounded-xl p-1.5 flex flex-col items-center justify-between transition-all duration-150 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-1 ${
        isActive
          ? 'border-red-500 ring-2 ring-red-300 bg-red-50/50'
          : 'border-slate-300 hover:border-slate-800'
      }`}
      title={`Arrastrá al carrito o hacé click para escanear ${product.name}`}
    >
      {/* Icono del envase */}
      <div className="h-10 flex items-center justify-center">
        <ProductSketchIcon type={product.iconType} className="w-8 h-8" />
      </div>

      {/* Nombre */}
      <div className="w-full text-center mt-1">
        <span className="text-[10px] font-bold text-slate-800 truncate block leading-tight">
          {product.name.split(' ')[0]}
        </span>
        <span className="text-[8px] text-slate-500 block truncate">
          {product.brand}
        </span>
      </div>

      {/* Etiqueta de precio tipo góndola de supermercado */}
      <div className="mt-1 w-full bg-yellow-300 border border-yellow-500 rounded px-1 py-0.5 text-center shadow-2xs">
        <span className="text-[10px] font-black text-slate-900 font-mono">
          ${product.price.toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  );
};
