import {useEffect} from "react";
import {setContacts, setMessages} from "~/store/message/actions.tsx";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import io from "socket.io-client";
import {useContacts, useMessages} from "~/store/message/hooks.tsx";
import axios from "axios";

type props = {
    children: any
}

export let socket = io.connect("http://13.50.130.221:5000");

export default function Main(props: props) {
    const {children} = props;
    const currentUser = useCurrentUser();
    const contacts = useContacts();
    const messages = useMessages();

    useEffect(() => {
        socket.emit("join_room", currentUser._id);
    }, [socket])
    function setContact(_id, params) {
        let newContacts = JSON.parse(JSON.stringify(contacts));
        for(let i = 0; i < newContacts.length; i++) {
            if(newContacts[i]._id === _id) {
                for(let j = 0; j < params.length; j++) {
                    newContacts[i][params[j][0]] = params[j][1];
                }
                break;
            }
        }
        setContacts(newContacts);
    }
    useEffect(() => {
        socket.on("receive_online", (_id) => {
            setContact(_id, [["online", true]]);
        });
        return () => {
            socket.off("receive_online");
        }
    }, [contacts, socket]);
    useEffect(() => {
        socket.on("receive_disconnect", (data) => {
            setContact(data._id, [["online", false], ["typing", false], ["lastSeen", data.date]]);
            axios.post("http://13.50.130.221:5000/user/logout", {date: data.date, _id: data._id});
        });
        return () => {
            socket.off("receive_disconnect");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_typing_message", (data) => {
            setContact(data.sender, [["typing", data.value]]);
        });
        return () => {
            socket.off("receive_typing_message");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_offline", (data) => {
            setContact(data._id, [["typing", false], ["lastSeen", data.date], ["online", false]]);
        });
        return () => {
            socket.off("receive_offline");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_isContactOnline", (data) => {
            setContact(data._id, [["online", data.online]]);
        });
        return () => {
            socket.off("receive_isContactOnline");
        }
    }, [socket, contacts]);
    useEffect(() => {
        socket.on("receive_message", (message) => {
            console.log("mesajlar: ", messages);
            console.log("message: ", message);

            if(contacts.find(contact => contact.active) && contacts.find(contact => contact.active)._id === message.sender) {
                setMessages([...messages, message]);
            }
        });
        return () => {
            socket.off("receive_message");
        }
    }, [socket, contacts]);

    const getContacts = async () => {
        const {data} = await axios.post("http://13.50.130.221:5000/user/all", {});
        data.forEach(contact => {
            contact.typing = false;
            contact.online = contact._id === currentUser._id;
            contact.active = false;
        });
        setContacts(data);
    }

    useEffect(() => {
        getContacts();
    }, [])

    return children
}