import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { SUPERMARKET_PRODUCTS } from '../data/products';
import { ProductSketchIcon } from './ProductSketchIcon';
import { ShoppingCart } from 'lucide-react';

interface AisleSceneProps {
  cartItems: CartItem[];
  onScanProduct: (product: Product) => void;
  activeProductId?: string | null;
}

export const AisleScene: React.FC<AisleSceneProps> = ({
  cartItems,
  onScanProduct,
  activeProductId,
}) => {
  const [isDragOverCart, setIsDragOverCart] = useState(false);

  // Dividir los 8 productos: 4 en la góndola izquierda y 4 en la góndola derecha
  const leftShelfProducts = SUPERMARKET_PRODUCTS.slice(0, 4);
  const rightShelfProducts = SUPERMARKET_PRODUCTS.slice(4, 8);

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
      console.error('Error al soltar producto', err);
    }
  };

  return (
    <div className="relative w-full h-full bg-white border-2 border-slate-300 rounded-3xl p-4 shadow-sm flex flex-col justify-between select-none overflow-hidden">
      {/* Título de la escena */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
            Pasillo del Supermercado (Góndolas y Carrito)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          Arrastrá productos al carrito
        </span>
      </div>

      {/* Vista del Pasillo: Góndola Izquierda, Carrito Central, Góndola Derecha */}
      <div className="flex-1 grid grid-cols-12 gap-2 my-2 relative items-center">
        {/* ================= GÓNDOLA IZQUIERDA (Col 1-4) ================= */}
        <div className="col-span-4 flex flex-col h-full justify-around pr-1 relative border-r-4 border-slate-800 bg-slate-50/50 rounded-l-2xl p-2">
          {/* Cartelito Góndola */}
          <div className="text-[11px] font-bold text-slate-700 bg-white border border-slate-300 px-2 py-0.5 rounded text-center shadow-xs">
            Góndola 1 · Lácteos y Almacén
          </div>

          {/* Estante 1 */}
          <div className="flex flex-col">
            <div className="flex justify-around items-end gap-1 pb-1">
              {leftShelfProducts.slice(0, 2).map((prod) => (
                <ProductCardItem
                  key={prod.id}
                  product={prod}
                  onDragStart={handleDragStart}
                  onClick={() => onScanProduct(prod)}
                  isActive={activeProductId === prod.id}
                />
              ))}
            </div>
            {/* Tabla de madera/metal del estante */}
            <div className="h-3 bg-slate-300 border-t-2 border-b-2 border-slate-800 rounded-xs shadow-xs" />
          </div>

          {/* Estante 2 */}
          <div className="flex flex-col">
            <div className="flex justify-around items-end gap-1 pb-1">
              {leftShelfProducts.slice(2, 4).map((prod) => (
                <ProductCardItem
                  key={prod.id}
                  product={prod}
                  onDragStart={handleDragStart}
                  onClick={() => onScanProduct(prod)}
                  isActive={activeProductId === prod.id}
                />
              ))}
            </div>
            {/* Tabla del estante */}
            <div className="h-3 bg-slate-300 border-t-2 border-b-2 border-slate-800 rounded-xs shadow-xs" />
          </div>
        </div>

        {/* ================= CARRITO EN EL PASILLO (Col 5-8) ================= */}
        <div className="col-span-4 flex flex-col items-center justify-center relative px-1">
          {/* El Carrito Ilustrado Interactivo */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative w-full max-w-[210px] bg-white border-2 rounded-2xl p-2.5 transition-all duration-200 cursor-pointer shadow-md ${
              isDragOverCart
                ? 'border-red-500 ring-4 ring-red-100 scale-105 bg-red-50/30'
                : 'border-slate-800 hover:border-slate-900'
            }`}
          >
            {/* Soporte de Manija y Pantalla Pequeña */}
            <div className="flex items-center justify-between pb-1.5 border-b border-dashed border-slate-300">
              {/* Manija izquierda */}
              <div className="w-4 h-2 bg-slate-700 rounded-full" />

              {/* Pantallita montada en el carrito */}
              <div
                id="cart-screen-anchor"
                className="relative px-2 py-1 bg-white border-2 border-red-500 rounded-md shadow-xs flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-red-600 font-mono tracking-tighter">
                  PANTALLA TÁCTIL
                </span>
                {/* Haz infrarrojo proyectado hacia la canasta */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-500 opacity-80 animate-pulse" />
              </div>

              {/* Manija derecha */}
              <div className="w-4 h-2 bg-slate-700 rounded-full" />
            </div>

            {/* Canasta de alambre del carrito (Grid de alambres estilo dibujo) */}
            <div className="my-2 h-28 bg-slate-50 border-2 border-slate-800 rounded-xl relative p-1.5 overflow-hidden flex flex-col justify-end">
              {/* Rejilla metálica de fondo (cuadrícula) */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #000 1.5px, transparent 1.5px), linear-gradient(to bottom, #000 1.5px, transparent 1.5px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Productos adentro del carrito */}
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-1 text-slate-400 z-10">
                  <ShoppingCart className="w-6 h-6 stroke-1.5 text-slate-400 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-600">
                    Soltá acá
                  </span>
                  <span className="text-[9px] text-slate-400">
                    el producto
                  </span>
                </div>
              ) : (
                <div className="z-10 flex flex-wrap gap-1 items-end max-h-24 overflow-y-auto p-0.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-0.5 bg-white border border-slate-800 rounded px-1 py-0.5 shadow-2xs"
                      title={`${item.product.name} (x${item.quantity})`}
                    >
                      <ProductSketchIcon
                        type={item.product.iconType}
                        className="w-4 h-4"
                      />
                      <span className="text-[9px] font-bold text-slate-800 font-mono">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ruedas y base del carrito */}
            <div className="flex justify-between px-3 pt-0.5">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-400" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-400" />
            </div>

            {/* Indicador de soltar */}
            <div className="mt-1 text-center">
              <span className="text-[10px] font-semibold text-slate-600">
                {cartItems.length > 0
                  ? `${cartItems.reduce((acc, i) => acc + i.quantity, 0)} artículos adentro`
                  : 'Carrito listo'}
              </span>
            </div>
          </div>
        </div>

        {/* ================= GÓNDOLA DERECHA (Col 9-12) ================= */}
        <div className="col-span-4 flex flex-col h-full justify-around pl-1 relative border-l-4 border-slate-800 bg-slate-50/50 rounded-r-2xl p-2">
          {/* Cartelito Góndola */}
          <div className="text-[11px] font-bold text-slate-700 bg-white border border-slate-300 px-2 py-0.5 rounded text-center shadow-xs">
            Góndola 2 · Bebidas y Aceites
          </div>

          {/* Estante 1 */}
          <div className="flex flex-col">
            <div className="flex justify-around items-end gap-1 pb-1">
              {rightShelfProducts.slice(0, 2).map((prod) => (
                <ProductCardItem
                  key={prod.id}
                  product={prod}
                  onDragStart={handleDragStart}
                  onClick={() => onScanProduct(prod)}
                  isActive={activeProductId === prod.id}
                />
              ))}
            </div>
            {/* Tabla del estante */}
            <div className="h-3 bg-slate-300 border-t-2 border-b-2 border-slate-800 rounded-xs shadow-xs" />
          </div>

          {/* Estante 2 */}
          <div className="flex flex-col">
            <div className="flex justify-around items-end gap-1 pb-1">
              {rightShelfProducts.slice(2, 4).map((prod) => (
                <ProductCardItem
                  key={prod.id}
                  product={prod}
                  onDragStart={handleDragStart}
                  onClick={() => onScanProduct(prod)}
                  isActive={activeProductId === prod.id}
                />
              ))}
            </div>
            {/* Tabla del estante */}
            <div className="h-3 bg-slate-300 border-t-2 border-b-2 border-slate-800 rounded-xs shadow-xs" />
          </div>
        </div>
      </div>

      {/* Pie instructivo */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>💡 Arrastrá cualquier producto al carrito para abrir el escáner.</span>
        <span className="font-semibold text-slate-700">8 productos en góndola</span>
      </div>
    </div>
  );
};

// Item individual en el estante de la góndola
interface ProductCardItemProps {
  product: Product;
  onDragStart: (e: React.DragEvent, p: Product) => void;
  onClick: () => void;
  isActive: boolean;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({
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
      className={`group flex flex-col items-center bg-white border-2 rounded-xl p-1.5 transition-all duration-150 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-1 ${
        isActive
          ? 'border-red-500 ring-2 ring-red-200 bg-red-50/20'
          : 'border-slate-800 hover:border-slate-900'
      }`}
      style={{ width: '84px' }}
      title={`Arrastrar o clickear para escanear ${product.name}`}
    >
      {/* Icono dibujo del producto */}
      <div className="h-12 flex items-center justify-center">
        <ProductSketchIcon type={product.iconType} className="w-10 h-10" />
      </div>

      {/* Nombre */}
      <span className="text-[10px] font-bold text-slate-800 text-center leading-tight line-clamp-1 mt-1">
        {product.name.split(' ')[0]}
      </span>

      {/* Precio estilo etiqueta de góndola de Coto/Carrefour */}
      <div className="mt-1 px-1.5 py-0.5 bg-red-600 text-white rounded font-mono font-black text-[10px] shadow-2xs">
        ${product.price.toLocaleString('es-AR')}
      </div>
    </div>
  );
};
