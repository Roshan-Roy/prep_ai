import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Suspense } from "react"
import RoleWithDetails from "@/components/roleWithDetails/RoleWithDetails"
import ErrorPage from "@/components/errorPage/ErrorPage"
import RoleWithDetailsSkeleton from "@/components/roleWithDetails/RoleWithDetailsSkeleton"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"

const getRoleWithQuestions = async (roleId: string, userId: string) => {
    const role = await prisma.role.findUnique({
        where: { id: roleId },
        include: { questions: true },
    })

    if (!role || role.userId !== userId) {
        notFound()
    }

    return role
}

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return <ErrorPage message="Unauthorized" />
    }

    const rolePromise = getRoleWithQuestions(id, session.user.id)

    return (
        <Suspense fallback={<RoleWithDetailsSkeleton />}>
            <RoleWithDetails roleId={id} rolePromise={rolePromise} />
        </Suspense>
    )
}

export default Page