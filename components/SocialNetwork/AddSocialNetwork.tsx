import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaSnapchat, FaTelegram, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { toast } from "sonner";

interface AddSocialNetworkProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const platformOptions: { icon: IconType; name: string }[] = [
    { icon: FaInstagram, name: "Instagram" },
    { icon: FaFacebook, name: "Facebook" },
    { icon: FaTiktok, name: "TikTok" },
    { icon: FaLinkedin, name: "LinkedIn" },
    { icon: FaSnapchat, name: "Snapchat" },
    { icon: FaTelegram, name: "Telegram" },
    { icon: FaWhatsapp, name: "WhatsApp" },
    { icon: FaDiscord, name: "Discord" },
    { icon: FaYoutube, name: "YouTube" },
    { icon: FaXTwitter, name: "X (Twitter)" },
    { icon: FaPinterest, name: "Pinterest" },
    { icon: FaThreads, name: "Threads" },
    { icon: FaGithub, name: "GitHub" },
    { icon: FaLink, name: "Other" },
];

export function AddSocialNetwork({ isOpen, onClose, onSuccess }: AddSocialNetworkProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<string>("");
    const [customName, setCustomName] = useState<string>("");
    const [linkUrl, setLinkUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!linkUrl.trim()) {
            toast.error("Please enter a URL");
            return;
        }

        const finalName = selectedPlatform === "Other" ? customName : selectedPlatform;

        if (!finalName.trim()) {
            toast.error("Please select a platform or enter a custom name");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/links", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: finalName,
                    link: linkUrl,
                    icon: selectedPlatform,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create link");
            }

            toast.success("Link added successfully!");
            onSuccess();
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add link");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedPlatform("");
        setCustomName("");
        setLinkUrl("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        Add New Link
                    </DialogTitle>
                    <DialogDescription>
                        Choose a platform and add your link URL
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Platform Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Select Platform</Label>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {platformOptions.map((platform) => {
                                const Icon = platform.icon;
                                const isSelected = selectedPlatform === platform.name;
                                return (
                                    <button
                                        key={platform.name}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPlatform(platform.name);
                                            // Limpiar customName si no es "Other"
                                            if (platform.name !== "Other") {
                                                setCustomName("");
                                            }
                                        }}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                                            isSelected
                                                ? "bg-linear-to-br from-violet-500 to-purple-600 text-white shadow-lg scale-105"
                                                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                                        }`}
                                    >
                                        <Icon className="text-xl mb-1" />
                                        <span className="text-[10px] font-medium text-center line-clamp-1">
                                            {platform.name === "X (Twitter)" ? "X" : platform.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom Name for "Other" */}
                    {selectedPlatform === "Other" && (
                        <div className="space-y-2">
                            <Label htmlFor="customName">Custom Name</Label>
                            <Input
                                id="customName"
                                placeholder="Enter platform name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                className="border-violet-200 focus:border-violet-400"
                            />
                        </div>
                    )}

                    {/* URL Input */}
                    <div className="space-y-2">
                        <Label htmlFor="linkUrl">URL</Label>
                        <Input
                            id="linkUrl"
                            type="url"
                            placeholder="https://example.com/yourprofile"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="border-violet-200 focus:border-violet-400"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !selectedPlatform}
                            className="bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                        >
                            {isLoading ? "Adding..." : "Add Link"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
