import Hr from "~/components/hr";

type props = {
    title: string,
    icon: any
}

export default function Item(props: props) {
    const {title, icon} = props;
    return (
        <div>
            <button className="w-full h-[72px] flex items-center pr-[30px] pl-[13px] gap-[13px]  hover:bg-[#202c33] transition-all">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#00a884]">
                    {icon}
                </div>
                <span className="text-[17px] font-normal leading-[21.9997px]">{title}</span>
            </button>
            <Hr/>
        </div>
    )
}