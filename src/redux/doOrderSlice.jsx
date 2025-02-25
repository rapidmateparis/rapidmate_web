import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: null,
};

const doOrderSlice = createSlice({
  name: 'orderdetails',
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.order = action.payload;
    },
    updateOrderDetails(state, action) {
      
        state.order = action.payload;
  
    },
  },
});

export const {
  setOrderDetails,
  updateOrderDetails,
} = doOrderSlice.actions;

export default doOrderSlice.reducer;
