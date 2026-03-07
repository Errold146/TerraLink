import { useStepConfig } from "@/hooks/useStepConfig"
import Image from "next/image"
import { Heading } from "../shared"
import { Button } from "../ui/button"

type SummaryProps = {
    onReload: () => void
}

export function Summary({onReload}: SummaryProps) {

    const { infoUser } = useStepConfig()
    const { avatarUrl, name, username, typeUser, platforms } = infoUser

    const isDefaultAvatar = !avatarUrl || avatarUrl === '/defaultUser.png'

    return (
        <div className="max-w-md mx-auto bg-linear-to-br from-violet-50 via-white to-emerald-50 rounded-3xl shadow-2xl p-8 border border-violet-100 relative overflow-hidden">
            <Heading
                title="Your TerraLink is ready."
                description="It's time to share to the world"
            />

            {/* Glow and background accent */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-violet-200 opacity-30 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl z-0" />

            <div className="relative z-10 flex flex-col items-center mt-6">
                <div className="bg-linear-to-tr from-emerald-300 via-violet-200 to-cyan-200 p-1 rounded-full shadow-lg">
                    <Image
                        src={avatarUrl || '/defaultUser.png'}
                        alt={`Avatar of ${username}`}
                        width={120}
                        height={120}
                        priority
                        className="rounded-full border-4 border-white shadow-xl object-cover aspect-square"
                        unoptimized={isDefaultAvatar}
                    />
                </div>
                <div className="mt-6 w-full flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-violet-700 tracking-tight mb-1 flex items-center gap-2">
                        {name}
                        <span className="inline-block bg-linear-to-r from-emerald-400 to-violet-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full ml-2 shadow-sm">@{username}</span>
                    </h3>
                    <p className="text-base text-emerald-600 font-medium mb-2">{typeUser}</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-3">
                        {platforms.map(item => (
                            <div
                                key={item.name}
                                className="flex items-center gap-2 bg-white/80 border border-violet-100 rounded-xl px-3 py-1 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <item.icon className="size-5 text-violet-500" />
                                <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 w-full">
                    <Button
                        variant={'outline'}
                        className="w-full text-cyan-600 border border-cyan-300 hover:bg-cyan-400 hover:text-cyan-50 transition-colors duration-300 cursor-pointer"
                        onClick={onReload}
                    >
                        Continue To Profile
                    </Button>
                </div>
            </div>
        </div>
    )
}
