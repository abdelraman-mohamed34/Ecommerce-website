import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    searchedProductsResult: [],
    loading: false,
    hasData: false,
    error: null,
};

export const fetchProductsApiBySearch = createAsyncThunk(
    'products/fetchSearchedProductsResult',
    async (title, thunkAPI) => {
        if (!title) return thunkAPI.rejectWithValue('Category is required');
        try {
            const res = await axios.get(`https://dummyjson.com/products/search?q=${title}`);
            return res.data.products;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


const productsBySearch = createSlice({
    name: 'SearchedProductsResultsByCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsApiBySearch.pending, (state) => {
                state.loading = true;
                state.hasData = false;
                state.error = null;
            })
            .addCase(fetchProductsApiBySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedProductsResult = action.payload;
                state.hasData = true;
                state.error = null;
            })
            .addCase(fetchProductsApiBySearch.rejected, (state, action) => {
                state.loading = false;
                state.hasData = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default productsBySearch.reducer;
