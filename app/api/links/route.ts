import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET - Obtener todos los links del usuario
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                links: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json(user.links);
    } catch (error) {
        console.log("[LINKS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST - Crear un nuevo link
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name, icon, link } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name || !link) {
            return new NextResponse("Name and link are required", { status: 400 });
        }

        const newLink = await db.link.create({
            data: {
                name,
                icon,
                link,
                userId,
            },
        });

        return NextResponse.json(newLink);
    } catch (error) {
        console.log("[LINKS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// PATCH - Actualizar un link existente
export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { id, name, icon, link } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!id) {
            return new NextResponse("Link ID is required", { status: 400 });
        }

        // Verificar que el link pertenece al usuario
        const existingLink = await db.link.findUnique({
            where: { id },
        });

        if (!existingLink || existingLink.userId !== userId) {
            return new NextResponse("Link not found or unauthorized", { status: 404 });
        }

        const updatedLink = await db.link.update({
            where: { id },
            data: {
                name,
                icon,
                link,
            },
        });

        return NextResponse.json(updatedLink);
    } catch (error) {
        console.log("[LINKS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Eliminar un link
export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const linkId = searchParams.get("id");

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!linkId) {
            return new NextResponse("Link ID is required", { status: 400 });
        }

        // Verificar que el link pertenece al usuario
        const existingLink = await db.link.findUnique({
            where: { id: linkId },
        });

        if (!existingLink || existingLink.userId !== userId) {
            return new NextResponse("Link not found or unauthorized", { status: 404 });
        }

        await db.link.delete({
            where: { id: linkId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[LINKS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
