import { createSlice } from "@reduxjs/toolkit";

export const potentialSlice = createSlice({
    name: "potential",
    initialState: { value: {}},
    reducers: {
        setPotential: (state, action) => {
            state.value = action.payload
        }
    }
    
})

export const {setPotential} = potentialSlice.actions

export default potentialSlice.reducer