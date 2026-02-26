import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    return {}
}

export const ourFileRouter = {
    
    profileImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
        return { url: file.ufsUrl }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
