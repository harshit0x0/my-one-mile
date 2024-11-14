'use client'
import React from "react"
import Image from "next/image"
import logo from '../../public/logo-dark.png'
import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/header"
import LoadingRing from "../components/LoadingRing"
import Alert from "../components/Alert"

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [alert, setAlert] = React.useState<{ type: string, text: string }>({ type: '', text: '' });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        let res = null;
        try {
            res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });
        } catch (e) {
            setAlert({ type: 'error', text: 'Failed to create user' });
            console.log(e);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        if (res.ok) {
            setAlert({ type: 'success', text: 'User created successfully' });
            const user = await res.json();
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            router.push('/');
        } else {
            router.push('/signup');
            setAlert({ type: 'error', text: await res.text() });
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
                        Create an account
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
                                    className="block w-full rounded-md p-1.5 text-text placeholder:text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-text">
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
                                    className="block w-full rounded-md p-1.5 text-text placeholder:text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-text shadow-sm bg-secondary hover:bg-secondary_accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {!isLoading && <>Sign up</>}
                                {isLoading && <LoadingRing />}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-text">
                        Already a member?{' '}
                        <Link href="/login" className="font-semibold leading-6 text-secondary hover:text-secondary_accent">
                            Login
                        </Link>
                    </p>

                </div>

                <Link href="/" className="text-center mt-8 font-semibold leading-6 text-secondary hover:text-secondary_accent">
                    Home
                </Link>
            </div>
        </div>
    )

}