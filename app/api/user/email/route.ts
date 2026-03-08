import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Update email
export async function PUT(req: NextRequest) {
    try {
        const { userId } = getAuth(req)
        if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { email } = await req.json()

        if (!email || !email.trim()) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // Check if email already exists for another user
        const existingUser = await db.user.findFirst({
            where: {
                email: email.trim(),
                NOT: { id: userId }
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Email already in use" }, { status: 409 });
        }

        const user = await db.user.update({
            where: { id: userId },
            data: { email: email.trim() }
        })

        return NextResponse.json(user)

    } catch (error) {
        console.error('Error updating email:', error)
        return NextResponse.json({
            message: "Error updating email",
            error
        }, { status: 500 })
    }
}

// Delete email
export async function DELETE(req: NextRequest) {
    try {
        const { userId } = getAuth(req)
        if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const user = await db.user.update({
            where: { id: userId },
            data: { email: null }
        })

        return NextResponse.json(user)

    } catch (error) {
        console.error('Error deleting email:', error)
        return NextResponse.json({
            message: "Error deleting email",
            error
        }, { status: 500 })
    }
}
