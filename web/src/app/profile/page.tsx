import { getUser } from "../actions";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
export default async function Profile() {
    const user = await getUser();
    return (
        <div className="bg-violet-200 py-8 space-y-10">
            {user && <ProfileCard user={user} />}
            {user && <ProfileForm user={user} />}
        </div>
    )

}