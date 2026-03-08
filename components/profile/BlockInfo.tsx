import { Mail } from "lucide-react";
import { useState } from "react";

import { FormInfoUser } from "@/components/profile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserInfo } from "@/hooks/useUser";

export function BlockInfo() {

    const { user } = useUserInfo()
    const [openDialog, setOpenDialog] = useState(false)

    if ( !user ) return null;

    return (
        <div className="w-full flex flex-col gap-1 px-2 ">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="text-left text-emerald-500 hover:cursor-pointer ">
                    <span className="font-semibold hover:underline">@{user.username}</span>
                    <span className="block text-sm font-normal text-violet-400 hover:underline">{user.bio ? "Edit Bio" : "Add Bio"}</span>
                    {user.email && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                        </span>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Profile Information</DialogTitle>
                        <DialogDescription>
                            Update your display name, username, email and bio
                        </DialogDescription>
                    </DialogHeader>
                    <FormInfoUser setOpenDialog={setOpenDialog} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
