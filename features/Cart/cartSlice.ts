import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartInterface, Product} from '../../types/types';

const initialState: CartInterface = {products: [], total: 0};

const getItemIndex = (state: Product[], idToFind: number): number => {
  const ids = state.map(item => item.productID);
  return ids.indexOf(idToFind);
};

const calculateTotal = (state: CartInterface): void => {
  const total = state.products
    .reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0)
    .toFixed(2);

  state.total = parseInt(total);
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addItemToCart: (state: CartInterface, action: PayloadAction<Product>) => {
      const itemIndex = getItemIndex(state.products, action.payload.productID);
      if (itemIndex && itemIndex < 0) state.products.push(action.payload);
      else {
        state.products[itemIndex].productQuantity =
          state.products[itemIndex].productQuantity +
          action.payload.productQuantity;
      }
      calculateTotal(state);
    },
    itemCount: (state: {products: string | any[]}, action: any) => {
      state.products.length;
    },
    incrementQuantity: (
      state: CartInterface,
      action: {payload: {productID: number}},
    ) => {
      const itemIndex = getItemIndex(state.products, action.payload.productID);
      state.products[itemIndex].productQuantity += 1;
      calculateTotal(state);
    },
    decrementQuantity: (
      state: CartInterface,
      action: {payload: {productID: number}},
    ) => {
      const itemIndex = getItemIndex(state.products, action.payload.productID);
      if (state.products[itemIndex].productQuantity < 2) {
        state.products.splice(itemIndex, 1);
      } else state.products[itemIndex].productQuantity -= 1;
      calculateTotal(state);
    },
    removeItem: (state: CartInterface, action: PayloadAction<Product>) => {
      const itemIndex = getItemIndex(state.products, action.payload.productID);
      state.products.splice(itemIndex, 1);
      calculateTotal(state);
    },
    clearCart: (state: CartInterface) => {
      state.products = [];
    },
  },
});

export const {
  addItemToCart,
  itemCount,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
