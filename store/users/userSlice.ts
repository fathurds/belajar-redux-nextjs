import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
})

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {city: string},
    phone: string;
    website: string;
    company: {name: string}
}

export type UserState = {
    user: User[];
    pending: boolean;
    error: boolean;
}
const initialState: UserState = {
    user: [],
    pending: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        rehydrate(state, action: PayloadAction<UserState>) {
            state.error = action.payload.error;
            state.pending = action.payload.pending;
            state.user = action.payload.user;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUsers.pending, state => {
                state.pending = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.pending = false;
                state.user = action.payload;
            })
            .addCase(getUsers.rejected, state => {
                state.pending = false;
                state.error = true;
            })
    }
});

export const {rehydrate} = userSlice.actions;