import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: { value: []},
    reducers: {
        setPosts: (state, action) => {
            state.value = action.payload
        },
    },
    
})

export const {setPosts} = postsSlice.actions

export default postsSlice.reducer