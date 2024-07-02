import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const apiUrl = 'http://localhost:3000/api'

export const fetchFiles = createAsyncThunk("fetchFilesInfo", async (fileName) => {
    const url = fileName ? `${apiUrl}/files/data?fileName=${fileName}` : `${apiUrl}/files/data`
    const res = await fetch(url);
    return res?.json();
});

const filesSlice = createSlice({
    name: "file",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {

        builder.addCase(fetchFiles.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            state.isLoading = false;
            const { results } = action.payload;
            console.log(results)
            state.data = action.payload.error ? state.isError = true : results
        })
        builder.addCase(fetchFiles.rejected, (state, action) => {
            state.isError = true;
        })
    }

})


export default filesSlice.reducer; 

