import { Link, User } from "@/lib/generated/prisma/client";
import { Mail } from "lucide-react";
import Image from "next/image";
import { IconType } from "react-icons";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaSnapchat, FaTelegram, FaThreads, FaTiktok, FaUser, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";

import { Logo } from "@/components/shared";
import { CreateAccountBanner, MoreInfoProfile } from "@/components/user";

interface Props {
    user: User & { links: Link[] }
}

const iconMap: Record<string, IconType> = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebook,
    "TikTok": FaTiktok,
    "LinkedIn": FaLinkedin,
    "Snapchat": FaSnapchat,
    "Telegram": FaTelegram,
    "WhatsApp": FaWhatsapp,
    "Discord": FaDiscord,
    "YouTube": FaYoutube,
    "X (Twitter)": FaXTwitter,
    "GitHub": FaGithub,
    "Threads": FaThreads,
    "Pinterest": FaPinterest,
}

export function UserProfile({ user }: Props) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            {user.backgroundImage ? (
                <Image
                    src={user.backgroundImage}
                    alt={`Background Image of user: ${user.name}`}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="absolute inset-0 bg-linear-to-br from-violet-100 via-purple-50 to-indigo-100" />
            )}

            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40"></div>

            {/* Screen Reflection Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* More Info Button - Top Right */}
                <div className="absolute top-4 right-4 z-20">
                    <MoreInfoProfile user={user} />
                </div>

                {/* Profile Section */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="max-w-lg mx-auto px-4 py-8">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center pt-6 pb-8">
                            {/* Avatar */}
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/80 mb-4">
                                {user.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt={`Avatar of ${user.username || user.name}`}
                                        fill
                                        sizes="(max-width: 768px) 96px, 112px"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                                        <FaUser className="text-white text-4xl md:text-5xl" />
                                    </div>
                                )}
                            </div>

                            {/* Username */}
                            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg px-4 py-1.5 bg-black/40 rounded-full backdrop-blur-sm">
                                @{user.username}
                            </h1>

                            {/* Name */}
                            {user.name && (
                                <p className="text-base md:text-lg font-medium text-white mb-3 drop-shadow-md bg-black/30 rounded-full px-4 py-1">
                                    {user.name}
                                </p>
                            )}

                            {/* Bio */}
                            {user.bio && (
                                <p className="text-sm md:text-base text-white text-center leading-relaxed max-w-md drop-shadow-md bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm mb-3">
                                    {user.bio}
                                </p>
                            )}

                            {/* Email */}
                            {user.email && (
                                <a
                                    href={`mailto:${user.email}`}
                                    className="flex items-center gap-2 text-sm text-white/90 hover:text-white drop-shadow-md bg-black/30 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-200 group"
                                >
                                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">{user.email}</span>
                                </a>
                            )}
                        </div>

                        {/* Links Section */}
                        <div className="space-y-3 pb-6">
                            {user.links && user.links.length > 0 ? (
                                user.links.map((link) => {
                                    const Icon = link.name ? iconMap[link.name] || FaLink : FaLink

                                    return (
                                        <a
                                            key={link.id}
                                            href={link.link || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-white/90 backdrop-blur-md hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-xl p-4 shadow-lg hover:shadow-xl group"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Icon */}
                                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <Icon className="text-white text-xl" />
                                                </div>

                                                {/* Link Name */}
                                                <div className="flex-1 text-left">
                                                    <p className="text-base font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                                                        {link.name || "Link"}
                                                    </p>
                                                </div>

                                                {/* Arrow Icon */}
                                                <div className="text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-sm text-white/70 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm inline-block">
                                        No links available
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* TerraLink Logo at Bottom */}
                        <div className="flex justify-center pb-4 pt-6">
                            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:bg-black/40 transition-colors">
                                <Logo />
                            </div>
                        </div>

                        {/* Create Account Banner - Footer Style */}
                        <CreateAccountBanner profileUserId={user.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
