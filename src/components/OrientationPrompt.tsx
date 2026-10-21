import React from 'react';
import { Smartphone, RotateCw } from 'lucide-react';

export const OrientationPrompt: React.FC = () => {
  return (
    <aside
      aria-label="Aviso de orientación horizontal"
      className="hidden max-md:portrait:flex fixed inset-0 z-[100] bg-slate-950/95 text-white flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md"
    >
      <div className="relative mb-6">
        {/* Celular rotando a horizontal */}
        <div className="relative w-20 h-32 border-4 border-white/80 rounded-2xl flex items-center justify-center shadow-2xl animate-[spin_3s_ease-in-out_infinite]">
          <Smartphone className="w-10 h-10 text-red-500" />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-600 rounded-full p-2 animate-bounce">
          <RotateCw className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="max-w-xs space-y-2">
        <span className="inline-block px-3 py-1 bg-red-600 text-white font-black text-[11px] uppercase tracking-widest rounded-full">
          Girá tu teléfono
        </span>
        <h2 className="text-xl font-black text-white tracking-tight">
          Modo Horizontal Requerido
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Para ver la simulación completa (el pasillo del supermercado a la izquierda y el zoom a la tablet a la derecha), por favor colocá tu celular de forma horizontal (Landscape).
        </p>
      </div>

      <div className="mt-6 text-[11px] font-mono text-slate-400 border border-slate-800 bg-slate-900/60 px-3 py-1.5 rounded-lg">
        ↺ Rotar pantalla
      </div>
    </aside>
  );
};
