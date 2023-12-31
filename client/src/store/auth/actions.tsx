import store from "~/store";
import {_setCurrentUser, _removeCurrentUser, _setLoading, _setContact, _setSocket} from "~/store/auth/index.tsx";

export const setCurrentUser = (user) => store.dispatch(_setCurrentUser(user));
export const setContact = (contact) => store.dispatch(_setContact(contact));
export const setSocket = (socket) => store.dispatch(_setSocket(socket));
export const removeCurrentUser = () => store.dispatch(_removeCurrentUser(undefined));
export const setLoading = (data) => store.dispatch(_setLoading(data));
