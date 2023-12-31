import Avatar from "~/components/avatar";
import Call from "./call";
import Search from "./search";
import Menu from "./menu";
import {useContact} from "~/store/auth/hooks.tsx";

type props = {
    typing: boolean
}

export default function Header(props: props) {
    const {typing} = props;
    const contact = useContact();
    return (
        <div className="flex bg-[#202c33] py-2.5 px-4 h-[59px] items-center">
            <div className="width-[55px] h-10 pr-[15px]">
                <Avatar avatar={contact.avatar} width={40} height={40} />
            </div>
            <div className="grow flex flex-col">
                <span className="text-[#e9edef] leading-[21px] text-base font-medium">{contact.fullName}</span>
                <span className="text-[13px] text-[#8696a0] font-normal leading-[20.0005px]">
                    {typing ? "yazıyor..." : "Son görülme bugün 12:48"}
                </span>
            </div>
            <div className="ml-5 flex pl-2.5 gap-x-2.5 items-center">
                <Call />
                <Search />
                <Menu />
            </div>
        </div>
    )
}