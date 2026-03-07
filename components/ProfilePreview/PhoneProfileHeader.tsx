import { User } from "@/lib/generated/prisma/client"
import Image from "next/image"
import { FaUser } from "react-icons/fa6"

interface PhoneProfileHeaderProps {
    user: User | null
}

export function PhoneProfileHeader({ user }: PhoneProfileHeaderProps) {
    return (
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
            {/* Avatar */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl ring-4 ring-white/80 mb-3">
                {user?.avatarUrl ? (
                    <Image
                        src={user.avatarUrl}
                        alt={`Avatar of ${user.username || user.name}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                        <FaUser className="text-white text-3xl" />
                    </div>
                )}
            </div>

            {/* Username */}
            {user?.username && (
                <h2 className="text-lg font-bold text-white mb-1 drop-shadow-lg px-3 py-1 bg-black/30 rounded-full backdrop-blur-sm">
                    @{user.username}
                </h2>
            )}

            {/* Name */}
            {user?.name && (
                <p className="text-sm font-medium text-white mb-2 drop-shadow-md bg-black/30 rounded-full px-3 py-1">
                    {user.name}
                </p>
            )}

            {/* Bio */}
            {user?.bio && (
                <p className="text-xs text-white text-center leading-relaxed max-w-50 drop-shadow-md bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                    {user.bio}
                </p>
            )}
        </div>
    )
}
