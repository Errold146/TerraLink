import { ButtonCopy, ButtonHeader, PhonoPreview } from "@/components/ProfilePreview";
import { Lock } from "lucide-react";

export function ProfilePreview() {
    return (
        <div className="border border-transparent border-l-emerald-100 px-2">

            <ButtonHeader />

            <ButtonCopy />

            <PhonoPreview />

            <div className="flex items-center justify-center mt-20">
                <p className="flex gap-1 items-center font-semibold hover:cursor-pointer hover:underline mx-1">Hide TerraLink logo</p>
                <Lock className="w-4 h-4" />
            </div>
        </div>
    )
}
