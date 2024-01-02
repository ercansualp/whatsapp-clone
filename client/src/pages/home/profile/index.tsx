import Header from "~/components/header";
import Content from "~/components/content";
import DefaultAvatar from "~/assets/img/DefaultAvatar.jpg";
import {useCurrentUser} from "~/store/auth/hooks.tsx";
import {useState} from "react";
import classNames from "classnames";
import axios from "axios";
import {setCurrentUser} from "~/store/auth/actions.tsx";

type props = {
    setValue: any
}

export default function Profile(props: props) {
    const {setValue} = props;
    const currentUser = useCurrentUser();

    const [data, setData] = useState({
        _id: currentUser._id,
        fullName: currentUser.fullName,
        avatar: currentUser.avatar,
        about: currentUser.about,
        newAvatar: null
    });

    const [editFullName, setEditFullName] = useState(false);
    const [editAbout, setEditAbout] = useState(false);
    const [focusFullName, setFocusFullName] = useState(false);
    const [focusAbout, setFocusAbout] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const updateUser = async () => {
        const response = await axios.patch("http://localhost:5000/user", data);
        if(response.data) {
            setCurrentUser(response.data);
            setEditFullName(false);
            setEditAbout(false);
            setFocusFullName(false);
            setFocusAbout(false);
        }
    }

    const handleSubmit = () => updateUser();

    const handleChangeFile = async (event) => {
        let file = event.target.files[0];

        if(file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const response1 = await axios.post("http://localhost:5000/user/uploadAvatar", formData);
                let avatarPath = response1.data;
                avatarPath = avatarPath.replace("\\", "/");
                avatarPath = "http://localhost:5000/" + avatarPath;
                await axios.patch("http://localhost:5000/user/", {
                    _id: data._id,
                    avatar: avatarPath,
                    about: data.about,
                    fullName: data.fullName,
                    oldAvatarPath: currentUser.avatar
                });
                setData({
                    ...data,
                    newAvatar: avatarPath
                });
                setCurrentUser({
                    ...currentUser,
                    avatar: avatarPath
                });
            } catch(error) {

            }
        }
    }

    return (
        <>
            <Header title="Profil" setValue={setValue} />
            <Content>
                <div className="my-7 flex justify-center items-center">
                    <label className="cursor-pointer group relative w-[200px] h-[200px]">
                        <input type="file" className="hidden" onChange={handleChangeFile}/>
                        <img src={data.newAvatar || data.avatar || DefaultAvatar} alt="Avatar" className="w-full h-full object-cover rounded-full"/>
                        <div className="opacity-0 group-hover:opacity-100 gap-2.5 items-center justify-center hidden group-hover:absolute group-hover:flex left-0 top-0 rounded-full pt-[15px] transition-all w-full h-full bg-[#1e2a31cc] flex-col">
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>camera</title><path fill="currentColor" d="M21.317,4.381H10.971L9.078,2.45C8.832,2.199,8.342,1.993,7.989,1.993H4.905 c-0.352,0-0.837,0.211-1.078,0.468L1.201,5.272C0.96,5.529,0.763,6.028,0.763,6.38v1.878c0,0.003-0.002,0.007-0.002,0.01v11.189 c0,1.061,0.86,1.921,1.921,1.921h18.634c1.061,0,1.921-0.86,1.921-1.921V6.302C23.238,5.241,22.378,4.381,21.317,4.381z  M12.076,18.51c-3.08,0-5.577-2.497-5.577-5.577s2.497-5.577,5.577-5.577s5.577,2.497,5.577,5.577 C17.654,16.013,15.157,18.51,12.076,18.51z M12.076,9.004c-2.17,0-3.929,1.759-3.929,3.929s1.759,3.929,3.929,3.929 s3.929-1.759,3.929-3.929C16.004,10.763,14.245,9.004,12.076,9.004z"></path></svg>
                            <div className="text-[#e9edefcc] uppercase text-center font-normal text-[13px] leading-[15.6px] flex flex-col">
                                <span>profil</span>
                                <span>fotoğrafını</span>
                                <span>değiştir</span>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="mb-2.5 px-[30px] pt-3.5 pb-2.5 flex flex-col gap-y-3.5">
                    <span className="text-[#008069] text-sm font-normal leading-[16.8px]">Adınız</span>
                    {
                        editFullName ? (
                            <div className={classNames("border-b-2 pb-[5px] flex justify-between items-center transition-all", {
                                "border-b-[#8696a0]": !focusFullName,
                                "border-b-[#00a884]": focusFullName
                            })}>
                                <input value={data.fullName} onChange={handleChange} name="fullName" onBlur={() => setFocusFullName(false)} onFocus={() => setFocusFullName(true)} className="w-[80%] text-[#d1d7db] text-[17px] font-normal leading-[24.99px] outline-none bg-[#111b21]" type="text"/>
                                <div className="grow flex items-center justify-center">
                                    <div className="ml-[5px] mr-[3px] text-[#54656f] font-normal leading-[22px] text-sm">13</div>
                                    <button className="ml-[5px] mr-[3px]">
                                        <svg viewBox="0 0 20 20" height="20" width="20" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 20 20"><title>emoji-input</title><path fill="#8696a0" d="M9.5,1.7C4.8,1.7,1,5.5,1,10.2s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S14.2,1.7,9.5,1.7z  M9.5,17.6c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S13.6,17.6,9.5,17.6z"></path><path fill="currentColor" d="M6.8,9.8C7.5,9.7,8,9.1,7.9,8.4C7.8,7.8,7.4,7.3,6.8,7.3C6.1,7.3,5.6,8,5.7,8.7 C5.7,9.3,6.2,9.7,6.8,9.8z"></path><path fill="currentColor" d="M13.9,11.6c-1.4,0.2-2.9,0.3-4.4,0.4c-1.5,0-2.9-0.1-4.4-0.4c-0.2,0-0.4,0.1-0.4,0.3 c0,0.1,0,0.2,0,0.2c0.9,1.8,2.7,2.9,4.7,3c2-0.1,3.8-1.2,4.8-3c0.1-0.2,0-0.4-0.1-0.5C14.1,11.6,14,11.6,13.9,11.6z M9.8,13.6 c-2.3,0-3.5-0.8-3.7-1.4c2.3,0.4,4.6,0.4,6.9,0C13,12.3,12.6,13.6,9.8,13.6L9.8,13.6z"></path><path fill="currentColor" d="M12.2,9.8c0.7-0.1,1.2-0.7,1.1-1.4c-0.1-0.6-0.5-1.1-1.1-1.1c-0.7,0-1.2,0.7-1.1,1.4 C11.2,9.3,11.6,9.7,12.2,9.8z"></path></svg>
                                    </button>
                                    <button onClick={handleSubmit}>
                                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>checkmark</title><path fill="#8696a0" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between pt-2 gap-[5px] items-center">
                                <span className="text-[#d1d7db] font-normal text-base leading-5">{data.fullName}</span>
                                <button onClick={() => setEditFullName(!editFullName)}>
                                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="#8696a0" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path></svg>
                                </button>
                            </div>
                        )
                    }
                </div>
                <div className="mt-1 mb-7 ml-[30px] mr-5 text-[#8696a0] text-sm font-normal leading-[20.0004px]">
                    Bu, kullanıcı adınız veya anahtarınız değildir. Bu ad WhatsApp kişileriniz tarafından görülebilir.
                </div>
                <div className="mb-2.5 px-[30px] pt-3.5 pb-2.5 flex flex-col gap-y-3.5">
                    <span className="text-[#008069] text-sm font-normal leading-[16.8px]">Hakkımda</span>
                    {
                        editAbout ? (
                            <>
                                <div className={classNames("border-b-2 pb-[5px] flex justify-between items-center transition-all", {
                                    "border-b-[#8696a0]": !focusAbout,
                                    "border-b-[#00a884]": focusAbout
                                })}>
                                    <input value={data.about} onChange={handleChange} name="about" onBlur={() => setFocusAbout(false)} onFocus={() => setFocusAbout(true)} className="w-[80%] text-[#d1d7db] text-[17px] font-normal leading-[24.99px] outline-none bg-[#111b21]" type="text"/>
                                    <div className="grow flex items-center justify-end">
                                        <button className="ml-[5px] mr-[3px]">
                                            <svg viewBox="0 0 20 20" height="20" width="20" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 20 20"><title>emoji-input</title><path fill="#8696a0" d="M9.5,1.7C4.8,1.7,1,5.5,1,10.2s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S14.2,1.7,9.5,1.7z  M9.5,17.6c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S13.6,17.6,9.5,17.6z"></path><path fill="currentColor" d="M6.8,9.8C7.5,9.7,8,9.1,7.9,8.4C7.8,7.8,7.4,7.3,6.8,7.3C6.1,7.3,5.6,8,5.7,8.7 C5.7,9.3,6.2,9.7,6.8,9.8z"></path><path fill="currentColor" d="M13.9,11.6c-1.4,0.2-2.9,0.3-4.4,0.4c-1.5,0-2.9-0.1-4.4-0.4c-0.2,0-0.4,0.1-0.4,0.3 c0,0.1,0,0.2,0,0.2c0.9,1.8,2.7,2.9,4.7,3c2-0.1,3.8-1.2,4.8-3c0.1-0.2,0-0.4-0.1-0.5C14.1,11.6,14,11.6,13.9,11.6z M9.8,13.6 c-2.3,0-3.5-0.8-3.7-1.4c2.3,0.4,4.6,0.4,6.9,0C13,12.3,12.6,13.6,9.8,13.6L9.8,13.6z"></path><path fill="currentColor" d="M12.2,9.8c0.7-0.1,1.2-0.7,1.1-1.4c-0.1-0.6-0.5-1.1-1.1-1.1c-0.7,0-1.2,0.7-1.1,1.4 C11.2,9.3,11.6,9.7,12.2,9.8z"></path></svg>
                                        </button>
                                        <button onClick={handleSubmit}>
                                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>checkmark</title><path fill="#8696a0" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between pt-2 gap-[5px] items-center">
                                <span className="text-[#d1d7db] font-normal text-base leading-5">{data.about}</span>
                                <button onClick={() => setEditAbout(true)}>
                                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="#8696a0" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path></svg>
                                </button>
                            </div>
                        )
                    }
                </div>
            </Content>
        </>
    )
}