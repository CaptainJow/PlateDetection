import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: `user`,
    initialState:{
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        login: (state,action)=>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) =>{
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        updateRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
    },
});

export const {
    login,
    logout,
    updateUser,
    updateAccessToken,
    updateRefreshToken,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;

export default userSlice.reducer;
