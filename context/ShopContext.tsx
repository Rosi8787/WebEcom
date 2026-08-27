'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '@/types/product';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'error';
  image?: string;
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error', image?: string) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopcart_cart_items';
const WISHLIST_STORAGE_KEY = 'shopcart_wishlist_items';

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Failed to load storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart, isLoaded]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist, isLoaded]);

  // Toast handler
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success', image?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type, image }]);
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  // Cart Handlers
  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedColor?: string) => {
      setCart((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === selectedColor
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += quantity;
          return updated;
        }
        return [...prev, { product, quantity, selectedColor }];
      });
      showToast('Added to Bag', product.name, 'success', product.image);
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist Handlers
  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          showToast('Removed from Wishlist', product.name, 'info');
          return prev.filter((p) => p.id !== product.id);
        } else {
          showToast('Added to Wishlist', product.name, 'success', product.image);
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
