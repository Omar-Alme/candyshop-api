import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductDataProps } from "../types";

interface CartState {
    products: ExtendedProductDataProps[];
    cartquantity: number;
    subtotal: number;
    total: number;
    deliverycharges: number;
}

interface ExtendedProductDataProps extends ProductDataProps {
    quantity: number;
    subtotal: number;
    total: number;
}


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartquantity: 0,
        subtotal: 0,
        total: 0,
        deliverycharges: 0,
    } as CartState,

    reducers: {
        addProduct: (state, action: PayloadAction<ExtendedProductDataProps>) => {
            const { id, quantity, price } = action.payload;
            const existingProductIndex = state.products.findIndex(
                (product) => product.id === id
            );

            if (existingProductIndex !== -1) {
                // if the same product id already exists, just update the quanitty
                state.products[existingProductIndex].quantity += quantity;
                state.products[existingProductIndex].subtotal =
                    price * state.products[existingProductIndex].quantity;
            } else {
                // If its a new product with different id, just addd it to the products array
                const newProduct = {
                    ...action.payload,
                    subtotal: price * quantity,
                };
                state.products.push(newProduct);
            }

            // update quanity and subtotal
            state.cartquantity = state.products.reduce(
                (acc, product) => acc + product.quantity,
                0
            );
            state.subtotal = state.products.reduce(
                (acc, product) => acc + product.subtotal,
                0
            );

            state.deliverycharges = state.subtotal < 2500 ? 200 : 0;
            state.total = state.subtotal + state.deliverycharges;
        },
        updateProductQuantity: (
            state,
            action: PayloadAction<{
                id: number;
                quantity: number;
            }>
        ) => {
            const { id, quantity } = action.payload;
            const productIndex = state.products.findIndex((p) => p.id === id);

            if (productIndex !== -1) {
                state.products[productIndex].quantity = quantity;
                state.products[productIndex].subtotal =
                  state.products[productIndex].price * quantity;
              }

           // Update overall quantity and subtotal
      state.cartquantity = state.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      state.subtotal = state.products.reduce(
        (acc, product) => acc + product.subtotal,
        0
      );

      state.deliverycharges = state.subtotal < 2500 ? 200 : 0;
      state.total = state.subtotal + state.deliverycharges;
    },
    removeProduct: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      const { id } = action.payload;

      // Find the index of the product to remove
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);

        state.cartquantity = state.products.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        state.subtotal = state.products.reduce(
          (acc, product) => acc + product.subtotal,
          0
        );

        state.deliverycharges = state.subtotal < 2500 ? 200 : 0;
        state.total = state.subtotal + state.deliverycharges;
      }
    },
    clearCart: () => {
      return {
        products: [],
        cartquantity: 0,
        subtotal: 0,
        total: 0,
        deliverycharges: 0,
      };
    },
  },
});

export const {
    addProduct,
    updateProductQuantity,
    removeProduct,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;