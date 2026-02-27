import prisma from "./prisma"

const getRoleWithQuestions = async (id: string, userId: string) => {
    try {
        const role = await prisma.role.findUnique({
            where: { id, userId },
            include: { questions: true },
        })

        if (!role) {
            throw new Error("Role not found")
        }

        return role
    } catch (error) {
        throw error
    }
}

export default getRoleWithQuestions 