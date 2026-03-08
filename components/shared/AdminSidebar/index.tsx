"use client"

import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { items } from "@/data";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { BadgeCheckIcon, BellIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminSidebar() {
    const { user } = useUser()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const fullName = user?.fullName ?? "Username"
    const imageUrl = user?.imageUrl
    const initials = fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="h-full border-r border-emerald-100">
            <SidebarHeader className="p-3 flex items-center justify-center">
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map(item => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="text-emerald-900/70 hover:bg-emerald-50 hover:text-emerald-800 data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-900">
                                    <a href={item.url}>
                                        <item.icon className="text-violet-500" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {!mounted ? (
                            <SidebarMenuButton className="h-10">
                                <Avatar className="w-6 h-6 border border-emerald-200">
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-medium">{initials}</AvatarFallback>
                                </Avatar>
                                <span className="text-emerald-900 font-medium">{fullName}</span>
                            </SidebarMenuButton>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="h-10 hover:bg-emerald-50">
                                        <Avatar className="w-6 h-6 border border-emerald-200">
                                            <AvatarImage src={imageUrl} alt={fullName} />
                                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-medium">{initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-emerald-900 font-medium">{fullName}</span>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" align="start" className="w-56 border-emerald-100">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="hover:bg-emerald-50 focus:bg-emerald-50">
                                            <BadgeCheckIcon className="text-violet-500" />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-emerald-50 focus:bg-emerald-50">
                                            <CreditCardIcon className="text-violet-500" />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-emerald-50 focus:bg-emerald-50">
                                            <BellIcon className="text-violet-500" />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator className="bg-emerald-100" />
                                    <SignOutButton>
                                        <DropdownMenuItem className="hover:bg-red-50 focus:bg-red-50 text-red-600">
                                            <LogOutIcon />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </SignOutButton>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
