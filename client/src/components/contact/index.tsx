import Avatar from "~/components/avatar";
import Hr from "~/components/hr";
import {setContact} from "~/store/auth/actions.tsx";

type props = {
    contact: object
}

export default function Contact(props: props) {
    const {contact} = props;

    const handleSetContact = () => {
        console.log("contact bilgisi: ", contact);
        setContact(contact);
    }

    return (
        <>
            <button onClick={handleSetContact} className="w-full h-[72px] flex items-center pr-[30px] pl-[13px] gap-[13px]  hover:bg-[#202c33] transition-all">
                <Avatar avatar={contact.avatar} width={49} height={49} />
                <div className="flex flex-col items-start font-normal">
                    <div className="text-[#e9edef] text-[17px]">{contact.fullName}</div>
                    <div className="text-[#8696a0] text-[14px] leading-5">{contact.about}</div>
                </div>
            </button>
            <Hr/>
        </>
    )
}