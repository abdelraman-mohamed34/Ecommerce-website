import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    tag: 'all',
    loading: false,
    error: null,
};

export const fetchProductsApi = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('https://dummyjson.com/products?limit=100')
            // console.log(res.data.products[0])
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTag: (state, action) => {
            state.tag = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products
            })
            .addCase(fetchProductsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

// Action creators are generated for each case reducer function
export const { setTag } = productsSlice.actions

export default productsSlice.reducer