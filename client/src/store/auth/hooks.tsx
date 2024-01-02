import {useSelector} from "react-redux";

export const useCurrentUser = () => useSelector((state) => state.auth.currentUser);
export const useLoading = () => useSelector((state) => state.auth.loading);
