import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        value: null,
    },
    reducers: {
        setGroups: (state, groups) => {
            state.value = groups.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setGroups } = chatSlice.actions;

export default chatSlice.reducer;
