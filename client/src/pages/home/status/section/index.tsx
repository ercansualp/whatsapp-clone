import AvatarPicture from "~/assets/img/Avatar.png";
import SectionTitle from "~/pages/home/status/section/section-title";
import SectionContent from "~/pages/home/status/section/section-content";
import ContactStatus from "~/pages/home/status/section/section-content/contact-status";

type props = {
    title: string
}

export default function Section (props: props){
    const {title} = props;
    return (
        <div className="flex flex-col">
            <SectionTitle title={title} />
            <SectionContent>
                <ContactStatus fullName="John DOE" avatar={AvatarPicture} lastSeen={new Date()} />
                <ContactStatus fullName="John DOE" avatar={AvatarPicture} lastSeen={new Date()} />
            </SectionContent>
        </div>
    )
}