"use client"

import { Link, User } from "@/lib/generated/prisma/client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Spinner } from "@/components/shared";
import { UserProfile } from "@/components/user";

export default function UserPage() {

    const params = useParams()
    const router = useRouter()
    const [reload, setReload] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [infoUser, setInfoUser] = useState<(User & {links: Link[]}) | null>(null)

    const username = params?.user

    useEffect(() => {
        const fetchProfile = async () => {
            if ( !username ) router.push('/');

            setIsLoading(true)

            try {
                const res = await fetch(`/api/info-user/${username}`)

                // If user doesn't exist (404), just set infoUser to null
                // This will trigger notFound() below without throwing an error
                if ( res.status === 404 ) {
                    setInfoUser(null)
                    return;
                }

                // For other errors (500, network issues, etc.), throw error
                if ( !res.ok ) throw new Error(`Failed to fetch user profile: ${res.status}`);

                const data = await res.json()
                setInfoUser(data)

            } catch (error) {
              // Only log non-404 errors
              console.error('Error fetching user profile:', error);
              setInfoUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()

        if ( reload ) {
            fetchProfile()
            setReload(false)
        }

    }, [username, reload, router])

    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <Spinner />
            </div>
        )
    }

    if ( !infoUser ) notFound();

    return (
        <div>
            <UserProfile user={infoUser} />
        </div>
    )
}
