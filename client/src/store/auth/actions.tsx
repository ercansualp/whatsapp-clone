import store from "~/store";
import { _setCurrentUser, _removeCurrentUser, _setLoading } from "~/store/auth/index.tsx";

export const setCurrentUser = (user) => store.dispatch(_setCurrentUser(user));
export const removeCurrentUser = () => store.dispatch(_removeCurrentUser(undefined));
export const setLoading = (data) => store.dispatch(_setLoading(data));
