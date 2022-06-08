import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Address, User} from '../../types/types';

const initialState: User = {
  userName: 'Bob',
  userPhone: '8133406346',
  userEmail: 'bob@alice.com',
  userAddress: {
    addressLine1: '18215 Bridle club drive',
    addressLine2: '',
    addressLandmark: '',
    city: 'Tampa',
    state: 'Florida',
    pincode: '33647',
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    addUser: (state: User, action: PayloadAction<User>) => {
      state.userAddress = action.payload.userAddress;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
