import { Palette, Briefcase, Code, Building, Ellipsis, type LucideIcon } from "lucide-react";

export const dataCreator: { title: string; value: string; icon: LucideIcon }[] = [
    {
        title: "Creator",
        value: "creator",
        icon: Palette
    },
    {
        title: "Bussines",
        value: "bussines",
        icon: Briefcase
    },
    {
        title: "Developer",
        value: "developer",
        icon: Code
    },
    {
        title: "Real State",
        value: "real-state",
        icon: Building
    },
    {
        title: "Other",
        value: "other",
        icon: Ellipsis
    },
]