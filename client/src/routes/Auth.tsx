import {useLoading} from "~/store/auth/hooks.tsx";
import Loading from "~/routes/Loading.tsx";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import axios from "axios";
import {setCurrentUser, setLoading, setSocket} from "~/store/auth/actions.tsx";
import io from "socket.io-client";

type props = {
    children: node
}

export default function Auth(props: props) {
    const {children} = props;
    const [cookies, removeCookie] = useCookies([]);

    // kontroller...
    const verifyUser = async () => {
        if(!cookies.jsonwebtoken) setCurrentUser(undefined);
        else {
            const {data} = await axios.post("http://localhost:5000/user",{}, {
                withCredentials: true
            });
            if(!data) {
                removeCookie("jsonwebtoken");
                setCurrentUser(undefined);
            }
            else {
                const socket = io.connect("http://localhost:5000");
                setSocket(socket);
                setCurrentUser(data);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        verifyUser();
    }, []);

    if(useLoading()) return <Loading />
    else return children;
}
