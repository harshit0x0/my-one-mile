"use client"
import Image from "next/image";
import profileIcon from "../../public/profile-icon.png";
import { useState, FormEvent, ReactHTMLElement, ReactEventHandler } from "react";
import { UserType } from "@/src/models/users";
import { useRouter } from "next/navigation";


export default function ProfileForm({ user }: { user: UserType }) {
    const azurePrimaryKey = process.env.NEXT_PUBLIC_AZURE_PRIMARY_KEY;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    type Location = { id: string, city: string, state: string, country: string, block: string }
    const [locationValue, setLocationValue] = useState<Location | null>();
    const [isLocationSet, setIsLocationSet] = useState(true);
    const [suggestions, setSuggestions] = useState<[Location] | []>();

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fileInput = event.currentTarget.querySelector("input[type=file]") as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            formData.append('file', file);
        }
        formData.append('id', user.id as string);
        formData.append('location', JSON.stringify(locationValue));
        setLoading(true);
        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: formData as FormData
        })
        setLoading(false);
        if (res.ok) {
            alert("Profile updated successfully");
            console.log("Profile updated successfully");
            router.refresh();
        } else {
            console.log("Failed to update profile");
            alert("Failed to update profile");
        }
    }


    async function handleLocChange(e: any) {
        const currValue = e.target?.innerText;
        setLocationValue(currValue);
        console.log("requesting");
        const res = await fetch(`https://atlas.microsoft.com/search/address/json?
            api-version=1.0
            &query=${currValue}
            &subscription-key=${azurePrimaryKey}
            &limit=4
            `);
        const data = await res.json();
        const addressData = data.results?.filter(
            (entry: any) => entry.address?.municipality || entry.address?.municipalitySubdivision)
            .map((entry: any) => {
                return {
                    id: entry?.id ?? "",
                    country: entry.address?.country ?? "",
                    state: entry.address?.countrySubdivision ?? "",
                    city: entry.address?.municipality ?? "",
                    block: entry.address?.municipalitySubdivision ?? entry.address?.municipality ?? ""
                }
            });
        setSuggestions(addressData ?? []);
    }

    async function handleSelect(e: any) {
        const inputText = e.target.innerText;
        const locArray = inputText.split(", ");
        setLocationValue({ id: e.target.id, block: locArray[0], city: locArray[1], state: locArray[2], country: locArray[3] });
        const inputElement = document.querySelector("#location");
        if (inputElement) inputElement.textContent = inputText;
        setIsLocationSet(true);
    }

    return (
        <div className="border mx-auto flex flex-col justify-center px-5 py-10 bg-gray-300">
            <h1 className="text-3xl text-center">Edit profile</h1>
            {loading && <p className="text-center">Loading...</p>}
            <form action="" onSubmit={handleFormSubmit} className="mx-auto flex flex-col w-full lg:w-3/4 justify-center items-center px-10 py-10 my-5 bg-gray-100">

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
                <div className="mt-5 flex w-3/4">
                    <label htmlFor="name" className="block font-medium leading-8 text-gray-900">Name</label>
                    <input type="text"
                        id="name" name="name"
                        placeholder={user?.name || "----------"}
                        className="ml-3 px-3"
                    />
                </div>

                {/* DOB */}
                <div className="mt-5 flex lg:w-3/4 sm:w-3/4">
                    <label htmlFor="dob" className="block font-medium leading-8 text-gray-900">DOB</label>
                    <input type="date"
                        id="dob"
                        name="dob"
                        placeholder={user?.dob?.toString() || "----------"}
                        className="appearence-none w-full  mx-3 px-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                {/* location */}
                <div className="mt-5 align-items-center lg:w-3/4 sm:w-3/4 flex">

                    <div className="block font-medium leading-8 text-gray-900">Location</div>
                    <div className="flex flex-col w-full mx-3">
                        <div className="flex">
                            <div
                                contentEditable={!isLocationSet}
                                id="location"
                                onInput={handleLocChange}
                                className={"w-full min-w-40 " + (isLocationSet ? " bg-gray-200 text-gray-400 " : " bg-white ") + "rounded-sm h-full p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"}
                            ></div>
                            <div className="ml-3 bg-gray-400 px-3 py-1" onClick={() => setIsLocationSet(!isLocationSet)}> Edit </div>
                        </div>
                        <div className="w-full bg-white mt-2 px-3 rounded-sm h-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">

                            {!isLocationSet &&
                                suggestions?.map((suggestion, i) =>
                                    <div
                                        key={i}
                                        id={suggestion.id}
                                        onClick={handleSelect}
                                        className="border-b-2 border-gray-200 text-sm pt-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {suggestion.block + ", " + suggestion.city + ", " + suggestion.state + ", " + suggestion.country}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>

                <button
                    disabled={!isLocationSet}
                    className={"mt-5 w-1/4" + (isLocationSet ? " bg-indigo-500 hover:bg-indigo-700 " : " bg-gray-500 ") + " text-white font-bold py-2 px-4 rounded"}>Save Changes</button>

            </form >
        </div >
    )
}

