import store from "~/store/index.js";
import {
    _setActiveContact,
    _setContacts,
    _setMessage,
    _setMessages,
    _setPhotosAndVideos
} from "~/store/message/index.js";

export const setMessage = (message) => store.dispatch(_setMessage(message));
export const setMessages = (messages) => store.dispatch(_setMessages(messages));
export const setContacts = (contacts) => store.dispatch(_setContacts(contacts));
export const setPhotosAndVideos = (files) => store.dispatch(_setPhotosAndVideos(files));
export const setActiveContact = (data) => store.dispatch(_setActiveContact(data));
