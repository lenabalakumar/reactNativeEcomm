import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/cartSlice';
import userReducer from '../features/User/userSlice';

export const store = configureStore({
  reducer: {cartReducer: cartReducer, userReducer: userReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
