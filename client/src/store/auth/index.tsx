import { createSlice } from '@reduxjs/toolkit'

type initialState = {
    currentUser: undefined|object,
    loading: boolean
}

const initialState: initialState = {
    currentUser: undefined,
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
        _setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { _setCurrentUser, _removeCurrentUser, _setLoading } = auth.actions

export default auth.reducer