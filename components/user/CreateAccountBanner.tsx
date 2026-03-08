"use client"

import { useAuth } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface CreateAccountBannerProps {
    profileUserId: string
}

export function CreateAccountBanner({ profileUserId }: CreateAccountBannerProps) {
    const { userId } = useAuth()

    // Don't show banner if viewing your own profile
    if (userId && userId === profileUserId) return null

    return (
        <div className="w-full px-4 py-6 mt-4">
            <div className="max-w-lg mx-auto">
                {/* Banner Card - Now as footer */}
                <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-4 md:p-5 backdrop-blur-lg border border-white/20">
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-base md:text-lg mb-1">
                                Like what you see?
                            </h3>
                            <p className="text-white/90 text-xs md:text-sm">
                                Create your own TerraLink and share all your links in one place
                            </p>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/sign-up"
                            className="shrink-0 bg-white hover:bg-gray-100 text-violet-600 font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm md:text-base"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
