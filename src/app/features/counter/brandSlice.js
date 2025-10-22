import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    brands: [],
    loading: false,
    error: null,
};

export const fetchBrandProducts = createAsyncThunk(
    'brands/fetchBrandProducts',
    async (brandName, thunkAPI) => {
        try {
            let allProducts = [];
            let skip = 0;
            const limit = 50;
            let total = 0;

            do {
                const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
                allProducts = [...allProducts, ...res.data.products];
                total = res.data.total;
                skip += limit;
            } while (allProducts.length < total);

            const brandProducts = allProducts.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
            return brandProducts;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);
const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrandProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrandProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});


export default brandSlice.reducer;
