import { Link } from "@/lib/generated/prisma/client"
import { IconType } from "react-icons"
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaSnapchat, FaTelegram, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6"

interface PhoneLinkItemProps {
    link: Link
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

export function PhoneLinkItem({ link }: PhoneLinkItemProps) {
    const Icon = link.name ? iconMap[link.name] || FaLink : FaLink

    return (
        <a
            href={link.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white/90 backdrop-blur-md hover:bg-white hover:scale-[1.02] transition-all duration-200 rounded-xl p-3 shadow-lg hover:shadow-xl group"
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="text-white text-lg" />
                </div>

                {/* Link Name */}
                <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800">
                        {link.name || "Link"}
                    </p>
                </div>

                {/* Arrow Icon */}
                <div className="text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </a>
    )
}
