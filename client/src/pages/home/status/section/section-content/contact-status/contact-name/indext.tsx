type props = {
    title: string
}

export default function ContactName(props: props) {
    const {title} = props;
    return <span className="text-[#d1d7db] text-base">{title}</span>
}