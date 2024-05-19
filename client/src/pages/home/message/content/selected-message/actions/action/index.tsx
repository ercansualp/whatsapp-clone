type props = {
    children: any
}

export default function Action(props: props) {
    const {children} = props;

    return (
        <button className="h-10 w-10 flex items-center justify-center">
            {children}
        </button>
    )
}