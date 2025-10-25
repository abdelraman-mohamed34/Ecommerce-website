import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    color: 'light',
    colors: {
        light: {
            bg: 'bg-white',
            header: 'bg-green-900',
            nav: 'bg-white',
            text: 'text-gray-900',
            secondText: 'text-gray-700',
            textHover: 'hover:text-gray-500',
            disText: 'text-gray-600',
            accent: 'text-green-700',
            cardBg: 'bg-white',
            footer: 'bg-gray-200/70',
            cardText: 'text-gray-900',
            cardPrice: 'text-gray-900',
            cardBrand: 'text-gray-500',
            ratingColor: 'text-yellow-400',
            hover: 'hover:bg-gray-100',
            border: 'border border-gray-300',
        },
        dark: {
            bg: 'bg-gray-900',
            header: 'bg-green-800',
            nav: 'bg-gray-900/50',
            text: 'text-gray-100',
            secondText: 'text-gray-300',
            textHover: 'hover:text-gray-400',
            disText: 'text-gray-400',
            accent: 'text-green-400',
            cardBg: 'bg-gray-800',
            footer: 'bg-gray-800',
            cardText: 'text-gray-100',
            cardPrice: 'text-green-400',
            cardBrand: 'text-gray-400',
            ratingColor: 'text-yellow-400',
            hover: 'hover:bg-gray-800',
            border: '',
        }
    }
}


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setColor: (state, action) => {
            state.color = action.payload
        }
    }
})

export const { setColor } = themeSlice.actions

export default themeSlice.reducer;