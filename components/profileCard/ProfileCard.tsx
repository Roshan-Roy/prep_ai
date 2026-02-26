import SignOutBtn from "../signOutBtn/SignOutBtn"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const ProfileCard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
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
    )
}

export default ProfileCard