import { createSlice } from "@reduxjs/toolkit";
import { addBidOnProduct } from "../Actions/userActions";

const bidsSlice = createSlice({
    name: 'bids',
    initialState: {
      isLoading: false,
      error: null,
      successMessage: null,
    },
    reducers: {
      // Optional: Custom reducers if needed
      clearStatus: (state) => {
        state.error = null;
        state.successMessage = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Handle pending state
        .addCase(addBidOnProduct.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.successMessage = null;
        })
        // Handle fulfilled state
        .addCase(addBidOnProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.successMessage = action.payload.message;
        })
        // Handle rejected state
        .addCase(addBidOnProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || 'Something went wrong!';
          state.successMessage = action.payload.message;
        });
    },
  });
  
  export const { clearStatus } = bidsSlice.actions;
  export default bidsSlice.reducer;