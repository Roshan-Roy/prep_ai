import RoleCard from "@/components/roleCard/RoleCard"
import AddRole from "@/components/addRoleModal/AddRole"

const gradients = [
    "from-green-400/20 to-green-400/10",
    "from-blue-400/20 to-blue-400/10",
    "from-purple-400/20 to-purple-400/10",
    "from-pink-400/20 to-pink-400/10",
    "from-indigo-400/20 to-indigo-400/10",
    "from-yellow-400/20 to-yellow-400/10",
    "from-red-400/20 to-red-400/10",
    "from-cyan-400/20 to-cyan-400/10",
    "from-teal-400/20 to-teal-400/10",
    "from-orange-400/20 to-orange-400/10",
    "from-gray-400/20 to-gray-400/10",
]

const Page = () => {
    return (
        <>
            <div className="bg-gray-50 min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)]">
                <div className="mx-auto w-17/20 max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 pb-20">
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                    <RoleCard />
                </div>
            </div>
            <AddRole />
        </>
    )
}

export default Page