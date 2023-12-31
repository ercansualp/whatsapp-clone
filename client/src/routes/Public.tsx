import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {Outlet, Navigate} from "react-router-dom";

export default function Public() {
    const currentUser = useCurrentUser();

    if(currentUser) return <Navigate to="/" replace={true} />
    return <Outlet />
}