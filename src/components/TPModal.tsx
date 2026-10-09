import React from 'react';
import { X, BookOpen, Users, Lightbulb, Target } from 'lucide-react';

interface TPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TPModal: React.FC<TPModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-100 text-red-600 border border-red-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                TP DT - IDEAR · Prototipo DSI
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Diseño de Sistemas de Información
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Integrantes */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-slate-600" />
            <span>Integrantes:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Cabrera Martín', 'Corbella Leonardo', 'Grieco Giuliana', 'Squarzon Nicolás'].map(
              (name) => (
                <span
                  key={name}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 shadow-2xs"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* Ficha Design Thinking */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <Target className="w-4 h-4" />
            <span>Ficha de Diseño</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-white p-2 rounded-lg border border-amber-200">
              <strong className="text-amber-800 block">Momento:</strong>
              <span>Selección de artículos</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200">
              <strong className="text-amber-800 block">Segmento:</strong>
              <span>Cliente, Laura</span>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg border border-amber-200">
            <strong className="text-amber-800 block">Necesidad:</strong>
            <span>
              Quiere saber cuánto lleva gastado, qué medio de pago le conviene y cuánto gasta en cada billetera.
            </span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-amber-200">
            <strong className="text-amber-800 block">Solución Bocetada:</strong>
            <span>
              Carrito con lector infrarrojo y pantalla táctil que muestra en tiempo real el listado de productos, cantidades, precios y total a pagar.
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
