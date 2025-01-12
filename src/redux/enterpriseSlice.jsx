import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: null,
  branches: null,
  orders: null,
};

const enterpriseSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setBranches(state, action) {
      state.branches = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    updateBookings(state, action) {
      if (state.bookings) {
        state.bookings = action.payload; // Replace bookings with new data
      }
    },
    updateOrders(state, action) {
      if (state.orders) {
        state.orders = action.payload; // Replace orders with new data
      }
    },
    updateBranches(state, action) {
      if (state.branches) {
        state.branches = action.payload; // Replace branches with new data
      }
    },
  },
});

export const {
  setBookings,
  setBranches,
  setOrders,
  updateBookings,
  updateBranches,
  updateOrders,
} = enterpriseSlice.actions;

export default enterpriseSlice.reducer;
