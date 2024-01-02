import Avatar from "~/components/avatar";
import Call from "./call";
import Search from "./search";
import Menu from "./menu";
import {useContacts} from "~/store/message/hooks.tsx";

export default function Header() {
    const contact = useContacts().find(contact => contact.active);

    const getLastSeen = (date) => {
        // Verilen tarih bilgisi
        const verilenTarih = new Date(date);

        // Şu anki tarih ve saat bilgisi
        const suAnkiTarih = new Date();

        // Belirtilen tarih bu hafta içinde mi kontrolü
        const haftaIci = verilenTarih.getDay() >= 1 && verilenTarih.getDay() <= 5;

        if (haftaIci) {
            if (verilenTarih.toDateString() === suAnkiTarih.toDateString()) {
                // Belirtilen tarih bugün, sadece saat ve dakika bilgisi
                let saat = verilenTarih.getHours();
                saat = saat.toString().length === 1 ? "0" + saat.toString() : saat.toString();
                let dakika = verilenTarih.getMinutes();
                dakika = dakika.toString().length === 1 ? "0" + dakika.toString() : dakika.toString();
                return "son görülme bugün " + saat + ":" + dakika;
            } else {
                // Belirtilen tarih bu hafta içinde, ama bugün değil, gün, saat ve dakika bilgisi
                const gunAdi = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"][verilenTarih.getDay()];
                let saat = verilenTarih.getHours();
                saat = saat.toString().length === 1 ? "0" + saat.toString() : saat.toString();
                let dakika = verilenTarih.getMinutes();
                dakika = dakika.toString().length === 1 ? "0" + dakika.toString() : dakika.toString();
                return "son görülme " + gunAdi + " " + saat + ":" + dakika
            }
        } else {
            // Belirtilen tarih bu hafta içinde değil, tarih, saat ve dakika bilgisi
            const tarih = verilenTarih.toLocaleDateString();
            let saat = verilenTarih.getHours();
            saat = saat.toString().length === 1 ? "0" + saat.toString() : saat.toString();
            let dakika = verilenTarih.getMinutes();
            dakika = dakika.toString().length === 1 ? "0" + dakika.toString() : dakika.toString();
            return "son görülme " + tarih + " " + saat + ":" + dakika
        }
    }

    return (
        <div className="flex bg-[#202c33] py-2.5 px-4 h-[59px] items-center">
            <div className="width-[55px] h-10 pr-[15px]">
                <Avatar avatar={contact.avatar} width={40} height={40} />
            </div>
            <div className="grow flex flex-col">
                <span className="text-[#e9edef] leading-[21px] text-base font-medium">{contact.fullName}</span>
                <span className="text-[13px] text-[#8696a0] font-normal leading-[20.0005px]">
                    {contact.typing ? "yazıyor..." : contact.online ? "çevrimiçi" : getLastSeen(contact.lastSeen)}
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