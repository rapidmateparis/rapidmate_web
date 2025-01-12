import { createSlice } from '@reduxjs/toolkit';
const initialState={
  commonData:null
};
const commonSliceData = createSlice({
  name: 'commonSliceData',
  initialState,
  reducers: {
    commonDataList(state,action) {
      state.commonData = action.payload
    }, 
  },
});

export const {commonDataList} = commonSliceData.actions;

export default commonSliceData.reducer;
