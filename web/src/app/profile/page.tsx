import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import { UserType } from "@/src/models/users";

export default function Profile() {

    const user: UserType = {
        id: '234',
        name: "",
        password: "",
        location: "",
        email: "",
        createdAt: new Date(Date.now()),
        dob: null,
        role_id: 4,
        image_id: ""
    };

    return (
        <>
            <ProfileCard user={user} />
            <ProfileForm user={user} />
        </>
    )

}