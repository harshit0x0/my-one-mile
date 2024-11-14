"use client"
import Image from "next/image";
import profileIcon from "../../public/profile-icon.png";
import { useState, FormEvent } from "react";
import { UserType } from "@/src/models/users";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import LoadingRing from "./LoadingRing";

export default function ProfileForm({ user }: { user: UserType }) {
    const azurePrimaryKey = process.env.NEXT_PUBLIC_AZURE_PRIMARY_KEY;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: string, text: string }>({ type: '', text: '' });
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
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: formData as FormData
        })
        setLoading(false);
        if (res.ok) {
            setAlert({ type: 'success', text: "Profile updated successfully" });
            console.log("Profile updated successfully");
            router.refresh();
        } else {
            console.log("Failed to update profile");
            setAlert({ type: 'error', text: "Failed to update profile, Please try again" });
        }
    }


    async function handleLocChange(e: any) {
        const currValue = e.target?.innerText;
        setLocationValue(currValue);
        if (currValue.length < 3) return;
        console.log("requesting");
        const res = await fetch(`https://atlas.microsoft.com/search/address/json?
            api-version=1.0
            &typeahead=true
            &query=${currValue}
            &subscription-key=${azurePrimaryKey}
            &countrySet=IN
            &limit=4
            `);
        const data = await res.json();
        console.log(data);
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
        <div className="mx-auto p-4 sm:p-6 md:p-8 bg-background w-full max-w-2xl rounded-lg shadow-md">
            {alert.text !== '' && <Alert type={alert.type as any} message={alert.text} onClose={() => setAlert({ type: '', text: '' })} />}
            <h1 className="text-2xl sm:text-3xl text-center mb-6 font-bold text-text">Edit Profile</h1>
            <form onSubmit={handleFormSubmit} className="p-6 rounded-lg shadow-sm">
                {/* Profile photo */}
                <div className="flex flex-col items-center mb-6">
                    <Image className="h-24 w-24 object-cover rounded-full mb-3" src={profileIcon} alt="Current profile photo" />
                    <label className="cursor-pointer bg-secondary_accent text-white py-2 px-4 rounded-full hover:bg-secondary transition duration-300">
                        <input type="file" className="block w-full text-sm text-white
                                    file:mr-4 file:py-1 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100" />
                    </label>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Name</label>
                    <input type="text"
                        id="name" name="name"
                        placeholder={user?.name || "Enter your name"}
                        className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* DOB */}
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium text-text mb-1">Date of Birth</label>
                    <input type="date"
                        id="dob"
                        name="dob"
                        placeholder={user?.dob?.toString() || "Select your date of birth"}
                        className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                </div>

                {/* Location */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-text mb-1">Location</label>
                    <div className="flex flex-col">
                        <div className="flex mb-2">
                            <div
                                contentEditable={!isLocationSet}
                                id="location"
                                onInput={handleLocChange}
                                className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${isLocationSet ? "bg-background_accent" : "bg-white"}`}
                            ></div>
                            <button
                                type="button"
                                onClick={() => setIsLocationSet(!isLocationSet)}
                                className="ml-2 px-4 py-2 bg-secondary_accent text-white rounded-md hover:bg-secondary transition duration-300"
                            >
                                {isLocationSet ? "Edit" : "Lock"}
                            </button>
                        </div>
                        {!isLocationSet && suggestions && suggestions.length > 0 && (
                            <div className="mt-2 border border-gray-200 rounded-md shadow-sm">
                                {suggestions.map((suggestion, i) => (
                                    <div
                                        key={i}
                                        id={suggestion.id}
                                        onClick={handleSelect}
                                        className="px-3 py-2 bg-violet-200 hover:bg-background cursor-pointer text-sm border-b last:border-b-0"
                                    >
                                        {`${suggestion.block}, ${suggestion.city}, ${suggestion.state}, ${suggestion.country}`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isLocationSet}
                    className={`w-full py-2 px-4 rounded-md font-semibold text-white transition duration-300 ${isLocationSet
                        ? "bg-secondary_accent hover:bg-secondary"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    {!loading && <>Save Changes</>}
                    {loading && <LoadingRing />}
                </button>
            </form>
        </div>
    );
}

