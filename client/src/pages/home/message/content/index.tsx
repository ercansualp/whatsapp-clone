import Messages from "./messages";
import {useState} from "react";
import SelectedMessage from "~/pages/home/message/content/selected-message";

export default function Content() {
    const [images, setImages] = useState(["a"]);

    return <Messages images={images} />

    if(images.length === 0)
        return <Messages images={images} />
    return <SelectedMessage />
}