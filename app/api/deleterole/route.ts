import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userId = session.user.id
        const body = await req.json()
        const { roleId } = body

        if (!roleId) {
            return NextResponse.json(
                { error: "RoleId is required" },
                { status: 400 }
            )
        }

        const role = await prisma.role.findUnique({
            where: { id: roleId }
        })

        if (!role || role.userId !== userId) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            )
        }

        await prisma.role.delete({
            where: { id: roleId }
        })

        return NextResponse.json({
            message: "Role deleted successfully"
        })

    } catch (e) {
        return NextResponse.json(
            { error: "An error occurred" },
            { status: 500 }
        )
    }
}