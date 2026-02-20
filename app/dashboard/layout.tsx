import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Image from "next/image"
import SignOutBtn from "@/components/signOutBtn/SignOutBtn"

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        <>
            <div className="flex justify-between items-center mx-auto w-17/20 h-16 lg:h-18 max-w-6xl">
                <Link href="/" className="font-semibold lg:text-lg">PrepAI</Link>
                <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11">
                        {session?.user.image && (
                            <Image
                                src={session.user.image}
                                alt="profile image"
                                className="rounded-full"
                                fill
                            />
                        )}
                    </div>
                    <div className="flex flex-col font-semibold gap-0.5">
                        <span className="text-sm">{session?.user.name.split(" ")[0]}</span>
                        <SignOutBtn />
                    </div>
                </div>

            </div>
            {children}
        </>
    )
}

export default Layout