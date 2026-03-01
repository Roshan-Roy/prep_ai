import { NextRequest, NextResponse } from "next/server"
import generateMoreInterviewQuestions from "@/utils/generateMoreInterviewQuestions"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

type QuestionAnswer = {
    question: string;
    answer: string;
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const userId = session.user.id
        const body = await req.json()

        const { roleId } = body

        if (!roleId) {
            return NextResponse.json(
                { error: "RoleID is required" },
                { status: 400 }
            )
        }

        const role = await prisma.role.findUnique({
            where: { id: roleId },
            include: { questions: true },
        })

        if (!role || role.userId !== userId) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 400 }
            )
        }

        const roleData = {
            role: role.role,
            experience: role.experience,
            topics: role.topics,
            description: role.description,
        }

        const exitingQuestions = role.questions.map(e => ({ question: e.question }))

        const newQuestions = await generateMoreInterviewQuestions(roleData, exitingQuestions)

        await prisma.questionAnswer.createMany({
            data: newQuestions.map((q: QuestionAnswer) => ({
                question: q.question,
                answer: q.answer,
                roleId: role.id,
            })),
        })

        await prisma.role.update({
            where: { id: role.id },
            data: {
                updatedAt: new Date(),
            },
        })

        const updatedRole = await prisma.role.findUnique({
            where: { id: role.id },
            include: {
                questions: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        })

        return NextResponse.json({
            message: "Role updated successfully",
            data: updatedRole
        })
    } catch (e) {
        return NextResponse.json(
            { error: "An error occurred" },
            { status: 500 }
        )
    }
}