import {useSelector} from "react-redux";

export const useTyping = () => useSelector((state) => state.message.typing);