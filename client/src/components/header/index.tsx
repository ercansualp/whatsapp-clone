type props = {
    children: any,
    title: string,
    setValue: any
}
export default function Header(props: props) {
    const {children, title, setValue} = props;
    return (
        <header className="pl-[23px] pr-5 h-[108px] flex items-end bg-[#202c33]">
            <div className="h-[59px] flex items-center justify-between text-[#d9dee0] w-full">
                <div className="flex gap-[29px]">
                    <button className="w-6 h-6" onClick={() => setValue(0)}>
                        <svg viewBox="0 0 24 24" height={24} width={24}><path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z" /></svg>
                    </button>
                    <h1 className="text-[19px] font-medium leading-[23px]">{title}</h1>
                </div>
                {children}
            </div>
        </header>
    )
}