"use client"

import { AdminSidebar } from "@/components/shared";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="w-full bg-linear-to-br from-violet-50/80 via-white to-cyan-50/40 min-h-screen">
                <div className="px-3">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
