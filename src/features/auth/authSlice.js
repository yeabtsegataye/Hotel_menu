import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { payload, accessToken } = action.payload
            state.user = payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
        category :(state, action)=>{
            state.category = action.payload
        }
    },
})

export const { setCredentials, logOut,category } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentCategory = (state) =>state.auth.category