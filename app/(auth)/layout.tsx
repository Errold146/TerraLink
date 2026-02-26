import { Metadata } from "next";
import { Logo } from "@/components/shared";
import Image from "next/image";

export const metadata: Metadata = {
    title: "TerraLink - Auth",
    description: "Authorization and implementation"
}

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="flex flex-col items-center justify-center bg-white" >
                <Logo />
                {children}
            </div>

            <div className="bg-linear-to-br from-emerald-50 via-cyan-50 to-violet-50 flex items-center justify-center h-full w-full px-10">
                <Image 
                    src={'/authLogin.png'}
                    alt="Image auth"
                    width={800}
                    height={800}
                    priority
                    className="w-auto h-auto rounded-2xl shadow-xl shadow-emerald-200/30"
                />
            </div>
            
        </div>
    )
}
