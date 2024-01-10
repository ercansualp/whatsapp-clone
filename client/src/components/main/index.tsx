import {useEffect} from "react";
import {setContacts, setMessages} from "~/store/message/actions.tsx";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import io from "socket.io-client";
import {useContacts, useMessages} from "~/store/message/hooks.tsx";
import axios from "axios";
import {serverIP, serverPort, userAPI} from "~/url.tsx";

type props = {
    children: any
}

export let socket = io.connect(`http://${serverIP}:${serverPort}`);

export default function Main(props: props) {
    const {children} = props;
    const currentUser = useCurrentUser();
    const contacts = useContacts();
    const messages = useMessages();

    useEffect(() => {
        socket.emit("join_room", currentUser._id);
    }, [socket])
    function setContact(_id, params) {
        const newContacts = [...contacts];
        for(let i = 0; i < newContacts.length; i++) {
            if(newContacts[i]._id === _id) {
                newContacts[i] = {
                    ...newContacts[i],
                    ...params
                }
                break;
            }
        }
        setContacts(newContacts);
    }
    useEffect(() => {
        socket.on("receive_online", (_id) => {
            setContact(_id, {
                online: true
            });
        });
        return () => {
            socket.off("receive_online");
        }
    }, [contacts, socket]);
    useEffect(() => {
        socket.on("receive_disconnect", (data) => {
            setContact(data._id, {
                online: false,
                typing: false,
                lastSeen: data.date
            });
            axios.post(`${userAPI}/logout`, {date: data.date, _id: data._id});
        });
        return () => {
            socket.off("receive_disconnect");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_typing_message", (data) => {
            setContact(data.sender, {
                typing: data.value
            });
        });
        return () => {
            socket.off("receive_typing_message");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_offline", (data) => {
            setContact(data._id, {
                online: false,
                typing: false,
                lastSeen: data.date
            });
        });
        return () => {
            socket.off("receive_offline");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_isContactOnline", (data) => {
            setContact(data._id, {
                online: data.online
            });
        });
        return () => {
            socket.off("receive_isContactOnline");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_message", (message) => {
            if(contacts.find(contact => contact.active) && contacts.find(contact => contact.active)._id === message.sender) {
                setMessages([...messages, message]);
            }
        });
        return () => {
            socket.off("receive_message");
        }
    }, [socket, contacts]);

    const getContacts = async () => {
        const {data} = await axios.get(userAPI);
        data.forEach(contact => {
            contact.typing = false;
            contact.active = false;
        });
        setContacts(data);
    }

    useEffect(() => {
        getContacts();
    }, [])

    return children
}