import Image from "next/image"
import profileIcon from "../../public/profile-icon.png"
import { UserType } from "@/src/models/users"
import { getImageURL } from "../actions";
export default async function ProfileCard({ user }: { user: UserType }) {

    const imageURL = user?.image_id ? await getImageURL(user.image_id) : null;
    return (
        <div className="border mx-auto flex flex-col justify-center p-5 bg-gray-100 w-2/4 my-10">
            <h1 className="text-3xl text-center">Your profile</h1>
            <div className="border mx-auto p-6 my-5 bg-white flex items-center">
                <Image src={imageURL || profileIcon} width={150} height={150} alt="profile-pictuer" priority={true} />
                <div className="mx-5">
                    <h1 className="text-2xl font-bold d-inline">{user?.name || user?.email || "-----------"}</h1>
                    <div className="text-xl d-inline mt-2 text-gray-500">{user?.location || "unknown"}</div>
                    <div className="text-md d-inline mt-2 text-gray-500">{user?.dob?.toString() || ""}</div>
                </div>
            </div>
        </div>
    )
}