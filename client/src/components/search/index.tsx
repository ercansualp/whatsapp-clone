type props = {
    text: string,
    children: any,
    onChange: any
}

export default function Search(props: props) {
    const {text, children, onChange} = props;
    return (
        <div className="h-[49px] px-3 flex items-center text-[#8696a0]">
            <input onChange={onChange} type="text" className="text-[#d1d7db] pl-[65px] pr-8 rounded-lg bg-[#202c33] h-[35px] grow placeholder:text-[#8696a0] placeholder:text-sm placeholder:font-normal placeholder:leading-5 outline-none" placeholder={text}/>
            {children}
        </div>
    )
}