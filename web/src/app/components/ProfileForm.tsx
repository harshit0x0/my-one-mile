"use client"
import Image from "next/image";
import profileIcon from "../../public/profile-icon.png";
import { useState, FormEvent } from "react";
import { UserType } from "@/src/models/users";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: UserType }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fileInput = event.currentTarget.querySelector("input[type=file]") as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            formData.append('file', file);
        }
        formData.append('id', user.id);
        setLoading(true);
        console.log(formData);
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: formData as FormData
        })
        setLoading(false);
        if (res.ok) {
            alert("Profile updated successfully");
            router.refresh();
        } else {
            alert("Failed to update profile");
        }
    }

    return (
        <div className="border mx-auto flex flex-col justify-center px-5 py-10 bg-gray-300">
            <h1 className="text-3xl text-center">Edit profile</h1>
            {loading && <p className="text-center">Loading...</p>}
            <form action="" onSubmit={handleFormSubmit} className="mx-auto flex flex-col w-3/4 justify-center place-items-center px-5 py-10 my-5 bg-gray-100">

                {/* profile photo */}
                <div className="shrink-0 flex flex items-center">
                    <Image className="h-16 w-16 object-cover rounded-full" src={profileIcon} alt="Current profile photo" />
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            className="
                                    block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                        />
                    </label>
                </div>

                {/* name */}
                <div className="mt-5 flex lg:w-2/4 sm:w-3/4">
                    <label htmlFor="name" className="block font-medium leading-8 text-gray-900">Name</label>
                    <input type="text"
                        id="name" name="name"
                        placeholder={user?.name || "----------"}
                        className="ml-3 px-3"
                    />
                </div>

                {/* DOB */}
                <div className="mt-5 flex lg:w-2/4 sm:w-3/4">
                    <label htmlFor="dob" className="block font-medium leading-8 text-gray-900">DOB</label>
                    <input type="date"
                        id="dob"
                        name="dob"
                        placeholder={user?.dob?.toString() || "----------"}
                        className="block w-full mx-3 px-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                {/* location */}
                <button className="mt-5 w-1/4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>

            </form >
        </div >
    )
}