import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === producto.id);
      if (existing) {
        if (existing.quantity >= producto.stock) {
          alert(`No puedes añadir más de ${producto.stock} unidades.`);
          return prev;
        }
        return prev.map((p) =>
          p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  const changeQuantity = (id, delta, stock) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? {
                ...p,
                quantity: Math.max(1, Math.min(p.quantity + delta, stock)),
              }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const deleteFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, changeQuantity, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}