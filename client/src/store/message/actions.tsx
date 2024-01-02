import store from "~/store/index.js";
import { _setTyping } from "~/store/message/index.js";

export const setTyping = (typing) => store.dispatch(_setTyping(typing));