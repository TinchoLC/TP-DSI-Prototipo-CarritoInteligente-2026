export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  barcode: string;
  weightOrVolume: string;
  badge?: string;
  color: string;
  iconType: 'milk' | 'bread' | 'cookies' | 'pasta' | 'oil' | 'coffee' | 'soda' | 'cheese';
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
  addedAt: Date;
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: string;
  discountPercentage: number;
  description: string;
}
