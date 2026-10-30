export interface CartItem {
  id: string; // unique cart item id
  type: 'ready' | 'custom';
  title: string;
  subtitle?: string;
  image?: string;
  price: number;
  quantity: number;
  details?: string;
}
