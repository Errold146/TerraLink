import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
    setShowTab: React.Dispatch<React.SetStateAction<"upload" | "delete" | null>>
}

export function TabUploadImage({ setShowDialog, setShowTab }: Props) {

    const [photo, setPhoto] = useState('')
    const { reloadUser } = useUserInfo()

    const handleUploadPhoto = async () => {
        try {
            // Update user with new image (API will handle deleting old image automatically)
            await axios.patch('/api/upload-user', {
                avatarUrl: photo
            });

            setShowDialog(false);
            toast.success("Image updated successfully");
            reloadUser();
        } catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Error updating image");
        }
    }

    return (
        <div>
            <div>
                <Button
                    variant={'outline'}
                    className="mr-2 border-violet-300 text-violet-700 hover:bg-violet-50 hover:text-violet-800 cursor-pointer"
                    onClick={() => setShowTab(null)}
                >
                    Back <ArrowLeft />
                </Button>
            </div>

            <div className="my-4">
                {!photo ? (
                    <UploadButton
                        appearance={{
                            button: "bg-violet-100 border-2 border-dashed border-violet-300 text-violet-500 font-medium rounded-full px-6 py-3 shadow-sm hover:bg-violet-200 hover:border-violet-400 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer",
                            allowedContent: "text-violet-500 text-xs mt-1",
                        }}
                        endpoint='profileImage'
                        onClientUploadComplete={res => {
                            setPhoto(res?.[0].ufsUrl)
                        }}
                        onUploadError={(err: Error) => {
                            console.log('Error: ', err)
                        }}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative group">
                            <Image
                                src={photo}
                                alt="New profile image"
                                width={160}
                                height={160}
                                className="w-40 h-40 object-cover rounded-full border-4 border-violet-300 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                            <div className="absolute inset-0 bg-violet-500/10 rounded-full group-hover:bg-violet-500/20 transition-colors duration-300"></div>
                        </div>
                        <p className="text-sm text-violet-600 font-medium">New image ready to upload</p>
                    </div>
                )}
            </div>

            <div>
                <Button
                    variant={'outline'}
                    className="w-full text-cyan-600 border border-cyan-300 hover:bg-cyan-400 hover:text-cyan-50 transition-colors duration-200 cursor-pointer"
                    onClick={handleUploadPhoto}
                    disabled={!photo}
                >
                    Upload
                </Button>
            </div>
        </div>
    )
}
