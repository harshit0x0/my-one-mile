import { getUser } from "../actions";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
export default async function Profile() {
    const user = await getUser();
    return (
        <>
            {user && <ProfileCard user={user} />}
            {user && <ProfileForm user={user} />}
        </>
    )

}