'use client'
import React from "react"
import Image from "next/image"
import logo from '../../public/logo-dark.png'
import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        setIsLoading(false);
        if (res.ok) {
            alert("successfully created user");
            const user = await res.json();
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            router.push('/');
        } else {
            router.push('/signup');
            alert("failed to create user");
            alert(await res.text());
        }

    }

    return (
        <div className="dark flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            {isLoading && <div className="text-center text-3xl">Loading ... </div>}

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image src={logo} alt="my-one-mile-logo" className="mx-auto h-12 w-auto"></Image>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create an account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md p-1.5 border-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                minLength={8}
                                maxLength={12}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                minLength={8}
                                maxLength={12}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-light-orange hover:bg-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orange"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link href="/login" className="font-semibold leading-6 text-green hover:text-green">
                        Login
                    </Link>
                </p>
            </div>
            <Link href="/" className="text-center mt-8 font-semibold leading-6 text-green hover:text-green">
                Home
            </Link>
        </div>
    )
}