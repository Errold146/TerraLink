"use client"

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { FireExtinguisher, Link } from "lucide-react";

export function LinkProfile() {

    const [isCopiedLink, setIsCopiedLink] = useState(false)
    const [origin, setOrigin] = useState("")

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const copyLink = () => {
        const url = `${origin}/@microweb-cr`
        navigator.clipboard.writeText(url)

        setIsCopiedLink(true)
    }

    return (
        <div className="bg-linear-to-r from-cyan-50 to-emerald-50 rounded-2xl md:rounded-3xl border border-cyan-200/50">
            <div className="flex flex-col justify-center items-center text-center p-3 gap-2 sm:p-4 md:flex-row md:justify-between md:text-left">
                <span className="text-xs sm:text-sm flex items-center gap-1.5 flex-wrap justify-center md:justify-start text-emerald-900">
                    <Link className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                    <span className="font-medium">Your TerraLink is live: </span>
                    <span className="break-all text-cyan-700">{origin}/@microweb-cr</span>
                </span>

                <Button
                    variant={'outline'}
                    className="rounded-full px-5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap shadow-sm"
                    onClick={copyLink}
                >
                    {isCopiedLink ? 'Copied': 'Copy your TerraLink URL'}
                </Button>
            </div>
        </div>
    )
}
