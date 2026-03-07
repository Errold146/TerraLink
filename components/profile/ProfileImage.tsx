import { useState } from "react";

import { SelectorProfileImage } from "@/components/profile/SelectorProfileImage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserInfo } from "@/hooks/useUser";
import { Pencil } from "lucide-react";
import Image from "next/image";

export function ProfileImage() {

	const [showDialog, setShowDialog] = useState(false)

	const { user } = useUserInfo()
	if ( !user ) return null;

	const avatarUrl = user?.avatarUrl || '/defaultUser.png'
	const isDefaultAvatar = !user?.avatarUrl

    return (
      	<Dialog open={showDialog} onOpenChange={setShowDialog}>
			<DialogTrigger
				className="text-left"
			>
				<div className="relative border border-emerald-200 rounded-full hover:cursor-pointer hover:shadow-xl">
					<Image
						src={avatarUrl}
						alt={`Avatar of ${user?.username}`}
						width={64}
						height={64}
						className="rounded-full object-cover aspect-square"
						unoptimized={isDefaultAvatar}
					/>
					<div
						className="bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 w-8 h-8 absolute -right-1 -bottom-1 p-1 shadow-sm"
					>
						<Pencil className="text-violet-500 w-4 h-4" />
					</div>
				</div>

			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Display name and bio.</DialogTitle>
					<DialogDescription asChild>
						<SelectorProfileImage setShowDialog={setShowDialog} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
    )
}
