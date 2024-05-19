import Actions from "./actions";

export default function SelectedMessage() {
    return (
        <div className="w-full h-full bg-red-400 flex flex-col justify-center bg-[#101a20]">
            <Actions />
            <div className="grow"></div>
            <div></div>
        </div>
    )
}