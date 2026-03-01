import prisma from "./prisma"

const getRoleWithQuestions = async (roleId: string, userId: string) => {
    const role = await prisma.role.findUnique({
        where: { id: roleId },
        include: { questions: true },
    })

    if (!role || role.userId !== userId) {
        throw new Error("Role not found")
    }

    return role
}

export default getRoleWithQuestions