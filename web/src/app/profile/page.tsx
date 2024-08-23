'use client'
import Image from "next/image"
import profile from "../../public/profile-icon.png"
import { useRouter } from "next/navigation";
import { UserType } from "@/src/models/users";
import { FormEvent, useEffect, useState } from "react";
import LocationSelect from "@/src/components/LocationSelect";
import { ICountry, IState, ICity } from 'country-state-city'
import { Country } from "country-state-city";

export default function Profile() {
    const router = useRouter();

    const [data, setData] = useState<string | null>(null)
    useEffect(() => {
        const StoredData = localStorage.getItem('user') ?? null;
        if (StoredData === null) {
            router.push('/login');
        }
        setData(StoredData);
    }, []);

    const user: UserType = JSON.parse(data ?? "{}");

    type locationType = {
        country: ICountry,
        state: IState | null,
        city: ICity | null
    }
    const IN = Country.getCountryByCode('IN');

    const [location, setLocation] = useState({ country: IN, state: null, city: null } as locationType);
    function setState(state: IState) {
        setLocation({ ...location, state: state });
    }
    function setCity(city: ICity) {
        setLocation({ ...location, city: city });
    }


    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fileInput = event.currentTarget.querySelector("input[type=file]") as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            formData.append('file', file);
        }
        console.log(data);
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: formData as FormData
        })
        if (res.ok) {
            alert("Profile updated successfully");
        } else {
            alert("Failed to update profile");
        }
    }

    return (
        <>
            <div className="border mx-auto flex flex-col justify-center p-5 bg-gray-100">
                <h1 className="text-3xl text-center">Your profile</h1>
                <div className="border mx-auto p-6 my-5 bg-white flex items-center">
                    <Image src={profile} width={150} height={150} alt="profile-pictuer" />
                    <div className="mx-5">
                        <h1 className="text-2xl font-bold d-inline">{user.name || user.email || "-----------"}</h1>
                        <div className="text-xl d-inline mt-2 text-gray-500">{user.location || "unknown"}</div>
                        <div className="text-md d-inline mt-2 text-gray-500">{user.dob?.toDateString() || ""}</div>
                    </div>
                </div>
            </div>
            <div className="border mx-auto flex flex-col justify-center px-5 py-10 bg-gray-300">
                <h1 className="text-3xl text-center">Edit profile</h1>

                <form action="" onSubmit={handleFormSubmit} className="mx-auto flex flex-col w-3/4 justify-center place-items-center px-5 py-10 my-5 bg-gray-100">

                    {/* profile photo */}
                    <div className="shrink-0 flex flex items-center">
                        <Image className="h-16 w-16 object-cover rounded-full" src={profile} alt="Current profile photo" />
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
                            placeholder={user.name || "----------"}
                            className="ml-3 px-3"
                        />
                    </div>

                    {/* location */}
                    <div className="mt-5 flex lg:w-2/4 sm:w-3/4">
                        <div>Location</div>
                        <div>
                            <LocationSelect
                                CountryCode={location.country.isoCode}
                                StateCode={location.state?.isoCode || null}
                                setCity={setCity}
                                setState={setState}
                                className="ml-3"
                            />
                        </div>
                    </div>


                    {/* DOB */}
                    <div className="mt-5 flex lg:w-2/4 sm:w-3/4">
                        <label htmlFor="dob" className="block font-medium leading-8 text-gray-900">DOB</label>
                        <input type="date"
                            id="dob"
                            name="dob"
                            placeholder={user.dob?.toDateString() || "----------"}
                            className="block w-full mx-3 px-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <button className="mt-5 w-1/4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                </form >
            </div >
        </>
    )

}