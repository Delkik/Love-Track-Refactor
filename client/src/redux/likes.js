import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
    name: "likes",
    initialState: { value: []},
    reducers: {
        setLikes: (state, action) => {
            state.value = action.payload
        },
    },
    
})

export const {setLikes} = likesSlice.actions

export default likesSlice.reducer