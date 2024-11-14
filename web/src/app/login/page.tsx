'use client'
import React from "react";
import Image from "next/image"
import logo from '../../public/logo-dark.png'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { revalidateGivenPath } from "../actions";
import Header from "../components/header";
import Alert from "../components/Alert";
import LoadingRing from "../components/LoadingRing";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [alert, setAlert] = React.useState<{ type: string, text: string }>({ type: '', text: '' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        let res = null;
        try {
            res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
        // @ts-ignore
        if (!res.ok) { setAlert({ text: await res.text(), type: 'error' }) }
        else {
            const details = await res?.json();
            localStorage.setItem("user", JSON.stringify(details));
            setAlert({ type: 'success', text: "Successfully logged in" });
            revalidateGivenPath('/');
            router.push('/');
        }
    }

    return (
        <div className="bg-background mx-auto">
            <Header user={null} />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-background">
                {alert.text !== '' && <Alert type={alert.type as any} message={alert.text} onClose={() => setAlert({ type: '', text: '' })} />}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image src={logo} alt="my-one-mile-logo" className="mx-auto h-12 w-auto" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-text">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md p-1.5 placeholder:text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-text">
                                    Password
                                </label>
                                <div className="text-xs">
                                    <a href="#" className="font-semibold text-secondary hover:text-secondary_accent">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full p-1.5 rounded-md placeholder:text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-secondary hover:bg-secondary_accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {!isLoading && <>Sign in</>}
                                {isLoading && <LoadingRing />}
                            </button>
                        </div>
                    </form>

                </div>
                <p className="mt-10 text-center text-sm text-text">
                    Not a member?{' '}
                    <Link href="/signup" className="font-semibold leading-6 text-secondary hover:text-secondary_accent">
                        Sign up!
                    </Link>
                </p>
                <Link href="/" className="text-center mt-8 font-semibold leading-6 text-secondary hover:text-secondary_accent">
                    Home
                </Link>
            </div>
        </div>
    )


}