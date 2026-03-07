import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function ButtonCopy() {

    const [isCopyProfile, setIsCopyProfile] = useState(false)
    const { user } = useUserInfo()

    const handleCopy = () => {
        if (user?.username) {
            navigator.clipboard.writeText(`${window.location.origin}/${user.username}`)
            setIsCopyProfile(true)
            setTimeout(() => setIsCopyProfile(false), 2000)
        }
    }

    if ( !user ) return null;

    return (
        <div className="px-6 mt-6">
            <div className="border border-emerald-200 py-3 px-5 rounded-full flex justify-between items-center shadow-md hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
                <span className="text-sm text-gray-600 truncate pr-3">
                    <span className="text-gray-400">{window.location.origin}/</span>
                    <span className="font-semibold text-gray-700">{user.username}</span>
                </span>
                <Button
                    onClick={handleCopy}
                    variant={'outline'}
                    className="border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-200 py-1.5 px-4 cursor-pointer font-semibold rounded-full shadow-sm hover:shadow-md hover:scale-105 flex items-center gap-2 whitespace-nowrap"
                >
                    {isCopyProfile ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
