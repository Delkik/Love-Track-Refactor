import { createSlice } from "@reduxjs/toolkit";

export const songsSlice = createSlice({
    name: "songs",
    initialState: { value: []},
    reducers: {
        setSongs: (state, action) => {
            state.value = action.payload
        },
    },
    
})

export const {setSongs} = songsSlice.actions

export default songsSlice.reducer