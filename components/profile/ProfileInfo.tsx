import { BlockInfo, EditBackground, ProfileImage } from "@/components/profile";
import { useUserInfo } from "@/hooks/useUser";

interface Props {
	onReload: React.Dispatch<React.SetStateAction<boolean>>
}

export function ProfileInfo({onReload}: Props) {

	const { user } = useUserInfo()

    return (
      	<div className="mt-10 max-w-2xl mx-auto">
			<div className="flex flex-row pb-lg space-x-sm items-center justify-between">
				<ProfileImage />
				<BlockInfo />
                <EditBackground onReload={onReload} />
			</div>
		</div>
    )
}
