import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {Outlet, Navigate} from "react-router-dom";

export default function Protected() {
    const currentUser = useCurrentUser();

    if(currentUser) return <Outlet />
    return <Navigate to="/login" replace={true} />
}