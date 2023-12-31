import {useContact, useCurrentUser, useSocket} from "~/store/auth/hooks.tsx";

type props = {
    message: string,
    setMessage: any
}

export default function TypeMessage(props: props) {
    const {message, setMessage} = props;
    const currentUser = useCurrentUser();
    const socket = useSocket();
    const contact = useContact();

    const handleChange = (event) => {
        const {value} = event.target;
        setMessage(value);
        socket.emit("typing_message", {
            recipient: contact._id,
            sender: currentUser._id,
            value: value !== "" && value !== undefined && value !== null
        });
    }

    return (
        <div className="my-[5px] mx-2 grow">
            <input value={message} onChange={handleChange} className="w-full leading-[22.05px] text-[#d1d7db] font-normal text-[15px] outline-none py-[9px] px-3 rounded-lg border border-[#2a3942] bg-[#2a3942] placeholder:text-[#8696a0] placeholder:pl-[4.04297px] relative placeholder:text-[15px] placeholder:leading-[22.05px] placeholder:font-normal" type="text" placeholder="Bir mesaj yazın"/>
        </div>
    )
}