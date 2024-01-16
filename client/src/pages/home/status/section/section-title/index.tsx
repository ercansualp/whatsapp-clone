type props = {
    title: string
}

export default function SectionTitle(props: props) {
    const {title} = props;
    return <div className="flex flex-col pt-[30px] pl-8 pb-[15px] text-[#008069] text-base font-normal leading-4 uppercase">{title}</div>
}