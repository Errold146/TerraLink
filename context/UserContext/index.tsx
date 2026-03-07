import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

import { Link, User } from "@/lib/generated/prisma/client";
import { UserContextType } from "@/types";

interface Props {
	children: React.ReactNode
}

export const UserContext = createContext<UserContextType>({
	user : null,
	isLoading: false,
	links: null,
	reloadUser: () => {}
})

export function UserProvider({children}: Props) {
	const { user } = useUser()

	const [infoUser, setInfoUser] = useState<User | null>(null)
	const [links, setLinks] = useState<Link[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchUserInfo = async () => {
		if ( !user ) return;

		try {
			setIsLoading(true)
			const res = await fetch('/api/info-user')
			const data = await res.json()

			setInfoUser(data)
			setLinks(data.links || [])

		} catch (error) {
			console.error('Error fetching user info: ', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchUserInfo()
	}, [user])

	const reloadUser = () => fetchUserInfo()

	const data = {
		user: infoUser,
		links,
		isLoading,
		reloadUser
	}

	return (
		<UserContext.Provider value={data}>
			{children}
		</UserContext.Provider>
	)
}
