import { Skeleton } from "../ui/skeleton"

const RoleCardSkeleton = () => {
    return (
        <div className="bg-white border border-muted shadow-xs p-2 rounded-xl">
            <Skeleton className="h-19 rounded-lg" />
            <Skeleton className="my-3 h-7 rounded-full" />
            <Skeleton className="w-2/3 h-3 mb-3" />
        </div>
    )
}

export default RoleCardSkeleton