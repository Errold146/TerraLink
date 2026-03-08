import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function PATCH(req: NextRequest) {
    try {
        const { userId } = getAuth(req)
        if ( !userId ) return new NextResponse("Access denied", { status: 401 });

        const data = await req.json()

        // Validate email if provided
        if (data.email && data.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(data.email)) {
                return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
            }

            // Check if email already exists for another user
            const existingUser = await db.user.findFirst({
                where: {
                    email: data.email.trim(),
                    NOT: { id: userId }
                }
            });

            if (existingUser) {
                return NextResponse.json({ message: "Email already in use" }, { status: 409 });
            }
        }

        // Get current user to check for existing images
        const currentUser = await db.user.findUnique({
            where: { id: userId }
        })

        // Helper function to extract file key from UploadThing URL
        const extractFileKey = (imageUrl: string): string | undefined => {
            let fileKey: string | undefined;

            if (imageUrl.includes('/f/')) {
                fileKey = imageUrl.split('/f/')[1];
            } else if (imageUrl.includes('amazonaws.com/')) {
                fileKey = imageUrl.split('amazonaws.com/')[1];
            } else if (imageUrl.includes('utfs.io/')) {
                const parts = imageUrl.split('utfs.io/');
                fileKey = parts[1]?.replace(/^\/+/, '');
            } else {
                fileKey = imageUrl;
            }

            // Clean any query string or fragment
            if (fileKey) {
                fileKey = fileKey.split('?')[0].split('#')[0];
            }

            return fileKey;
        }

        // Helper function to delete old image
        const deleteOldImage = async (oldImageUrl: string) => {
            try {
                const fileKey = extractFileKey(oldImageUrl);
                if (fileKey) {
                    await utapi.deleteFiles([fileKey]);
                    console.log("Deleted old image:", fileKey);
                }
            } catch (deleteError) {
                console.error("Error deleting old image:", deleteError);
                // Continue even if deletion fails
            }
        }

        // If updating backgroundImage and user has an existing one, delete it
        if (data.backgroundImage && currentUser?.backgroundImage) {
            await deleteOldImage(currentUser.backgroundImage);
        }

        // If updating avatarUrl and user has an existing one, delete it
        if (data.avatarUrl && currentUser?.avatarUrl) {
            await deleteOldImage(currentUser.avatarUrl);
        }

        // Update user with new data
        const updateUser = await db.user.update({
            where: { id: userId },
            data
        })

        return NextResponse.json(updateUser)

    } catch (error) {
        return NextResponse.json({
            message: "Error updating user",
            error
        }, { status: 500 })
    }
}
