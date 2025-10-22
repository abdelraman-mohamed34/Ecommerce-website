import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    productsCategory: [],
    loading: false,
    hasData: false,
    error: null,
};

export const fetchProductsApiByCategory = createAsyncThunk(
    'products/fetchProductsApiByCategory',
    async (category, thunkAPI) => {
        if (!category) return thunkAPI.rejectWithValue('Category is required');
        try {
            const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
            return res.data.products;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


const productsByCategorySlice = createSlice({
    name: 'productsByCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsApiByCategory.pending, (state) => {
                state.loading = true;
                state.hasData = false;
                state.error = null;
            })
            .addCase(fetchProductsApiByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.productsCategory = action.payload;
                state.hasData = true;
                state.error = null;
            })
            .addCase(fetchProductsApiByCategory.rejected, (state, action) => {
                state.loading = false;
                state.hasData = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default productsByCategorySlice.reducer;
