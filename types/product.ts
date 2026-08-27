export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category?: string;
  colors?: string[];
  specs?: Record<string, string>;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

