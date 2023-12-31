import axios from "axios";
import {useContact, useCurrentUser, useSocket} from "~/store/auth/hooks.tsx";

type props = {
    message: string,
    setMessages: any,
    setMessage: any
}

export default function Voice(props: props) {
    const {message, setMessages, setMessage} = props;
    const currentUser = useCurrentUser();
    const socket = useSocket();
    const contact = useContact();

    const submitMessage = async () => {
        const _message = message.trim();
        if(_message) {
            const {data} = await axios.post("http://localhost:5000/message", {
                sender: currentUser._id,
                recipient: contact._id,
                text: _message
            });
            if(data) {
                let messageTime = new Date(data.createdAt);
                const messageHour = messageTime.getHours().toString();
                const messageMinute = messageTime.getMinutes().toString().length === 1 ? "0" + messageTime.getMinutes().toString() : messageTime.getMinutes().toString();
                messageTime = messageHour + ":" + messageMinute;
                socket.emit("send_message", {
                    recipient: contact._id,
                    message: {
                        text: _message,
                        time: messageTime,
                        _id: data._id,
                        sender: currentUser._id
                    }
                });
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages, {_id: data._id, sender: currentUser._id, text: _message, time: messageTime}];
                    return newMessages;
                });
                setMessage("");
                socket.emit("typing_message", {
                    recipient: contact._id,
                    sender: currentUser._id,
                    value: false
                });
            }
        }
    }

    if(message) {
        return (
            <button onClick={submitMessage} className="py-[5px] flex justify-center items-center w-10 h-full">
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
            </button>
        )
    }
    return (
        <button className="py-[5px] flex justify-center items-center w-10 h-full">
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>ptt</title><path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path></svg>
        </button>
    )
}