
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "@/lib/generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteSocialNetworkProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    link: Link | null;
}

export function DeleteSocialNetwork({ isOpen, onClose, onSuccess, link }: DeleteSocialNetworkProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!link) return;

        setIsLoading(true);

        try {
            const response = await fetch(`/api/links?id=${link.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete link");
            }

            toast.success("Link deleted successfully!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete link");
        } finally {
            setIsLoading(false);
        }
    };

    if (!link) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                        This will permanently delete the link{" "}
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {link.name}
                        </span>
                        . This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
