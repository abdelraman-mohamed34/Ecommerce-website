import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice.js'
import productsReducer from './features/counter/productsSlice.js'
import productsByCategoryReducer from './features/counter/categoryApiSlice.js'
import brandsReducer from './features/counter/brandSlice.js'
import searchedResultReducer from './features/counter/searchSlice.js'
import themeReducer from './features/counter/themeSlice.js'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        productStore: productsReducer,
        productsCategory: productsByCategoryReducer,
        brandsCategory: brandsReducer,
        searchedProducts: searchedResultReducer,
        theme: themeReducer,
    },
})