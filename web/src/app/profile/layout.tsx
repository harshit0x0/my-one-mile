import React from "react"
import Header from "../components/header"
import { getUser } from "../actions";
import Head from "next/head";

export const metadata = {
    title: "Profile page",
    description: "View your My one mile profile",
    keywords: ["Profile", "my one mile", "Details"],
}

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    // console.log("profile page: user: ", user);
    return (
        <>
            <Header user={user} />
            {children}
        </>
    )
} 