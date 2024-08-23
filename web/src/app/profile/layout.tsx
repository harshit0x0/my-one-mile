import React from "react"

export const metadata = {
    title: "Profile page",
    description: "View your My one mile profile",
    keywords: ["Profile", "my one mile", "Details"],
}
export default function signupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
} 