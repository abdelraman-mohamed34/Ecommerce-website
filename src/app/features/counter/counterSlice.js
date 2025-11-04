import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quantities: {},
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            const { productId, stock } = action.payload
            if (!state.quantities[productId]) state.quantities[productId] = 1
            if (state.quantities[productId] < stock) state.quantities[productId] += 1
        },
        decrement: (state, action) => {
            const productId = action.payload
            if (!state.quantities[productId]) state.quantities[productId] = 1
            if (state.quantities[productId] > 1) state.quantities[productId] -= 1
        },
        setQuantity: (state, action) => {
            const { productId, quantity } = action.payload
            state.quantities[productId] = quantity
        },
    },
})

export const { increment, decrement, setQuantity } = counterSlice.actions
export default counterSlice.reducer
