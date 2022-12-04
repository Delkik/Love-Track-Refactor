import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: { value: {accessToken: "", refreshToken: "", expiresIn: ""}},
    reducers: {
        setTokens: (state, action) => {
            state.value = action.payload
        },
    },
    
})

export const {setTokens} = tokenSlice.actions

export default tokenSlice.reducer