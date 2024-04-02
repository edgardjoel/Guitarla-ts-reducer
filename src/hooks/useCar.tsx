import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar } from "../types/type";
const useCar = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // State
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  // CONSTANTE DE MINIMA CANTIDAD
  const MIN_QUANTITY = 1;

  useEffect(() => {
    saveToLocalStorage();
  }, [cart]);

  // addToCart

  const addToCart = (item: Guitar) => {
    if (item?.stock <= 0) return;

    //validarExistenciaCart
    const itemExists = cart.findIndex((guitar) => guitar?.id === item?.id);

    if (itemExists >= 0) {
      //aumentar la cantidad de quantity de cart
      const updateCart = [...cart];
      if (updateCart[itemExists].quantity >= item.stock) return;
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };

      setCart([...cart, newItem]);
    }
  };
  //Eliminar carrito especifico
  const removeFromCart = (id: Guitar["id"]) => {
    // ACA SERIA MEJOR CON UN  FILTER
    const updateCart = cart.filter((guitar) => guitar?.id !== id);
    setCart(updateCart);
  };

  //aumentar la cantidad de quantity de cart
  const increaseQuantity = (id: Guitar["id"]) => {
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < guitar.stock) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      } else {
        return guitar;
      }
    });

    setCart(updateCart);
  };

  // disminuir la cantidad de quantity de cart
  const decreaseQuantity = (id: Guitar["id"]) => {
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      } else {
        return guitar;
      }
    });

    setCart(updateCart);
  };

  // vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // guardar en local storage

  const saveToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const calculeTotal = useMemo(
    () =>
      cart.reduce((acum, { price, quantity }) => acum + price * quantity, 0),
    [cart]
  );
  // no tiene stock en el item de guitarra actual

  const noStock = (guitar: Guitar) => guitar?.stock <= 0;

  return {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cart,
    data,
    isEmpty,
    calculeTotal,
    noStock,
  };
};

export default useCar;
