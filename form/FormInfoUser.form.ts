import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(2).max(100).optional(),
    name: z.string().min(2).max(100).optional(),
    bio: z.string().min(2).max(400).optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
})
