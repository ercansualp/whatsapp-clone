import {useSelector} from "react-redux";

export const useMessage = () => useSelector((state) => state.message.message);
export const useMessages = () => useSelector((state) => state.message.messages);
export const usePhotosAndVideos = () => useSelector((state) => state.message.photosAndVideos);
export const useContacts = () => useSelector((state) => state.message.contacts);