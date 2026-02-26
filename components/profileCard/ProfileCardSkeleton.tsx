import { Skeleton } from "../ui/skeleton"

const ProfileCardSkeleton = () => {
    return (
        <div className="flex items-center gap-3">
            <Skeleton className="rounded-full w-11 h-11" />
            <div className="flex flex-col gap-1">
                <Skeleton className="w-18 h-3" />
                <Skeleton className="w-9 h-3" />
            </div>
        </div>
    )
}

export default ProfileCardSkeleton