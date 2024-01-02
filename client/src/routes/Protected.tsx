import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {Outlet, Navigate} from "react-router-dom";
import Main from "~/components/main";

export default function Protected() {
    const currentUser = useCurrentUser();

    if(currentUser) return <Main><Outlet /></Main>
    return <Navigate to="/login" replace={true} />
}