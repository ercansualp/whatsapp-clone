import TypeMessage from "./type-message";
import Voice from "./voice";
import {useRef, useState} from "react";
import EmojiPicker from "emoji-picker-react";
import {useClickAway} from "react-use";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {setMessage, setMessages} from "~/store/message/actions.tsx";
import {socket} from "~/components/main";
import {useContacts, useMessage, useMessages} from "~/store/message/hooks.tsx";
import axios from "axios";
import {messageAPI, serverIP, serverPort, userAPI} from "~/url.tsx";
import {Popover} from "@headlessui/react";
import classNames from "classnames";
import {newItems} from "~/utils";
import {setCurrentUser} from "~/store/auth/actions.tsx";

export default function Footer() {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const ref = useRef(null);
    const showEmojiPickerRef = useRef(null);
    const currentUser = useCurrentUser();
    const message = useMessage();
    const messages = useMessages();
    const contact = useContacts().find(contact => contact.active);
    const [active, setActive] = useState(false);
    const ref2 = useRef(null);
    const [photosAndVideo, setPhotosAndVideos] = useState()

    useClickAway(ref, (event) => {
        if(event.target.parentElement !== showEmojiPickerRef.current && event.target.parentElement.parentElement !== showEmojiPickerRef.current){
            setShowEmojiPicker(false);
        }
    });

    const handleEmojiClick = emoji => {
        setMessage(message + emoji.emoji);
        socket.emit("typing_message", {
            recipient: contact._id,
            sender: currentUser._id,
            value: true
        });
    }

    const submitMessage = async () => {
        const _message = message.trim();
        if(_message) {
            const {data} = await axios.post(messageAPI, {
                sender: currentUser._id,
                recipient: contact._id,
                text: _message,
                type: "text"
            });
            if(data) {
                socket.emit("send_message", {
                    recipient: contact._id,
                    message: {
                        text: _message,
                        createdAt: data.createdAt,
                        _id: data._id,
                        sender: currentUser._id
                    }
                });
                setMessages([...messages, {_id: data._id, sender: currentUser._id, text: _message, createdAt: data.createdAt}])

                setMessage("");
                socket.emit("typing_message", {
                    recipient: contact._id,
                    sender: currentUser._id,
                    value: false
                });
            }
        }
    }

    const handleChangeFile = async (event) => {
        let {files} = event.target;
        console.log("files: ", files);
        console.log("files type: ", typeof files);
        console.log("files path");
        if(files.length !== 0) {
            const formData = new FormData();
            for(let i = 0; i < files.length; i++) {
                formData.append("file", files[i])
            }
            console.log("es: ", formData);
            let {data} = await axios.post(`${messageAPI}/uploadPhotosAndVideos`, formData);
            console.log("res data: ",  data);
            let result = await axios.post(messageAPI, {
                sender: currentUser._id,
                recipient: contact._id,
                text: data[0].path,
                type: "file"
            });
            console.log("result response: ", result.data);
            /*
            files = [];
            let counter = 0;
            for(let i = 0; i < data.length; i++) {
                files.push({
                    ...data,
                    sender: currentUser._id,
                    recipient: contact._id,
                    text: message,
                    type: data[i].mimetype.includes("image") ? "image" : "video"
                });
                counter++;
            }
            for(let i = 0; i < files.length; i++) {
                await axios.post(messageAPI, {
                    ...files[i]
                });
                counter--;
            }
            if(counter === 0) {
                console.log("ok!");
            }
            */


            /*
            await axios.patch(userAPI, {
                _id: data._id,
                avatar: data,
                about: data.about,
                fullName: data.fullName,
                olddata: currentUser.avatar
            });
            console.log("res: ", data);
            */
            /*
            try {
                for(let i = 0; i < files.length; i++) {
                    const formData = new FormData();
                    formData.append("file", file);
                    let {data} = await axios.post(`${messageAPI}/uploadPhotosAndVideos`, formData);
                    data = data.replace("\\", "/");
                    data = `http://${serverIP}:${serverPort}/` + data;
                    await axios.patch(userAPI, {
                        _id: data._id,
                        avatar: data,
                        about: data.about,
                        fullName: data.fullName,
                        olddata: currentUser.avatar
                    });
                }

                setData({
                    ...data,
                    newAvatar: data
                });
                setCurrentUser({
                    ...currentUser,
                    avatar: data
                });
            } catch(error) {

            }
            */
        }
    }

    useClickAway(ref, () => {
        console.log("click event trigged!");
    });

    return (
        <div className="min-h-[62px] bg-[#202c33] px-4 py-[5px] flex items-center text-[#8696a0]">
            <div className="py-[5px] flex items-center">
                <button ref={showEmojiPickerRef} className="mx-2 flex items-center justify-center relative" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <svg viewBox="0 0 24 24" height={26} width={26} preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>smiley</title><path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg>
                    {showEmojiPicker ? (<div className="absolute left-0 bottom-11" ref={ref}><EmojiPicker onEmojiClick={handleEmojiClick} className="z-50" emojiStyle="twitter"/></div>) : ""}
                </button>
                <Popover className="relative">
                    <Popover.Button className="p-2 flex items-center justify-center outline-none" onClick={() => setActive(!active)}>
                        <svg className={classNames("transition-all", {
                            "rotate-45": active
                        })} viewBox="0 0 24 24" height={24} width={24} fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z" fill="currentColor" /></svg>
                    </Popover.Button>
                    <Popover.Panel className="absolute bottom-[50px] left-0 py-[9px] rounded-2xl bg-[#233138] max-w-[340px] min-w-[248px]">
                        <div ref={ref2} className="py-[3px]">
                            {
                                newItems.map((item, index) => (
                                    <label key={index} className="ml-4 mr-2 flex items-center gap-3 hover:bg-[#182229] transition-colors cursor-pointer h-10 rounded-lg">
                                        <input type="file" className="hidden" onChange={handleChangeFile} multiple={true}/>
                                        {item.icon}
                                        <span className="text-[#d1d7db] text-base font-normal leading-[21px]">{item.title}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </Popover.Panel>
                </Popover>
            </div>
            <TypeMessage submitMessage={submitMessage} />
            <Voice submitMessage={submitMessage} />
        </div>
    )
}