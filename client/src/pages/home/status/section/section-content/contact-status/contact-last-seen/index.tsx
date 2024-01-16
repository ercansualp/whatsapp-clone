type props = {
    lastSeen: any
}

export default function ContactLastSeen(props: props) {
    const {lastSeen} = props;
    const getLastSeen = () => {
        // Verilen tarih bilgisi
        const verilenTarih = new Date(lastSeen);

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

    return <span className="text-[13px] text-[#8696a0]">{getLastSeen()}</span>
}