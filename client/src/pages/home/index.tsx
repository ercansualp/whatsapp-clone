import Contacts from "~/pages/home/contacts";
import {useState} from "react";
import Communities from "~/pages/home/communities";
import NewChat from "~/pages/home/new-chat";
import Message from "~/pages/home/message";
import Profile from "~/pages/home/profile";

export default function Home() {
    const [value, setValue] = useState(0);

    return (
        <div className="bg-[#0c1317] h-screen flex items-center overflow-hidden">
            <div className="mx-auto max-1440:w-full max-1440:h-full 1440:w-[calc(100%-38px)] 1440:h-[calc(100%-38px)] flex max-w-[1600px]">
                <div className="max-w-[30%] max-901:max-w-[45%] max-1301:max-w-[40%] w-full flex flex-col min-h-full">
                    {
                        value === 0 ? <Contacts setValue={setValue} /> :
                        value === 1 ? <Communities setValue={setValue} /> :
                        value === 2 ? <></> :
                        value === 3 ? <NewChat setValue={setValue} /> :
                        value === 4 && <Profile setValue={setValue} />
                    }
                </div>
                <Message />
            </div>
        </div>
    )
}