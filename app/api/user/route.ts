import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req)

        const data = await req.json()
        const { name, username, avatarUrl, links, typeUser } = data

        if ( !userId ) return new NextResponse('Access denied', { status: 401 });

        const user = await db.user.update({
            where: { id: userId },
            data: {
                name,
                username,
                avatarUrl,
                links: {
                    create: links
                },
                typeUser,
                firstLogin: false
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: "Error updating user",
            error
        }, { status: 500 })
    }
}