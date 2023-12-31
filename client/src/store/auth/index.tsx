import { createSlice } from '@reduxjs/toolkit'

type initialState = {
    currentUser: undefined|object,
    contact: undefined|object,
    socket: any,
    loading: boolean
}

const initialState: initialState = {
    currentUser: undefined,
    contact: undefined,
    socket: undefined,
    loading: true
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        _setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        _removeCurrentUser: (state) => {
            state.currentUser = undefined;
        },
        _setContact: (state, action) => {
            state.contact = action.payload;
        },
        _setSocket: (state, action) => {
            state.socket = action.payload;
        },
        _setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { _setCurrentUser, _removeCurrentUser, _setLoading, _setContact, _setSocket } = auth.actions

export default auth.reducer