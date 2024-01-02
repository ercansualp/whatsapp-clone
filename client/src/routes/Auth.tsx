import {useLoading} from "~/store/auth/hooks.tsx";
import Loading from "~/routes/Loading.tsx";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import axios from "axios";
import {setCurrentUser, setLoading} from "~/store/auth/actions.tsx";
import {userAPI} from "~/url.tsx";

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
            const {data} = await axios.post(userAPI,{}, {
                withCredentials: true
            });
            if(!data) {
                removeCookie("jsonwebtoken");
                setCurrentUser(undefined);
            }
            else {
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
