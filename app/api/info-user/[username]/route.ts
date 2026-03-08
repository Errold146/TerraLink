import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: Promise<{username: string}>}) {
    try {
        const username = (await params).username
        if ( !username ) return NextResponse.json({message: "Username is required"}, {status: 400});

        const user = await db.user.findUnique({where: { username }, include: { links: true}})
        if ( !user ) return NextResponse.json({message: "User not found"}, {status: 404});

        return NextResponse.json(user)

    } catch (error) {
        console.log('Error:', error)
        return NextResponse.json({message: "Error getting user", error}, {status: 500});
    }
}
