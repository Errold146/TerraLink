import { PhoneLinkItem, PhoneProfileHeader } from "@/components/ProfilePreview";
import { Logo } from "@/components/shared";
import { useUserInfo } from "@/hooks/useUser";
import { Circle, Square, Triangle } from "lucide-react";
import Image from "next/image";

export function PhonoPreview() {

    const { user, links } = useUserInfo()

    return (
        <div className="my-8 flex justify-center items-center">
            {/* Phone Frame */}
            <div className="relative mx-auto w-70 h-145">
                {/* Phone Border */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 rounded-[3rem] shadow-2xl p-3">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-10"></div>

                    {/* Screen Container */}
                    <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            {user?.backgroundImage ? (
                                <Image
                                    src={user.backgroundImage}
                                    alt={`Background Image of user: ${user.name}`}
                                    fill
                                    sizes="280px"
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-violet-100 via-purple-50 to-indigo-100" />
                            )}
                        </div>

                        {/* Gradient Overlay for better readability */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40"></div>

                        {/* Screen Reflection Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

                        {/* Content Container with Scroll */}
                        <div className="relative h-full overflow-y-auto scrollbar-hide">
                            {/* Profile Header */}
                            <PhoneProfileHeader user={user} />

                            {/* Links Section */}
                            <div className="px-4 pb-6 space-y-3">
                                {links && links.length > 0 ? (
                                    links.map((link) => (
                                        <PhoneLinkItem key={link.id} link={link} />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-xs text-slate-400">
                                            No links available
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* TerraLink Logo at Bottom */}
                            <div className="flex justify-center pb-6 pt-4">
                                <div className="scale-75 bg-black/70 rounded-lg">
                                    <Logo />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons (Android Style) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 px-8 py-3 rounded-full w-fit bg-slate-900/50 backdrop-blur-sm">
                    <Triangle className="w-3 h-3 text-slate-300 rotate-180 fill-slate-300" />
                    <Circle className="w-3 h-3 text-slate-300" />
                    <Square className="w-3 h-3 text-slate-300" />
                </div>
            </div>
        </div>
    )
}
