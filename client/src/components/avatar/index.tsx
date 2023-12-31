import DefaultAvatar from "~/assets/img/DefaultAvatar.jpg";
import classNames from "classnames";

type props = {
    avatar: any,
    width: number,
    height: number
}

export default function Avatar(props: props) {
    const {avatar, width, height} = props;
    return (
        <img src={avatar || DefaultAvatar} alt="Avatar" className={classNames("object-cover rounded-full")}
            style={{width: width ? width : "100%", height: height ? height : "100%"}}
        />
    )
}