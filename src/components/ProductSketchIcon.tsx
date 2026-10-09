import React from 'react';

interface ProductSketchIconProps {
  type: 'milk' | 'bread' | 'cookies' | 'pasta' | 'oil' | 'coffee' | 'soda' | 'cheese';
  className?: string;
}

export const ProductSketchIcon: React.FC<ProductSketchIconProps> = ({
  type,
  className = 'w-12 h-12',
}) => {
  switch (type) {
    case 'milk':
      // Sachet / Cartón de Leche (La Serenísima) - Blanco y Rojo
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="18" width="26" height="38" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M12 18L18 8H32L38 18" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="21" y="4" width="8" height="4" rx="1" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
          <circle cx="25" cy="34" r="7" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <path d="M25 29C23 31.5 21 33 21 35C21 37.2 22.8 39 25 39C27.2 39 29 37.2 29 35C29 33 27 31.5 25 29Z" fill="#DC2626" />
          <line x1="16" y1="48" x2="34" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <text x="25" y="24" fontSize="5" fontWeight="bold" fill="#DC2626" textAnchor="middle" fontFamily="sans-serif">LECHE</text>
        </svg>
      );

    case 'bread':
      // Pan Lactal - Bolsa con precinto
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 24C10 16 16 12 25 12C34 12 40 16 40 24V50C40 53 38 55 35 55H15C12 55 10 53 10 50V24Z" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M23 7L25 12L27 7" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="28" width="22" height="18" rx="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="1.5" fill="#B45309" />
          <circle cx="25" cy="19" r="1.5" fill="#B45309" />
          <circle cx="32" cy="20" r="1.5" fill="#B45309" />
          <text x="25" y="38" fontSize="5" fontWeight="bold" fill="#D97706" textAnchor="middle" fontFamily="sans-serif">PAN</text>
          <text x="25" y="43" fontSize="4" fill="#92400E" textAnchor="middle" fontFamily="sans-serif">LACTAL</text>
        </svg>
      );

    case 'cookies':
      // Galletitas Oreo - Paquete azul
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="34" height="24" rx="4" fill="#0284C7" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M8 20L4 26L8 32" stroke="#1E293B" strokeWidth="2" fill="#0369A1" />
          <path d="M42 20L46 26L42 32" stroke="#1E293B" strokeWidth="2" fill="#0369A1" />
          <circle cx="19" cy="32" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="31" cy="32" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="19" cy="32" r="3" fill="#FFFFFF" />
          <circle cx="31" cy="32" r="3" fill="#FFFFFF" />
          <text x="25" y="27" fontSize="5" fontWeight="black" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">OREO</text>
        </svg>
      );

    case 'pasta':
      // Fideos Matarazzo - Paquete verde
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="13" y="10" width="24" height="44" rx="2" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="17" y="22" width="16" height="20" rx="1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="20" y1="24" x2="20" y2="40" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="24" x2="25" y2="40" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="24" x2="30" y2="40" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="13" y="14" width="24" height="6" fill="#DC2626" />
          <text x="25" y="19" fontSize="4" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">FIDEOS</text>
        </svg>
      );

    case 'oil':
      // Aceite Natura - Botella amarilla
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="20" width="20" height="34" rx="3" fill="#FEF08A" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M21 20V12C21 10.5 22.5 9 25 9C27.5 9 29 10.5 29 12V20" fill="#FDE047" stroke="#1E293B" strokeWidth="2" />
          <rect x="22" y="5" width="6" height="4" rx="1" fill="#15803D" stroke="#1E293B" strokeWidth="1.5" />
          <rect x="17" y="30" width="16" height="14" rx="1" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
          <circle cx="25" cy="36" r="3" fill="#EAB308" />
          <text x="25" y="42" fontSize="3.5" fontWeight="bold" fill="#15803D" textAnchor="middle" fontFamily="sans-serif">NATURA</text>
        </svg>
      );

    case 'coffee':
      // Café Dolca - Frasco marrón
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="18" width="22" height="36" rx="3" fill="#78350F" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="17" y="10" width="16" height="8" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
          <rect x="16" y="26" width="18" height="18" rx="1" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1" />
          <ellipse cx="25" cy="33" rx="3" ry="4" fill="#451A03" />
          <text x="25" y="41" fontSize="4" fontWeight="bold" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">DOLCA</text>
        </svg>
      );

    case 'soda':
      // Gaseosa Coca-Cola - Botella roja
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 20C17 15 20 13 22 10H28C30 13 33 15 33 20V50C33 53 30 55 28 55H22C20 55 17 53 17 50V20Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="23" y="6" width="4" height="4" rx="1" fill="#DC2626" stroke="#1E293B" strokeWidth="1.5" />
          <rect x="17" y="27" width="16" height="12" fill="#FFFFFF" stroke="#991B1B" strokeWidth="1" />
          <path d="M19 33C22 33 24 35 29 32" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <text x="25" y="32" fontSize="3" fontWeight="black" fill="#DC2626" textAnchor="middle" fontFamily="sans-serif">COCA</text>
        </svg>
      );

    case 'cheese':
      // Queso Cremoso - Envoltorio naranja
      return (
        <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 44L38 44C40 44 41 42 40 40L34 22C33 20 30 20 28 21L10 30C8.5 31 8 33 8 35V44Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="20" cy="37" r="2" fill="#D97706" />
          <circle cx="28" cy="34" r="2" fill="#D97706" />
          <circle cx="33" cy="38" r="1.5" fill="#D97706" />
          <text x="22" y="42" fontSize="4" fontWeight="bold" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">QUESO</text>
        </svg>
      );

    default:
      return null;
  }
};
