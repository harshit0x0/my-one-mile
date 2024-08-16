import React from "react"

export const metadata = {
    title: "Login",
    description: "Login to My one mile",
    keywords: ["login", "my one mile", "authentication"],
}
export default function signupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
} 