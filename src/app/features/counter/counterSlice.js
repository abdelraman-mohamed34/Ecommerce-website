import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 1,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            if (state.value < action.payload) {
                state.value += 1
            }
        },
        decrement: (state) => {
            if (state.value > 1) {
                state.value -= 1
            }
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer