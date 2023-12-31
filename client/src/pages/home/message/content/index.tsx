import {useEffect, useRef} from "react";
import classNames from "classnames";
import {useContact, useCurrentUser, useSocket} from "~/store/auth/hooks.tsx";
import axios from "axios";

type props = {
    messages: any,
    setMessages: any,
    setTyping: any
}

export default function Content(props: props) {
    const {messages, setMessages, setTyping} = props;
    const currentUser = useCurrentUser();
    const messagesEndRef = useRef(null);
    const contact = useContact();
    const socket = useSocket();

    useEffect(() => {
        socket.on("receive_message", (message) => {
            if(message.sender === contact._id) {
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages, {_id: message._id, sender: contact._id, text: message.text, time: message.time}];
                    return newMessages;
                });
            }
        });
    }, [contact, socket]);

    useEffect(() => {
        socket.on("receive_typing_message", (data) => {
            console.log("data: ", data);
            console.log("contact: ", contact);
            if(data.sender === contact._id) {
                setTyping(data.value);
            }
        });
    }, [contact, socket]);

    const getMessages = async () => {
        const {data} = await axios.get("http://localhost:5000/message", {
            headers: {
                currentUserId: currentUser._id,
                contactId: contact._id
            }
        });
        setMessages(data);
    }

    useEffect(() => {
        getMessages();
    }, [contact]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="grow bg-[#111b21] flex flex-col py-2 overflow-y-auto">
            {
                messages.map((message, index) => (
                    <div key={index} className={classNames("w-full px-[63px] mb-0.5 flex", {
                        "justify-end": message.sender === currentUser._id,
                        "justify-start": message.sender === contact._id,
                        "mb-3": index !== messages.length-1 && messages[index+1].sender !== message.sender
                    })}>
                        <div className={classNames("rounded-[7.5px] pt-[6px] pr-[7px] pb-[8px] pl-[9px] font-normal flex relative max-w-[65%] max-1301:max-w-[75%] max-1025:max-w-[85%] max-901:max-w-[95%]", {
                            "bg-[#005c4b]": message.sender === currentUser._id,
                            "bg-[#202c33]": message.sender === contact._id
                        })}>
                            <div className="text-[#e9edef] text-[14.2px] leading-[19px] mr-8">{message.text}</div>
                            <div className="float-right bottom-0.5 right-1 text-[#ffffff99] text-[11px] leading-[15px] absolute">{message.time}</div>
                        </div>
                    </div>
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    )
}