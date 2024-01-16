import Search from "~/components/search";
import Header from "~/pages/home/contacts/header";
import Contact from "~/pages/home/contacts/contact";
import Content from "~/components/content";
import {useContacts} from "~/store/message/hooks.tsx";
import MessagePrivacy from "~/components/message-privacy";

type props = {
    setValue: any
}

export default function Contacts(props: props) {
    const {setValue} = props;
    const contacts = useContacts();

    return (
        <>
            <Header setValue={setValue} />
            <div className="flex flex-col h-full grow">
                <Search text="Aratın veya yeni sohbet başlatın">
                    <button className="mx-2 w-[26px] h-[26px] text-[#aebac1] flex justify-center items-center">
                        <svg viewBox="0 0 24 24" height={20} width={20}><path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z" /></svg>
                    </button>
                </Search>
                <Content>
                    <div className="grow overflow-y-auto">
                        {contacts.map((contact, index) => <Contact key={index} index={index} contact={contact} />)}
                    </div>
                    <MessagePrivacy />
                </Content>
            </div>
        </>
    )
}