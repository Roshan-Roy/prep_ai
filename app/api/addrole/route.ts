import { NextRequest, NextResponse } from "next/server"
import generateInterviewQuestions from "@/utils/generateInterviewQuestions"
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

        const { role, experience, topics, description } = body

        if (!role || !experience || !topics || !description) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        const questions = await generateInterviewQuestions({
            role,
            experience,
            topics,
            description,
        })

        const newRole = await prisma.role.create({
            data: {
                role,
                experience,
                topics,
                description,
                userId
            },
        })

        await prisma.questionAnswer.createMany({
            data: questions.map((q: QuestionAnswer) => ({
                question: q.question,
                answer: q.answer,
                roleId: newRole.id,
            })),
        })

        return NextResponse.json({
            message: "Role added successfully",
        })
    } catch (e) {
        return NextResponse.json(
            { error: "An error occurred" },
            { status: 500 }
        )
    }
}