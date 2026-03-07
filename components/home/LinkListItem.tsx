import { Link } from "@/lib/generated/prisma/client"
import { IconType } from "react-icons"
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaSnapchat, FaTelegram, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6"

interface LinkListItemProps {
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

export function LinkListItem({ link }: LinkListItemProps) {
    const Icon = link.name ? iconMap[link.name] || FaLink : FaLink

    return (
        <a
            href={link.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 rounded-xl p-4 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 group"
        >
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="text-white text-xl" />
                </div>

                {/* Link Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {link.name || "Link"}
                    </p>
                    {link.link && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {link.link}
                        </p>
                    )}
                </div>
            </div>
        </a>
    )
}
