'use client'

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserType } from "@/src/models/users";

export default function AuthButtons() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState<UserType>({} as UserType);
    const router = useRouter();
    const handleLogout = () => {
        //some logic here
        setIsLoggedIn(false);
        router.refresh();
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
                isLoggedIn && <div>
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