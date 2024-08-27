import React from "react"
import Header from "../components/header"

export const metadata = {
    title: "Profile page",
    description: "View your My one mile profile",
    keywords: ["Profile", "my one mile", "Details"],
}
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
} 