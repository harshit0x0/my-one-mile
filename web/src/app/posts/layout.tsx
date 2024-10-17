import React from "react"
import Header from "../components/header"
import { getUser } from "../actions";

export const metadata = {
    title: "activity page",
    description: "",
    keywords: ["", "", ""],
}

export default async function PostsLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    return (
        <>
            <Header user={user} />
            <div className="w-full bg-background min-h-screen">
                {children}
            </div>
        </>
    )
} 