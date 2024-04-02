export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
};

// quiero extender de guitar

//Pick
//Es para utilizar solamente el id, el name, el image en mi nuevo type
// export type CartItem1 = Pick<Guitar, "id" | "name" | "image"> & {
//   quantity: number;
// };

//Omit
//Es para no utilizar solamente el id, el name, el image y las otras propeidades si serian utilizadas de Guitaren mi nuevo type
// export type CartItem2 = Omit<Guitar, "id" | "name" | "image"> & {
//   quantity: number;
// };

export type CartItem = Guitar & {
  quantity: number;
};

// export type GuitarID = Pick<Guitar, "id">;
