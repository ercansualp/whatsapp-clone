import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import {useContacts} from "~/store/message/hooks.tsx";

export default function Message() {
    const contact = useContacts().find(contact => contact.active);

    return (
        <div className="grow flex flex-col border-l border-l-[#8696a026]">
            {
                contact ? (
                    <>
                        <Header />
                        <Content />
                        <Footer />
                    </>
                ) : (
                    <div className="relative bg-[#222e35] w-full h-full flex items-center justify-center py-7 border-l border-l-[#8696a026] text-blue-400 text-[20px] flex-col gap-5">
                        <span className="italic underline text-2xl">This application has been created by Ercan SUALP</span>
                        <span>It is a messaging application.</span>
                        <span>CV: &nbsp;&nbsp;&nbsp;<a href="http://localhost:5173/src/assets/files/ErcanSualp-CV-EN.docx" className="text-purple-600">ErcanSualp-CV-EN.docx</a></span>
                        <span>Github: <a href="https://github.com/ercansualp" target="_blank" className="text-purple-600">https://github.com/ercansualp</a></span>
                        <span>Linkedin: <a href="https://www.linkedin.com/in/ercan-sualp-1b907b236/" target="_blank" className="text-purple-600">https://www.linkedin.com/in/ercan-sualp-1b907b236/</a></span>
                        <div className="absolute bottom-5 w-full mx-auto flex justify-center">&copy; All rights reserved</div>
                    </div>
                )
            }
        </div>
    )
}