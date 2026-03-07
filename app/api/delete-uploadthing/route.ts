import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return new NextResponse("Access denied", { status: 401 });

        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json({
                message: "No image URL provided"
            }, { status: 400 });
        }

        console.log("Attempting to delete image:", imageUrl);

        // Extraer la clave del archivo de la URL de UploadThing
        // Soporta múltiples formatos:
        // - https://utfs.io/f/[fileKey]
        // - https://uploadthing-prod.s3.us-west-2.amazonaws.com/[fileKey]
        // - Solo la clave directamente
        let fileKey: string | undefined;

        if (imageUrl.includes('/f/')) {
            fileKey = imageUrl.split('/f/')[1];
        } else if (imageUrl.includes('amazonaws.com/')) {
            fileKey = imageUrl.split('amazonaws.com/')[1];
        } else if (imageUrl.includes('utfs.io/')) {
            // Si tiene utfs.io pero no /f/, intentar extraer todo después del dominio
            const parts = imageUrl.split('utfs.io/');
            fileKey = parts[1]?.replace(/^\/+/, '');
        } else {
            // Asumir que es solo la clave
            fileKey = imageUrl;
        }

        // Limpiar cualquier query string o fragmento
        if (fileKey) {
            fileKey = fileKey.split('?')[0].split('#')[0];
        }

        if (!fileKey) {
            console.error("Could not extract file key from URL:", imageUrl);
            return NextResponse.json({
                message: "Invalid UploadThing URL",
                url: imageUrl
            }, { status: 400 });
        }

        console.log("Extracted file key:", fileKey);

        // Eliminar el archivo de UploadThing
        await utapi.deleteFiles([fileKey]);

        return NextResponse.json({
            message: "Image deleted successfully",
            success: true
        });

    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({
            message: "Error deleting image",
            error
        }, { status: 500 });
    }
}
