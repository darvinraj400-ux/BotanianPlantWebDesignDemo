import { useState, useEffect, useCallback } from 'react';
import { Plant } from '../data/plants';

export interface CartItem {
  plant: Plant;
  quantity: number;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useStore() {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('fern-fable-cart', []));
  const [favorites, setFavorites] = useState<string[]>(() => loadFromStorage('fern-fable-favorites', []));

  useEffect(() => {
    localStorage.setItem('fern-fable-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fern-fable-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback((plant: Plant) => {
    setCart(prev => {
      const existing = prev.find(item => item.plant.id === plant.id);
      if (existing) {
        return prev.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { plant, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((plantId: string) => {
    setCart(prev => prev.filter(item => item.plant.id !== plantId));
  }, []);

  const updateQuantity = useCallback((plantId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.plant.id !== plantId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.plant.id === plantId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = useCallback((plantId: string) => {
    setFavorites(prev =>
      prev.includes(plantId)
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    );
  }, []);

  const isFavorite = useCallback((plantId: string) => {
    return favorites.includes(plantId);
  }, [favorites]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartCount,
    favorites,
    toggleFavorite,
    isFavorite
  };
}
