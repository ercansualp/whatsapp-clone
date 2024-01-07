import classNames from "classnames";
import {Popover, Transition} from "@headlessui/react";
import Avatar from "~/components/avatar";
import {setActiveContact, setMessages} from "~/store/message/actions.tsx";
import {socket} from "~/components/main";
import axios from "axios";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {messageAPI} from "~/url.tsx";

type props = {
    index: number,
    contact: object
}

export default function Contact(props: props) {
    const {index, contact} = props;
    const currentUser = useCurrentUser();

    const getMessages = async () => {
        const {data} = await axios.get(messageAPI, {
            headers: {
                currentUserId: currentUser._id,
                contactId: contact._id
            }
        });
        setMessages(data);
    }

    const handleSetContact = async () => {
        socket.emit("is_online", contact._id);
        setActiveContact(contact._id)
        await getMessages();
    }

    const handleDeleteMessages = async () => {
        const {data} = await axios.delete(messageAPI, {
            params: {
                id1: currentUser._id,
                id2: contact._id
            }
        });
        if(data) {
            getMessages();
        }
    }

    return (
        <div className="flex h-[72px] hover:bg-[#202c33] cursor-pointer transition-all group relative" onClick={handleSetContact}>
            <div className="w-[77px] h-18 pl-[13px] pr-[15px] flex items-center h-[73px]">
                <Avatar avatar={contact.avatar} width={49} height={49} />
            </div>
            <div className={classNames("grow flex flex-col justify-center pr-[15px] gap-0.5", {
                "border-t border-t-[#8696a026]": index !== 0
            })}>
                <div className="flex">
                    <div className="grow text-[#e9edef] text-[17px] font-medium">
                        {contact.fullName}
                        {contact._id === currentUser._id && " (Siz)"}
                    </div>
                    <div className="mt-[3px] ml-1.5 text-[#8696a0] text-xs font-normal leading-[14px]">Dün</div>
                </div>
                <div className="text-[#d1d7db] text-sm leading-5 font-normal flex items-center gap-[11px] justify-between">
                    {/*<span>tmm</span>*/}
                    <Popover>
                        <Popover.Button className="hidden group-hover:block outline-none transition-all absolute right-12 top-7">
                            <svg viewBox="0 0 19 20" height="20" width="19" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px"><title>down</title><path fill="currentColor" d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z"></path></svg>
                        </Popover.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                            className="absolute max-w-[340px] py-[9px] bg-[#233138] z-50 right-12"
                        >
                            <Popover.Panel>
                                <ul>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all">Sohbeti arşivle</li>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all">Bildirimleri sessize al</li>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all" onClick={handleDeleteMessages}>Sohbeti sil</li>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all">Sohbeti sabitle</li>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all">Okunmadı olarak işaretle</li>
                                    <li className="h-10 pl-6 pr-[58px] flex items-center hover:bg-[#182229] transition-all">Engelle</li>
                                </ul>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>
        </div>
    )
}