import Image from "next/image"
import profileIcon from "../../public/profile-icon.png"
import { UserType } from "@/src/models/users"
import { getImageURL, getLocation } from "../actions";

export default async function ProfileCard({ user }: { user: UserType }) {
    const imageURL = user?.image_id ? await getImageURL(user.image_id) : null;
    const location = user?.location ? await getLocation(user.location) : null;

    return (
        <div className="mx-auto p-4 sm:p-6 md:p-8 bg-background w-full max-w-2xl rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl text-center mb-6 font-bold text-text">Your Profile</h1>
            <div className="p-6 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative mb-4">
                    <Image
                        src={imageURL || profileIcon}
                        layout="fill"
                        objectFit="cover"
                        alt="profile-picture"
                        priority={true}
                        className="rounded-full"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 text-text">{user?.name || user?.email || "-----------"}</h2>
                    <p className="text-secondary font-semibold mb-1">
                        {location ? `${location.block}, ${location.city}, ${location.state}` : "Location unknown"}
                    </p>
                    <p className="text-secondary">{user?.dob?.toString() || ""}</p>
                </div>
            </div>
        </div>
    );
}
