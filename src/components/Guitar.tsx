import { Dispatch, useMemo } from "react";
import type { Guitar } from "../types/type";
import type { CartActions } from "../reducers/cart-reducer";

type GuitarProps = {
  guitar: Guitar;
  dispatch: Dispatch<CartActions>;
  // addToCart: (guitar: Guitar) => void;
  // noStock: (guitar: Guitar) => boolean;
};
const Guitar = ({ guitar, dispatch }: GuitarProps) => {
  const { name, price, image, description, stock } = guitar || {};

  const noStock = useMemo(
    () => (guitar: Guitar) => guitar?.stock <= 0,
    [guitar]
  );

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name} </h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <p>Stock: {stock}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          disabled={noStock(guitar)}
          onClick={() => {
            if (noStock(guitar)) return;
            dispatch({ type: "addToCart", payload: { item: guitar } });
          }}
        >
          {noStock(guitar) ? "Agotado" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  );
};

export default Guitar;
