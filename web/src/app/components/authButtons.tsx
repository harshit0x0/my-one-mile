'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserType } from "@/src/models/users";
import { getImageURL, logout } from "../actions";
import { toggleTheme } from "../actions";
import Image from "next/image";
import profileIcon from "../../public/profile-icon.png";

export default function AuthButtons({ user }: { user: UserType | null }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu toggle state
    const [isSmallMenuOpen, setIsSmallMenuOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    useEffect(() => {
        async function setImg() {
            if (!user) { return; }
            const imgUrl = await getImageURL(user.image_id as string);
            if (!imgUrl) { return; }
            setImgUrl(imgUrl);
        }
        setImg();
        setIsLoggedIn(!!user);

    }, [user]);

    const router = useRouter();

    const handleLogout = async () => {
        setIsLoggedIn(false);
        await logout();
        router.push('/');
    };

    const changeTheme = async () => {
        console.log("change theme");
        await toggleTheme();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu
    };

    return (
        <div className="relative">
            {/* Hamburger Icon for Small Screens (Appears only on small screens <768px) */}
            <button
                className="block md:hidden text-text py-3"
                onClick={toggleMenu}
            >
                {/* Icon (Hamburger) */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>

            {/* Collapsible Menu for Small Screens */}
            <div className={`absolute bg-background md:bg-transparent right-1 px-3 md:px-0 top-16 shadow-lg rounded-lg py-2 ${isMenuOpen ? 'block' : 'hidden'} md:block md:static md:shadow-none`}>
                {!isLoggedIn ? (
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/posts">
                            Posts
                        </Link>
                        <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/activity">
                            Activities
                        </Link>
                        <button className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" onClick={changeTheme}>
                            Theme
                        </button>
                        <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/login">
                            Login
                        </Link>
                        <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/signup">
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    isLoggedIn && user && (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/posts">
                                Posts
                            </Link>
                            <Link className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" href="/activity">
                                Activity
                            </Link>
                            <button className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18" onClick={changeTheme}>
                                Theme
                            </button>
                            <div className="relative">
                                <Image
                                    src={imgUrl ?? profileIcon}
                                    style={{ objectFit: "cover", width: "30px", height: "30px" }}
                                    width={30}
                                    height={30}
                                    alt="profile-picture"
                                    priority={true}
                                    className="mx-auto mt-2 my-auto cursor-pointer rounded-full"
                                    onClick={() => setIsSmallMenuOpen(!isSmallMenuOpen)}
                                />
                                {isSmallMenuOpen && (
                                    <div className="absolute bg-background flex flex-col w-40 right-1 px-3 md:px-0 top-16 shadow-lg rounded-lg py-2">
                                        <Link
                                            className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18"
                                            href="/profile/"
                                        >
                                            Edit Profile
                                        </Link>
                                        <Link
                                            className="text-text text-center hover:underline rounded w-32 px-8 md:w-auto md:px-2 py-3 md:w-18"
                                            href="#"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
