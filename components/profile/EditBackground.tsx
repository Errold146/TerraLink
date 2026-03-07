import axios from "axios";
import { Ellipsis, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useUserInfo } from "@/hooks/useUser";
import { UploadButton } from "@/utils/uploadthing";

interface Props {
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditBackground({onReload}: Props) {

    const [showDialog, setShowDialog] = useState(false)
    const [photoUrl, setPhotoUrl] = useState('')

    const { reloadUser } = useUserInfo()

    const onChangeBackground = async () => {
        try {
            await axios.patch('/api/upload-user', {
                backgroundImage: photoUrl
            })

            reloadUser()
            onReload(true)
            toast.success("Background image created correctly")
            setShowDialog(false)
            setPhotoUrl("")

        } catch (error) {
            console.log('Error:', error)
            toast.error("Sorry, an error occurred, please reload and try again.")
        }
    }

    return (
        <div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="p-2 bg-violet-200 hover:bg-violet-300 border border-violet-300 hover:shadow-md transition-all duration-300 rounded-full">
                            <Ellipsis fill="black" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>

                            <DropdownMenuItem>
                                <DialogTrigger>
                                    <div className="flex gap-1 items-center">
                                        <ImagePlus className="w-4 h-4" />
                                        Edit or add background image
                                    </div>
                                </DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Background Image?</DialogTitle>
                        <div className="my-4">
                            {photoUrl ? (
                                <div>
                                    <Image
                                        src={photoUrl}
                                        alt="Image background"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            ) : (
                                <UploadButton
                                    appearance={{
                                        button: "bg-violet-100 border-2 border-dashed border-violet-300 text-violet-500 font-medium rounded-full px-6 py-3 shadow-sm hover:bg-violet-200 hover:border-violet-400 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer",
                                        allowedContent: "text-violet-500 text-xs mt-1",
                                    }}
                                    endpoint='profileImage'
                                    onClientUploadComplete={res => {
                                        setPhotoUrl(res?.[0].ufsUrl)
                                    }}
                                    onUploadError={(err: Error) => {
                                        console.log('Error: ', err)
                                    }}
                                />
                            )}
                        </div>
                        <Button
                            variant={'outline'}
                            className="w-full border border-cyan-300 text-cyan-600 hover:border-0 hover:bg-cyan-500 hover:text-cyan-50 transition-colors duration-300 shadow rounded-lg"
                            disabled={!photoUrl}
                            onClick={onChangeBackground}
                        >
                            Change Background
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
