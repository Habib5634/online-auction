
import { createSlice} from '@reduxjs/toolkit';
import { fetchCategories } from '../Actions/userActions';




const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    loadingCat: false,
    errorCat: null,
  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCat = true;
        state.errorCat = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCat = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCat = false;
        state.errorCat = action.payload;
      });
  },
});





export default categorySlice.reducer;