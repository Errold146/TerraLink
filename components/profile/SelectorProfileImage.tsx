import { useState } from "react";

import { TabDeleteImage, TabSelector, TabUploadImage } from "@/components/profile";

interface Props {
	setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function SelectorProfileImage({setShowDialog}: Props) {

	const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null)

	return (
		<div className="pt-6">
			{!showTab && <TabSelector setShowTab={setShowTab} />}

			{showTab === 'upload' && (
				<TabUploadImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
			)}

			{showTab === 'delete' && (
				<TabDeleteImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
			)}
		</div>
	)
}
