import { PhoneLinkItem } from "@/components/ProfilePreview";
import { Logo } from "@/components/shared";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, User } from "@/lib/generated/prisma/client";
import { Check, Copy, Ellipsis, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    user: User & { links: Link[] }
    inPhonePreview?: boolean
}

export function MoreInfoProfile({ user, inPhonePreview = false }: Props) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        const url = `${window.location.origin}/${user.username}`
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            toast.error("Failed to copy link")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-2 bg-violet-200 hover:bg-violet-300 border border-violet-400 hover:shadow-md transition-all duration-300 rounded-full cursor-pointer">
                    <Ellipsis fill="black" />
                </div>
            </DialogTrigger>
                <DialogContent
                    className={`sm:max-w-106.25 bg-white/95 backdrop-blur-md border-violet-200 ${
                        inPhonePreview
                            ? 'top-4! left-auto! right-4! translate-x-0! translate-y-0! sm:top-20!'
                            : ''
                    }`}
                >
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold text-violet-900">
                            Share TerraLink of @{user.username}
                        </DialogTitle>
                        <div className="gap-4 py-4">
                            <div className="p-5 rounded-xl bg-linear-to-br from-violet-100 via-purple-50 to-indigo-100 border border-violet-200 shadow-lg">
                                {/* Avatar and User Info Row */}
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Avatar - Left */}
                                    <div className="shrink-0">
                                        <Image
                                            src={user.avatarUrl || "/defaultUser.png"}
                                            alt={`Avatar of: ${user.username}`}
                                            width={80}
                                            height={80}
                                            className="rounded-full aspect-square object-cover border-4 border-white shadow-lg ring-2 ring-violet-200"
                                            priority
                                        />
                                    </div>

                                    {/* User Info - Right */}
                                    <div className="flex-1 min-w-0 pt-1">
                                        <p className="font-bold text-xl text-violet-900 mb-1 truncate">
                                            @{user.username}
                                        </p>
                                        {user.name && (
                                            <p className="font-medium text-base text-slate-700 mb-2">
                                                {user.name}
                                            </p>
                                        )}
                                        {user.bio && (
                                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-2">
                                                {user.bio}
                                            </p>
                                        )}
                                        {user.email && (
                                            <a
                                                href={`mailto:${user.email}`}
                                                className="inline-flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
                                            >
                                                <Mail className="w-3.5 h-3.5" />
                                                <span className="truncate">{user.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Copy URL Button */}
                                <div className="mb-4">
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white/80 hover:bg-white rounded-lg transition-all duration-200 group border border-violet-200 shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="text-xs text-slate-500 mb-0.5">Your TerraLink</p>
                                            <p className="text-sm font-medium text-violet-900 truncate">
                                                terralink.com/{user.username}
                                            </p>
                                        </div>
                                        <div className="shrink-0 w-8 h-8 rounded-md bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-colors">
                                            {copied ? (
                                                <Check className="w-4 h-4 text-violet-700" />
                                            ) : (
                                                <Copy className="w-4 h-4 text-violet-600" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                {/* Logo - Below everything */}
                                <div className="flex justify-center pt-3 border-t border-violet-200/50">
                                    <div className="bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                                        <Logo />
                                    </div>
                                </div>
                            </div>

                            {/* Links Section */}
                            <div className="space-y-2 mt-4">
                                {user.links && user.links.length > 0 ? (
                                    user.links.map(link => (
                                        <PhoneLinkItem link={link} key={link.id} />
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-slate-500 py-4">
                                        No links available
                                    </p>
                                )}
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
        </Dialog>
    )
}
