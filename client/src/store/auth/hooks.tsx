import {useSelector} from "react-redux";

export const useCurrentUser = () => useSelector((state) => state.auth.currentUser);
export const useContact = () => useSelector((state) => state.auth.contact);
export const useSocket = () => useSelector((state) => state.auth.socket);
export const useLoading = () => useSelector((state) => state.auth.loading);
