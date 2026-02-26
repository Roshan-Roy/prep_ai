import RoleCardSkeleton from "@/components/roleCard/RoleCardSkeleton"

const Loading = () => {
    return (
        <div className="bg-gray-50 min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)]">
            <div className="mx-auto w-17/20 max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 pb-20">
                {Array.from({ length: 10 }).map((_, i) => (
                    <RoleCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

export default Loading