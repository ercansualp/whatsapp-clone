import AddNewCommunity from "~/pages/home/communities/add-new-community";
import Header from "~/components/header";

type props = {
    setValue: any
}

export default function Communities(props: props) {
    const { setValue } = props;
    return (
        <>
            <Header title="Topluluklar" setValue={setValue}></Header>
            <AddNewCommunity />
        </>
    )
}