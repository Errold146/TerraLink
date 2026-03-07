import axios from "axios";
import { ArrowLeft, Info } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";

interface Props {
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
    setShowTab: React.Dispatch<React.SetStateAction<"upload" | "delete" | null>>
}

export function TabDeleteImage({ setShowDialog, setShowTab }: Props) {

    const { reloadUser, user } = useUserInfo()

    const handleRemoveImage = async () => {
        try {
            // Eliminar la imagen de la nube si no es la imagen por defecto
            if (user?.avatarUrl) {
                await axios.post('/api/delete-uploadthing', {
                    imageUrl: user.avatarUrl
                })
            }

            // Actualizar el usuario con avatarUrl null (mostrará la imagen por defecto)
            await axios.patch('/api/upload-user', {
                avatarUrl: null
            })

            setShowDialog(false)
            toast.error('Avatar Image Deleted successfully')
            reloadUser()
        } catch (error) {
            console.error('Error deleting avatar:', error)
            toast.error('Error deleting avatar image')
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

            <div className="mt-4 mb-3 px-2 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                        When you remove your avatar image, a default profile picture will be displayed instead.
                        This action will permanently delete your current image from the cloud.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
                <Button
                    variant={'outline'}
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 cursor-pointer"
                    onClick={handleRemoveImage}
                >
                    Yes, remove avatar image
                </Button>

                <Button
                    variant={'outline'}
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 cursor-pointer"
                    onClick={() => setShowDialog(false)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}
