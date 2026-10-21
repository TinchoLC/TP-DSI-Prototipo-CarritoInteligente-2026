import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { SUPERMARKET_PRODUCTS } from '../data/products';
import { ProductSketchIcon } from './ProductSketchIcon';
import { ShoppingCart, ArrowRight } from 'lucide-react';

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

      {/* CABECERA: CARTEL DE SUPERMERCADO REAL */}
      <div className="relative z-10 bg-white/95 border-b-2 border-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[10px] sm:text-xs rounded tracking-wider">
            PASILLO 4
          </span>
          <span className="font-extrabold text-slate-800 text-xs sm:text-sm truncate">
            GÓNDOLA DE ALIMENTOS Y BEBIDAS
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold hidden md:flex items-center gap-1">
          <span>Mundo Real (Simulación Física)</span>
        </div>
      </div>

      {/* SECCIÓN 1: GÓNDOLA CON PRODUCTOS REALES EN ESTANTES */}
      <div className="relative z-10 p-2 sm:p-3 flex flex-col gap-2 sm:gap-3">
        {/* ESTANTE 1 */}
        <div className="bg-white/90 backdrop-blur-xs border-2 border-slate-300 rounded-2xl p-2 sm:p-2.5 shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Estante Superior</span>
            <span className="text-red-600 font-semibold text-[9px] sm:text-[10px]">Tocá o arrastrá para escanear ↓</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
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
          <div className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 bg-red-600 rounded-full" />
        </div>

        {/* ESTANTE 2 */}
        <div className="bg-white/90 backdrop-blur-xs border-2 border-slate-300 rounded-2xl p-2 sm:p-2.5 shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Estante Inferior</span>
            <span className="text-slate-400 text-[9px] sm:text-[10px]">Precios en góndola</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
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
          <div className="mt-1 sm:mt-1.5 h-1 sm:h-1.5 bg-red-600 rounded-full" />
        </div>
      </div>

      {/* SECCIÓN 2: EL CARRITO DE SUPERMERCADO REAL Y EL ESCÁNER EN EL PASILLO */}
      <div className="relative z-10 px-2 sm:px-4 pb-2 sm:pb-3 flex-1 flex flex-col justify-end">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-white/95 backdrop-blur-sm border-2 sm:border-3 rounded-2xl p-2 sm:p-3 transition-all duration-200 shadow-xl ${
            isDragOverCart
              ? 'border-red-500 ring-4 ring-red-400/40 scale-[1.02] bg-red-50/90'
              : 'border-slate-800'
          }`}
        >
          {/* Encabezado del Carrito en el Pasillo */}
          <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-slate-200">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />
              <div>
                <strong className="text-[11px] sm:text-xs font-black text-slate-800 block">
                  Carrito de Supermercado
                </strong>
                <span className="text-[9px] sm:text-[10px] text-slate-500 block">
                  Tablet y Escáner Infrarrojo
                </span>
              </div>
            </div>

            {/* Pantallita pequeña en el carrito con indicador de Zoom */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                id="cart-tablet-mini"
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-900 text-white rounded-md border border-red-500 shadow-sm flex items-center gap-1 animate-pulse"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" />
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-red-400">
                  TABLET #14
                </span>
              </div>

              {/* Conector / Flecha hacia la derecha (desktop) o abajo (celular) */}
              <div className="flex items-center text-red-600 font-extrabold text-[10px] sm:text-[11px]">
                <span className="hidden sm:inline">Ver zoom</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 hidden lg:inline" />
                <span className="lg:hidden ml-0.5 text-xs font-black animate-bounce">↓</span>
              </div>
            </div>
          </div>

          {/* CUERPO DEL CARRITO: FOTO DEL CARRITO + FOTO DEL ESCÁNER A LA DERECHA + ZONA DE ESCÁNER NEGRA CON LÍNEA ROJA EN MEDIO */}
          <div className="mt-1.5 sm:mt-2 grid grid-cols-12 gap-1.5 sm:gap-2.5 items-center">
            {/* Izquierda: Foto del carrito de supermercado real */}
            <div className="col-span-4 relative h-24 sm:h-32 flex items-center justify-center bg-slate-100 rounded-xl overflow-hidden border border-slate-300">
              <img
                src="/images/shopping_cart.jpg"
                alt="Carrito de supermercado"
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <div className="absolute top-1 left-1 px-1 sm:px-1.5 py-0.5 bg-slate-900/80 text-white text-[8px] sm:text-[9px] font-mono rounded">
                Carrito
              </div>
            </div>

            {/* A la derecha del carrito: Foto del lector de código de barras */}
            <div className="col-span-3 relative h-24 sm:h-32 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-slate-300">
              <img
                src="/images/barcode_scanner.png"
                alt="Lector de código de barras"
                className="w-full h-full object-contain p-0.5 sm:p-1"
              />
              <div className="absolute top-1 left-1 px-1 sm:px-1.5 py-0.5 bg-slate-900/80 text-white text-[8px] sm:text-[9px] font-mono rounded">
                Lector
              </div>
            </div>

            {/* Parte del escáner: Negra con la línea roja en medio */}
            <div className="col-span-5 h-24 sm:h-32 bg-black border-2 border-red-600 rounded-xl p-1.5 sm:p-2 flex flex-col justify-between overflow-hidden relative shadow-inner">
              {/* Línea roja láser en el medio exacto */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-red-600 shadow-[0_0_14px_#ef4444,0_0_6px_#dc2626] z-10 pointer-events-none animate-pulse" />

              <div className="relative z-20 flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-300">
                <span className="text-red-500 font-mono uppercase tracking-wider text-[8px] sm:text-[10px]">Escáner</span>
                <span className="bg-red-600 text-white px-1 sm:px-1.5 py-0.2 rounded font-mono text-[8px] sm:text-[9px]">
                  {totalItemCount} {totalItemCount === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>

              {/* Items escaneados o instrucción */}
              {cartItems.length === 0 ? (
                <div className="relative z-20 flex-1 flex flex-col items-center justify-between py-0.5 sm:py-1 text-center pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-bold text-red-400">
                    ↓↓ Soltá el producto acá ↓↓
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-slate-400">
                    Pasar por el láser rojo
                  </span>
                </div>
              ) : (
                <div className="relative z-20 flex-1 overflow-y-auto flex flex-wrap gap-1 content-start p-0.5 sm:p-1 max-h-16 sm:max-h-20">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-1 bg-slate-900/90 border border-slate-700 rounded px-1 sm:px-1.5 py-0.5 shadow-2xs"
                    >
                      <ProductSketchIcon
                        type={item.product.iconType}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                      />
                      <span className="text-[8px] sm:text-[9px] font-semibold text-white truncate max-w-[45px] sm:max-w-[55px]">
                        {item.product.name.split(' ')[0]}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold text-red-400">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative z-20 text-[8px] sm:text-[9px] text-center text-slate-500 font-mono">
                LÁSER INFRARROJO
              </div>
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
      className={`group bg-white border sm:border-2 rounded-xl p-1 sm:p-1.5 flex flex-col items-center justify-between transition-all duration-150 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 sm:hover:-translate-y-1 touch-manipulation ${
        isActive
          ? 'border-red-500 ring-2 ring-red-300 bg-red-50/50'
          : 'border-slate-300 hover:border-slate-800'
      }`}
      title={`Tocá o arrastrá para escanear ${product.name}`}
    >
      {/* Icono del envase */}
      <div className="h-7 sm:h-10 flex items-center justify-center">
        <ProductSketchIcon type={product.iconType} className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>

      {/* Nombre */}
      <div className="w-full text-center mt-0.5 sm:mt-1">
        <span className="text-[8px] sm:text-[10px] font-bold text-slate-800 truncate block leading-tight">
          {product.name.split(' ')[0]}
        </span>
        <span className="text-[7px] sm:text-[8px] text-slate-500 block truncate">
          {product.brand}
        </span>
      </div>

      {/* Etiqueta de precio tipo góndola de supermercado */}
      <div className="mt-0.5 sm:mt-1 w-full bg-yellow-300 border border-yellow-500 rounded px-0.5 sm:px-1 py-0.5 text-center shadow-2xs">
        <span className="text-[8px] sm:text-[10px] font-black text-slate-900 font-mono">
          ${product.price.toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  );
};
