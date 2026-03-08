
"use client"

import { Spinner } from "@/components/shared";
import { AddSocialNetwork, DeleteSocialNetwork, EditSocialNetwork } from "@/components/SocialNetwork";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/generated/prisma/client";
import { TreePalm } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPencil, FaPinterest, FaPlus, FaSnapchat, FaTelegram, FaThreads, FaTiktok, FaTrash, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";

const iconMap: Record<string, IconType> = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebook,
    "TikTok": FaTiktok,
    "LinkedIn": FaLinkedin,
    "Snapchat": FaSnapchat,
    "Telegram": FaTelegram,
    "WhatsApp": FaWhatsapp,
    "Discord": FaDiscord,
    "YouTube": FaYoutube,
    "X (Twitter)": FaXTwitter,
    "GitHub": FaGithub,
    "Threads": FaThreads,
    "Pinterest": FaPinterest,
    "Other": FaLink,
};

export default function LinkPage() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);

    const fetchLinks = async () => {
        try {
            const response = await fetch("/api/links");
            if (response.ok) {
                const data = await response.json();
                setLinks(data);
            }
        } catch (error) {
            console.error("Failed to fetch links:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleEdit = (link: Link) => {
        setSelectedLink(link);
        setIsEditOpen(true);
    };

    const handleDelete = (link: Link) => {
        setSelectedLink(link);
        setIsDeleteOpen(true);
    };

    const handleSuccess = () => {
        fetchLinks();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                            Manage Your Links
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Add, edit, or remove your social media and web links
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        size="lg"
                    >
                        <FaPlus className="mr-2" />
                        Add New Link
                    </Button>
                </div>
            </div>

            {/* Links Grid */}
            {links.length === 0 ? (
                <div className="text-center py-16">
                    <div className="flex justify-center mb-6">
                        <div className="p-6 bg-linear-to-br from-emerald-50 to-violet-50 dark:from-emerald-900/20 dark:to-violet-900/20 rounded-full">
                            <TreePalm className="w-16 h-16 text-emerald-500" strokeWidth={1.5} />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        No links yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Start by adding your first link to share with the world
                    </p>
                    <Button
                        onClick={() => setIsAddOpen(true)}
                        className="bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                    >
                        <FaPlus className="mr-2" />
                        Add Your First Link
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {links.map((link) => {
                        const Icon = link.icon ? iconMap[link.icon] || FaLink : FaLink;

                        return (
                            <div
                                key={link.id}
                                className="group relative bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300"
                            >
                                {/* Icon & Info */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                                        <Icon className="text-white text-2xl" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate">
                                            {link.name}
                                        </h3>
                                        <a
                                            href={link.link || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-violet-600 dark:text-violet-400 hover:underline truncate block"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {link.link}
                                        </a>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleEdit(link)}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                                    >
                                        <FaPencil className="mr-2 text-sm" />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(link)}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                    >
                                        <FaTrash className="mr-2 text-sm" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modals */}
            <AddSocialNetwork
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={handleSuccess}
            />
            <EditSocialNetwork
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSuccess={handleSuccess}
                link={selectedLink}
            />
            <DeleteSocialNetwork
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onSuccess={handleSuccess}
                link={selectedLink}
            />
        </div>
    );
}
