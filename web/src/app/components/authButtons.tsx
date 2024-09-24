'use client'

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserType } from "@/src/models/users";
import { logout } from "../actions";

export default function AuthButtons({ user }: { user: UserType | null }) {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [])
    const router = useRouter();
    const handleLogout = async () => {
        setIsLoggedIn(false);
        await logout();
        router.push('/');
    }

    return (
        <div>
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
    )
}