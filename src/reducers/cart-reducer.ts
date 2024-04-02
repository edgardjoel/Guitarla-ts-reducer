import { db } from "../data/db";
import { CartItem, Guitar } from "../types/type";

export type CartActions =
  | { type: "addToCart"; payload: { item: Guitar } }
  | { type: "removeFromCart"; payload: { id: Guitar["id"] } }
  | { type: "decreaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "increaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "clearCart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

// CONSTANTE DE MINIMA CANTIDAD
const MIN_QUANTITY = 1;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "addToCart") {
    // if (action?.payload?.item?.stock <= 0) return;

    //validarExistenciaCart
    const itemExists = state?.cart.find(
      (guitar) => guitar?.id === action?.payload?.item?.id
    );

    let updateCart: CartItem[] = [];
    if (itemExists) {
      //aumentar la cantidad de quantity de cart
      updateCart = state.cart.map((item) => {
        if (item.id === action?.payload?.item?.id) {
          if (item.quantity < action?.payload?.item?.stock) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action?.payload?.item, quantity: 1 };

      updateCart = [...state?.cart, newItem];
    }

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "removeFromCart") {
    const updateCart = state?.cart.filter(
      (guitar) => guitar?.id !== action?.payload?.id
    );
    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "decreaseQuantity") {
    const updateCart = state.cart.map((guitar) => {
      if (guitar.id === action.payload.id && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      } else {
        return guitar;
      }
    });

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "increaseQuantity") {
    const updateCart = state?.cart.map((guitar) => {
      if (guitar.id === action.payload.id && guitar.quantity < guitar.stock) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      } else {
        return guitar;
      }
    });

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (action.type === "clearCart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
