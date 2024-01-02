import { configureStore } from '@reduxjs/toolkit'
import auth from "~/store/auth";
import message from "~/store/message";

const store = configureStore({
    reducer: {
        auth,
        message
    },
})

export default store;