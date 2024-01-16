import Avatar from "~/components/avatar";
import ContactName from "~/pages/home/status/section/section-content/contact-status/contact-name/indext.tsx";
import ContactLastSeen from "~/pages/home/status/section/section-content/contact-status/contact-last-seen";

type props = {
    avatar: any,
    fullName: string,
    lastSeen: Date
}

export  default function ContactStatus(props: props) {
    const {avatar} = props;

    return (
        <div className="h-[72px] flex items-center">
            <div className="mt-0.5 p-3 flex items-center justify-center">
                <div className="h-12 w-12 flex items-center justify-center">
                    <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                    <Avatar avatar={avatar} width={40} height={40} />
                </div>
                <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                    <ContactName title="John DOE" />
                    <ContactLastSeen lastSeen={new Date()} />
                </div>
            </div>
        </div>
    )
}