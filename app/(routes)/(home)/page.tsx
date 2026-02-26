"use client"

import { TreePalm } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Link, User } from "@/lib/generated/prisma/client";

import { Spinner } from "@/components/shared";
import { StepConfigUserProvider } from "@/context";
import { HandlerSteps, LinkProfile } from "@/components/home";

export default function HomePage() {

    const { user } = useUser()

    const [reload, setReload] = useState(false)
    const [isFirstVisit, setIsFirstVisit] = useState(false)
    const [infoUser, setInfoUser] = useState<(User & { links: Link[]}) | null>(null)

    useEffect(() => {
        const checkFirstLogin = async () => {
            const res = await fetch('/api/info-user')
            const data = await res.json()
            
            setInfoUser(data)
            setIsFirstVisit(data.firstLogin)
        }

        checkFirstLogin()

        if ( reload ) {
            checkFirstLogin()
            setReload(false)
        }

    }, [user?.id, reload, user])
    
    if ( !user || !infoUser ) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <Spinner />
            </div>
        )
    }

    if ( isFirstVisit ) {
        return (
            <StepConfigUserProvider>
                <HandlerSteps onReload={setReload} />
            </StepConfigUserProvider>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-4 px-2 sm:px-4">
                <div>
                    {/* Link Profile */}
                    <LinkProfile />

                    {/* Profile Info */}
                    <div>
                        <p>Profile info...</p>
                    </div>

                    <div className="mt-10 sm:mt-20 flex flex-col items-center">
                        <div className="py-6 sm:py-10 text-center flex justify-center flex-col items-center text-emerald-400/70 font-semibold">
                            <TreePalm className="w-14 h-14 sm:w-20 sm:h-20" strokeWidth={1} />
                            <p className="text-sm sm:text-base text-muted-foreground">Show the world who you are.</p>
                            <p className="text-sm sm:text-base text-muted-foreground">Add a link to get started.</p>
                        </div>
                    </div>
                </div>

                {/* Profile preview */}
                <div>
                    <p>Profile preview...</p>
                </div>
            </div>   
        </>
    )
}
