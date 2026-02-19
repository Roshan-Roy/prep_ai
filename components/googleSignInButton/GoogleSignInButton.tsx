"use client"

import { useSession } from "@/lib/auth-client"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn, signOut } from "@/lib/auth-client"
import Link from "next/link"

const GoogleSignInButton = ({ variant = "google" }) => {
    const { data: session } = useSession()

    const handleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        })
    }
    const handleSignOut = async () => {
        await signOut()
    }

    if (variant === "header") {
        return (
            <Button className="px-8 rounded-full" variant="secondary" onClick={session ? handleSignOut : handleSignIn}>{session ? "Sign out" : "Sign in"}</Button>
        )
    }

    return (
        session ? (
            <Link className="flex justify-center items-center bg-primary hover:bg-primary/90 rounded-full mt-4 h-12 px-8" href="/dashboard">
                <span className="text-background font-semibold text-sm">Go to Dashboard</span>
            </Link>
        ) : (
            <div className="flex items-center gap-4 bg-primary hover:bg-primary/90 rounded-full py-1 pl-1 pr-6.5 mt-4 cursor-pointer" onClick={handleSignIn}>
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-background">
                    <FcGoogle className="text-xl" />
                </div>
                <span className="text-background font-semibold text-sm">Sign in with Google</span>
            </div>
        )
    )
}

export default GoogleSignInButton