import Link from "next/link"
import ProfileCard from "@/components/profileCard/ProfileCard"
import { Suspense } from "react"
import ProfileCardSkeleton from "@/components/profileCard/ProfileCardSkeleton"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="fixed z-40 w-full border-b border-muted bg-white">
                <div className="flex justify-between items-center mx-auto w-17/20 h-16 lg:h-18 max-w-6xl">
                    <Link href="/" className="font-semibold lg:text-lg">PrepAI</Link>
                    <Suspense fallback={<ProfileCardSkeleton />}>
                        <ProfileCard />
                    </Suspense>
                </div>
            </div>
            <div className="h-16 lg:h-18"></div>
            {children}
        </>
    )
}

export default Layout