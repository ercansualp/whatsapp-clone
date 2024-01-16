type props = {
    children: any
}

export  default  function SectionContent(props: props) {
    const {children} = props;
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}