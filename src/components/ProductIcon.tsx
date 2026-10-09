import React from 'react';

interface ProductIconProps {
  type: 'milk' | 'bread' | 'cookies' | 'pasta' | 'oil' | 'coffee' | 'soda' | 'cheese';
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ type, className = 'w-10 h-10' }) => {
  switch (type) {
    case 'milk':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="16" width="20" height="26" rx="3" fill="#F8FAFC" stroke="#DC2626" strokeWidth="2.5" />
          <path d="M14 16L18 8H30L34 16" fill="#EF4444" stroke="#DC2626" strokeWidth="2.5" />
          <rect x="20" y="5" width="8" height="3" rx="1" fill="#DC2626" />
          <circle cx="24" cy="27" r="5" fill="#DC2626" />
          <path d="M24 24C22.5 26 21 27.5 21 29C21 30.65 22.35 32 24 32C25.65 32 27 30.65 27 29C27 27.5 25.5 26 24 24Z" fill="#FFFFFF" />
          <path d="M17 38H31" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'bread':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 22C10 16 14 12 24 12C34 12 38 16 38 22V36C38 39 36 41 33 41H15C12 41 10 39 10 36V22Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
          <path d="M10 24H38" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="15" y="27" width="18" height="10" rx="2" fill="#F59E0B" fillOpacity="0.4" />
          <circle cx="18" cy="19" r="1.5" fill="#B45309" />
          <circle cx="24" cy="18" r="1.5" fill="#B45309" />
          <circle cx="30" cy="19" r="1.5" fill="#B45309" />
          <path d="M22 8L24 12L26 8" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'cookies':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="16" width="32" height="18" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          <circle cx="18" cy="25" r="5" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1.5" />
          <circle cx="28" cy="25" r="5" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1.5" />
          <circle cx="18" cy="25" r="2.5" fill="#F8FAFC" />
          <circle cx="28" cy="25" r="2.5" fill="#F8FAFC" />
          <path d="M8 20L5 25L8 30" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 20L43 25L40 30" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'pasta':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="13" y="10" width="22" height="32" rx="3" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          <rect x="17" y="18" width="14" height="16" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="20" y2="32" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="32" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="20" x2="28" y2="32" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 15L35 15" stroke="#047857" strokeWidth="2" />
        </svg>
      );
    case 'oil':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="18" width="18" height="24" rx="4" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
          <path d="M20 18V12C20 10.5 21.5 9 24 9C26.5 9 28 10.5 28 12V18" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
          <rect x="21" y="6" width="6" height="3" rx="1" fill="#CA8A04" />
          <circle cx="24" cy="28" r="4.5" fill="#F59E0B" />
          <path d="M24 25L24 31M21 28L27 28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 37H33" stroke="#CA8A04" strokeWidth="1.5" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="15" width="20" height="26" rx="3" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <rect x="16" y="8" width="16" height="7" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <rect x="18" y="22" width="12" height="12" rx="2" fill="#FEF3C7" />
          <ellipse cx="24" cy="28" rx="3" ry="4" fill="#451A03" />
          <path d="M24 25C25 27 23 29 24 31" stroke="#FEF3C7" strokeWidth="1" />
        </svg>
      );
    case 'soda':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 18C17 14 19 12 21 10H27C29 12 31 14 31 18V38C31 40 29 42 27 42H21C19 42 17 40 17 38V18Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2.5" />
          <rect x="22" y="6" width="4" height="4" rx="1" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <rect x="17" y="24" width="14" height="10" fill="#FFFFFF" />
          <path d="M19 28C22 28 24 30 29 27" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'cheese':
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 36L38 36C40 36 41 34 40 32L34 16C33 14 30 14 28 15L10 24C8.5 25 8 27 8 29V36Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="20" cy="30" r="2.5" fill="#D97706" />
          <circle cx="28" cy="27" r="2" fill="#D97706" />
          <circle cx="34" cy="31" r="1.5" fill="#D97706" />
          <circle cx="26" cy="20" r="1.5" fill="#D97706" />
        </svg>
      );
    default:
      return null;
  }
};
