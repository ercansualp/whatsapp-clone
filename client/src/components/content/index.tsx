type props = {
    children: any
}

export default function Content(props: props) {
    const {children} = props;
    return (
        <div className="!max-h-[calc(100%-99px)] grow flex flex-col overflow-x-hidden overflow-y-auto bg-[#111b21] text-[#e9edef]">
            {children}
        </div>
    )
}