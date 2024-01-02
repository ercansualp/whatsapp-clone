import {useEffect, useRef} from "react";
import classNames from "classnames";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import axios from "axios";
import {setMessages} from "~/store/message/actions.tsx";
import {useContacts, useMessages} from "~/store/message/hooks.tsx";
import {messageAPI} from "~/url.tsx";

export default function Content() {
    const currentUser = useCurrentUser();
    const messagesEndRef = useRef(null);
    const messages = useMessages();
    const contact = useContacts().find(contact => contact.active);
    /*
    const getMessages = async () => {
        const {data} = await axios.get(messageAPI, {
            headers: {
                currentUserId: currentUser._id,
                contactId: contact._id
            }
        });
        let newMessages = JSON.parse(JSON.stringify(messages));
        newMessages.push(data)
        setMessages(newMessages);
    }

    useEffect(() => {
        getMessages();
    }, [contact]);
     */

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const getMessageTime = (_messageTime) => {
        const messageTime = new Date(_messageTime);
        const messageHour = messageTime.getHours().toString();
        const messageMinute = messageTime.getMinutes().toString().length === 1 ? "0" + messageTime.getMinutes().toString() : messageTime.getMinutes().toString();
        return messageHour + ":" + messageMinute;
    }

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
                            <div className="float-right bottom-0.5 right-1 text-[#ffffff99] text-[11px] leading-[15px] absolute">{getMessageTime(message.createdAt)}</div>
                        </div>
                    </div>
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    )
}