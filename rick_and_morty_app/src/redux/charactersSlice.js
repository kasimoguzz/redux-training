import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching characters
export const getCharactersAsync = createAsyncThunk("characters/getCharactersAsync", async (page) => {
    const res = await axios(`https://rickandmortyapi.com/api/character?page=${page}`);  
    return res.data.results;  
});

export const charactersSlice = createSlice({
    name: "characters",  
    initialState: {
        items: [],
        status: "idle",
        error: null,
        page:0,
        hasNextPage: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCharactersAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCharactersAsync.fulfilled, (state, action) => {
                state.items = [...state.items, ...action.payload]
                state.status = "succeeded";
                state.page += 1

                if(action.payload.length < 10){
                    state.hasNextPage= false
                }
            })
            .addCase(getCharactersAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;  
            });
    }
});

// Doğru export: reducer
export default charactersSlice.reducer;
