import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import getRoleWithQuestions from "@/lib/getRoleWithQuestions"
import { Suspense } from "react"
import RoleWithDetails from "@/components/roleWithDetails/RoleWithDetails"

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    let session = null
    try {
        session = await auth.api.getSession({
            headers: await headers(),
        })
    } catch (e) {
        return <p>An error occurred</p>
    }

    if (!session) {
        return <p>Un authorized</p>
    }

    const rolePromise = getRoleWithQuestions(id, session.user.id)

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RoleWithDetails roleId={id} rolePromise={rolePromise} />
        </Suspense>
    )
}

export default Page