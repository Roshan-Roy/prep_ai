"use client"

import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SignOutBtn = () => {
    const router = useRouter()
    const [signOutLoading, setSignOutLoading] = useState(false)

    const handleSignOut = async () => {
        if (signOutLoading) return

        setSignOutLoading(true)

        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                }
            }
        })
    }

    return (
        <span
            onClick={handleSignOut}
            className={`text-primary text-xs cursor-pointer hover:underline ${signOutLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
            {signOutLoading ? "Signing out..." : "Sign out"}
        </span>
    )
}

export default SignOutBtn