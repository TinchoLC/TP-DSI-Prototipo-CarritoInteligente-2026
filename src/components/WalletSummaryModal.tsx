import React from 'react';
import { X, Wallet, CreditCard, Banknote, Sparkles } from 'lucide-react';

interface WalletSummaryModalProps {
  total: number;
  isOpen: boolean;
  onClose: () => void;
}

export const WalletSummaryModal: React.FC<WalletSummaryModalProps> = ({
  total,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const paymentMethods = [
    {
      name: 'Mercado Pago',
      badge: '10% OFF hoy',
      color: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
      discount: 0.10,
      note: 'Tope de reintegro $2.500',
      icon: Wallet,
    },
    {
      name: 'Modo (Banco Nación)',
      badge: '20% OFF Reintegro',
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      discount: 0.20,
      note: 'Pagando con código QR',
      icon: Sparkles,
    },
    {
      name: 'Cuenta DNI',
      badge: '15% Especial',
      color: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
      discount: 0.15,
      note: 'Válido de Lunes a Jueves',
      icon: CreditCard,
    },
    {
      name: 'Efectivo / Débito',
      badge: 'Precio Regular',
      color: 'bg-slate-700/30 border-slate-600 text-slate-300',
      discount: 0.0,
      note: 'Sin descuento adicional',
      icon: Banknote,
    },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 animate-pop">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Distribución en Billeteras & Promos
              </h3>
              <p className="text-xs text-slate-400">
                Responde a la necesidad de Laura (Design Thinking)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Total General */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span className="text-sm text-slate-300">Total acumulado de compra:</span>
          <span className="text-xl font-black text-white font-mono">
            ${total.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Lista de billeteras */}
        <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
          {paymentMethods.map((pm, idx) => {
            const finalAmount = total * (1 - pm.discount);
            const savings = total * pm.discount;
            const Icon = pm.icon;

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:bg-slate-800 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${pm.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-100">
                        {pm.name}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${pm.color}`}>
                        {pm.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{pm.note}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    ${Math.round(finalAmount).toLocaleString('es-AR')}
                  </div>
                  {savings > 0 && (
                    <div className="text-[10px] text-emerald-300">
                      Ahorrás: ${Math.round(savings).toLocaleString('es-AR')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
