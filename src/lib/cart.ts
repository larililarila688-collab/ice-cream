import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class CartManager {
  private static instance: CartManager;
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  constructor() {
    this.loadFromStorage();
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    
    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveToStorage();
    this.notifyListeners();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clear(): void {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  private saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      this.items = [];
    }
  }
}

export const cart = CartManager.getInstance();