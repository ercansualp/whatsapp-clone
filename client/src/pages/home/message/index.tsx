import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import DownloadWhatsapp from "~/assets/img/DownloadWhatsapp.png";
import {useState} from "react";
import {useContact} from "~/store/auth/hooks.tsx";

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const contact = useContact();

    return (
        <div className="grow flex flex-col border-l border-l-[#8696a026]">
            {
                contact ? (
                    <>
                        <Header typing={typing} />
                        <Content messages={messages} setMessages={setMessages} setTyping={setTyping} />
                        <Footer setMessages={setMessages} />
                    </>
                ) : (
                    <div className="relative bg-[#222e35] w-full h-full flex items-center justify-center py-7 border-l border-l-[#8696a026]">
                        <div className="max-w-[560px] w-4/5 flex flex-col items-center">
                            <img className="flex justify-center items-center object-cover" src={DownloadWhatsapp} alt="Photo" width={320} height={188}/>
                            <div className="flex flex-col">
                                <h1 className="mt-[38px] text-[#e9edefe0] text-4xl leading-9 font-light text-center">Windows için WhatsApp'ı indirin</h1>
                                <div className="mt-6 text-[#8696a0] font-normal	text-sm	leading-5 text-center">
                                    Yeni Windows uygulamasını indirerek arama yapın, ekranınızı paylaşın ve daha hızlı bir deneyim yaşayın.
                                </div>
                                <div className="mt-8 flex justify-center items-center">
                                    <button className="bg-[#00a884] rounded-3xl	py-2.5 px-6 border border-[#00000000] h-[38px] flex justify-center items-center text-sm	font-medium	leading-[16.0006px] text-[#111b21]">
                                        Uygulamayı indir
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-10 text-[#667781] flex font-normal text-sm leading-5 items-center gap-1">
                            <svg viewBox="0 0 10 12" height="12" width="10" preserveAspectRatio="xMidYMid meet" className="" version="1.1"><title>lock-small</title><path d="M5.00847986,1.6 C6.38255462,1.6 7.50937014,2.67435859 7.5940156,4.02703389 L7.59911976,4.1906399 L7.599,5.462 L7.75719976,5.46214385 C8.34167974,5.46214385 8.81591972,5.94158383 8.81591972,6.53126381 L8.81591972,9.8834238 C8.81591972,10.4731038 8.34167974,10.9525438 7.75719976,10.9525438 L2.25767996,10.9525438 C1.67527998,10.9525438 1.2,10.4731038 1.2,9.8834238 L1.2,6.53126381 C1.2,5.94158383 1.67423998,5.46214385 2.25767996,5.46214385 L2.416,5.462 L2.41679995,4.1906399 C2.41679995,2.81636129 3.49135449,1.68973395 4.84478101,1.60510326 L5.00847986,1.6 Z M5.00847986,2.84799995 C4.31163824,2.84799995 3.73624912,3.38200845 3.6709675,4.06160439 L3.6647999,4.1906399 L3.663,5.462 L6.35,5.462 L6.35111981,4.1906399 C6.35111981,3.53817142 5.88169076,2.99180999 5.26310845,2.87228506 L5.13749818,2.85416626 L5.00847986,2.84799995 Z" fill="currentColor"></path></svg>
                            <span>Uçtan uca şifrelenmiş</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}