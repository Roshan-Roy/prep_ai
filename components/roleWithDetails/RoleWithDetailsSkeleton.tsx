import { Skeleton } from "../ui/skeleton"

const RoleWithDetailsSkeleton = () => {
    return (
        <>
            <div className="py-8 md:py-10">
                <div className="flex flex-col mx-auto w-17/20 max-w-6xl">
                    <Skeleton className="h-5 md:h-7.5 w-3/10" />
                    <Skeleton className="h-3.5 md:h-4 mt-2 md:mt-2.5 mb-3.5 md:mb-4 w-4/10" />
                    <Skeleton className="h-7 md:h-8.5 w-5/10 rounded-full" />
                </div>
            </div>
            <div className="bg-gray-50 pt-4 md:pt-6 pb-14 md:pb-18">
                <div className="mx-auto w-17/20 max-w-6xl">
                    <Skeleton className="h-4.5 w-3/10" />
                    <div className="mt-4 md:mt-5">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div className="flex flex-col gap-2.5 mb-6" key={i}>
                                <Skeleton className="h-4 md:h-5" />
                                <Skeleton className="h-4 md:h-5 w-1/2" />
                            </div>
                        ))}
                        <div className="pt-4 md:pt-8">
                            <Skeleton className="mx-auto md:w-42 h-10" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleWithDetailsSkeleton