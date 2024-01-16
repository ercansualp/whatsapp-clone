import { createSlice } from '@reduxjs/toolkit'

type initialState = {
    messages: array,
    message: string,
    contacts: array,
    photosAndVideos: array
}

const initialState: initialState = {
    messages: [],
    message: "",
    contacts: [],
    photosAndVideos: []
}

export const message = createSlice({
    name: 'message',
    initialState,
    reducers: {
        _setMessages: (state, action) => {
            state.messages = action.payload;
        },
        _setMessage: (state, action) => {
            state.message = action.payload;
        },
        _setContacts: (state, action) => {
            console.log(action.payload);
            state.contacts = action.payload;
        },
        _setActiveContact: (state, action) => {
            for(let i = 0; i < state.contacts.length; i++) {
                state.contacts[i].active = state.contacts[i]._id === action.payload;
            }
        },
        _setPhotosAndVideos: (state, action) => {
            state.photosAndVideos = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { _setMessages, _setMessage, _setContacts, _setActiveContact, _setPhotosAndVideos } = message.actions

export default message.reducer