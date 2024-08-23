"use client"

import Link from "next/link";
import logo from '../public/logo-white.png';
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserType } from "../models/users";
export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUser = localStorage.getItem('user');
            setIsLoggedIn(!!storedUser);
            if (storedUser) {
                const user = JSON.parse(storedUser);
                console.log(user);
                setUser(user);
            }
        }
    }, []);

    function handleLogout() {
        setUser(null);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    }

    return (
        <div className="w-full border-b-2 flex flex-1 justify-between items-center p-3 bg-orange">
            <div className="inline-flex justify-center items-center">
                <span className="mx-2"><Image src={logo} alt="my-one-mile-logo" className="mx-auto h-12 w-auto" /></span>
                <span>My One Mile</span>
            </div>
            {
                !isLoggedIn &&
                <div className="">
                    <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="/login">Login</Link>
                    <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="/signup">Sign Up</Link>
                </div>
            }
            {
                isLoggedIn && user && <div>
                    <div className="">
                        <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="/profile">{user.name ? user.name : user.email}</Link>
                    </div>
                    <div>
                        <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="#" onClick={handleLogout}>Logout</Link>
                    </div></div>
            }
        </div>
    );
}