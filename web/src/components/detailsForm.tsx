'use client'
import { FormEvent } from "react";

export default function DetailsForm() {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    return (
        <div className="container w-2/4 mx-auto my-5 p-5 flex flex-col items-center border bg-gray-100">
            <h1 className="text-3xl font-bold">Tell us more about yourself</h1>
            <form onSubmit={handleSubmit} className="w-10/12">
                <div className="mt-5">
                    <label htmlFor="name" className="block font-medium leading-6 text-gray-900">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="dob" className="block font-medium leading-6 text-gray-900">
                        Date of Birth
                    </label>
                    <div className="mt-2">
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="location" className="block font-medium leading-6 text-gray-900">
                        Location
                    </label>
                    <div className="mt-2">
                        <input
                            id="location"
                            name="location"
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex mt-5 w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}


