import Header from "~/components/header";
import Content from "~/components/content";
import Avatar from "~/components/avatar";
import AvatarPicture from "~/assets/img/Avatar.png";
import MessagePrivacy from "~/components/message-privacy";
import Section from "~/pages/home/status/section";

type props = {
    setValue: any
}

export default function Status(props: props) {
    const {setValue} = props;
    return (
        <div className="h-full flex flex-col">
            <Header title="Durum" setValue={setValue}>
                <div className="flex gap-x-2.5">
                    <button className="p-2">
                        <svg viewBox="0 0 24 24" height={24} width={24}><path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" /></svg>
                    </button>
                    <button className="p-2">
                        <svg viewBox="0 0 24 24" height={24} width={24}><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z" /></svg>
                    </button>
                </div>
            </Header>
            <Content>
                <div className="grow flex flex-col">
                    <div className="mt-3.5 flex items-center cursor-pointer">
                        <div className="w-[68px] h-[64px] flex items-center justify-center relative">
                            <Avatar avatar={AvatarPicture} width={40} height={40} />
                            <div className="w-[19px] h-[19px] flex items-center justify-center absolute bg-[#00a884] rounded-full bottom-2.5 right-2.5 p-0.5">
                                <svg viewBox="0 0 24 24" height={10} width={10} fill="#e9edef"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z" fill="currentColor" /></svg>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between font-normal">
                            <span className="text-[#d1d7db] text-base">Durumum</span>
                            <span className="text-[13px] text-[#8696a0]">Durumuma ekle</span>
                        </div>
                    </div>
                    <Section title="en yeni">
                        <>
                            <div className="h-[72px] flex items-center">
                                <div className="mt-0.5 p-3 flex items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                                        <Avatar avatar={AvatarPicture} width={40} height={40} />
                                    </div>
                                    <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                                        <span className="text-[#d1d7db] text-base">John DOE</span>
                                        <span className="text-[13px] text-[#8696a0]">bugün 11:52</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[72px] flex items-center">
                                <div className="mt-0.5 p-3 flex items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                                        <Avatar avatar={AvatarPicture} width={40} height={40} />
                                    </div>
                                    <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                                        <span className="text-[#d1d7db] text-base">John DOE</span>
                                        <span className="text-[13px] text-[#8696a0]">bugün 11:52</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[72px] flex items-center">
                                <div className="mt-0.5 p-3 flex items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                                        <Avatar avatar={AvatarPicture} width={40} height={40} />
                                    </div>
                                    <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                                        <span className="text-[#d1d7db] text-base">John DOE</span>
                                        <span className="text-[13px] text-[#8696a0]">bugün 11:52</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Section>
                    <Section title="Görüldü">
                        <>
                            <div className="h-[72px] flex items-center">
                                <div className="mt-0.5 p-3 flex items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                                        <Avatar avatar={AvatarPicture} width={40} height={40} />
                                    </div>
                                    <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                                        <span className="text-[#d1d7db] text-base">John DOE</span>
                                        <span className="text-[13px] text-[#8696a0]">bugün 11:52</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[72px] flex items-center">
                                <div className="mt-0.5 p-3 flex items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <svg className="nxn8agaf kv6wexeh lhggkp7q" width="48" height="48" viewBox="0 0 104 104"><circle cx="52" cy="52" r="50" fill="none" stroke-linecap="round" className="j9ny8kmf" stroke-dashoffset="387.69908169872417" stroke-dasharray="94.71975511965978 10 94.71975511965978 10 94.71975511965978 10" stroke-width="4"></circle></svg>
                                        <Avatar avatar={AvatarPicture} width={40} height={40} />
                                    </div>
                                    <div className="ml-3 flex flex-col justify-between font-normal gap-y-0.5">
                                        <span className="text-[#d1d7db] text-base">John DOE</span>
                                        <span className="text-[13px] text-[#8696a0]">bugün 11:52</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Section>
                    <MessagePrivacy />
                </div>
            </Content>
        </div>
    )
}