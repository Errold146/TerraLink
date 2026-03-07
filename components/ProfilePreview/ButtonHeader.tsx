import { Megaphone, Share } from "lucide-react";

export function ButtonHeader() {
    return (
        <div className="flex gap-4 justify-end items-center">
            <button
                className="flex items-center justify-center border border-emerald-200 p-2.5 rounded-full shadow-md hover:bg-violet-100 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Notifications"
            >
                <Megaphone strokeWidth={1} className="w-5 h-5" />
            </button>

            <button
                className="flex gap-2 items-center justify-center font-semibold border border-emerald-200 rounded-full px-4 py-2.5 shadow-md hover:bg-violet-100 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Share profile"
            >
                <Share strokeWidth={1} className="w-4 h-4" />
                <span className="text-sm">Share</span>
            </button>
        </div>
    )
}
