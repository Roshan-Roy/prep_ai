import RoleCard from "@/components/roleCard/RoleCard"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import AddRoleModal from "@/components/addRoleModal/AddRoleModal"
import ErrorPage from "@/components/errorPage/ErrorPage"
import { redirect } from "next/navigation"

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect("/")
    }

    const roles = await prisma.role.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { questions: true }
            }
        }
    })

    return (
        <>
            {
                roles.length === 0 ? <ErrorPage message="No roles yet" /> :
                    (
                        <div className="bg-gray-50 min-h-[calc(100dvh-64px)] lg:min-h-[calc(100dvh-72px)]">
                            <div className="mx-auto w-17/20 max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 pb-20">
                                {roles.map(e => <RoleCard
                                    id={e.id}
                                    role={e.role}
                                    topics={e.topics}
                                    experience={e.experience}
                                    questionsCount={e._count.questions}
                                    updatedAt={e.updatedAt}
                                    description={e.description}
                                    key={e.id}
                                />)}
                            </div>
                        </div>
                    )
            }
            <AddRoleModal />
        </>
    )
}

export default Page