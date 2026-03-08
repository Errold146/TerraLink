
"use client"

import { Heading } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserInfo } from "@/hooks/useUser"
import { AtSign, Mail, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function EmailPage() {
    const { user } = useUserInfo()
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email)
        }
    }, [user])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setHasChanges(true)
    }

    const saveEmail = async () => {
        if (!email.trim()) {
            toast.error("Please enter an email address")
            return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch("/api/user/email", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to update email")
            }

            toast.success("Email updated successfully!")
            setHasChanges(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to update email")
        } finally {
            setIsLoading(false)
        }
    }

    const deleteEmail = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/user/email", {
                method: "DELETE"
            })

            if (!res.ok) {
                throw new Error("Failed to delete email")
            }

            setEmail("")
            setHasChanges(false)
            toast.success("Email removed successfully!")
        } catch (error: any) {
            toast.error(error.message || "Failed to delete email")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Heading
                title="Email Settings"
                description="Manage your email address for contact and notifications"
            />

            <div className="mt-8 space-y-6">
                {/* Email Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg shadow-emerald-500/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-900">Contact Email</h3>
                            <p className="text-sm text-emerald-900/60">Your public contact email address</p>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-3">
                        <Label htmlFor="email" className="text-emerald-900 font-medium flex items-center gap-2">
                            <AtSign className="w-4 h-4 text-violet-500" />
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            className="h-12 text-base border-emerald-200 focus:border-violet-400 focus:ring-violet-400"
                            disabled={isLoading}
                        />
                        <p className="text-xs text-slate-500">
                            This email will be visible on your public profile
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <Button
                            onClick={saveEmail}
                            disabled={isLoading || !hasChanges}
                            className="flex-1 h-11 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-violet-500/30"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? "Saving..." : "Save Email"}
                        </Button>

                        {user?.email && (
                            <Button
                                onClick={deleteEmail}
                                disabled={isLoading}
                                variant="outline"
                                className="h-11 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-linear-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-5">
                    <div className="flex gap-3">
                        <div className="shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-violet-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-violet-900">About Your Email</h4>
                            <ul className="space-y-1.5 text-sm text-violet-900/70">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0"></span>
                                    <span>Your email will be displayed on your public profile</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0"></span>
                                    <span>People can use it to contact you directly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0"></span>
                                    <span>You can remove it anytime for privacy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
