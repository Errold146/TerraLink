import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { formSchema } from "@/form/FormInfoUser.form";
import { useUserInfo } from "@/hooks/useUser";

interface Props {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormInfoUser({ setOpenDialog }: Props) {

    const { user, reloadUser } = useUserInfo()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || '',
            name: user?.name || '',
            bio: user?.bio || ''
        }
    })

    const onsubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch("/api/upload-user", {
                name: values.name,
                username: values.username,
                bio: values.bio
            })

            setOpenDialog(false)
            reloadUser()
            toast.success("Info user updated successfully")
            form.reset()

        } catch (error) {
            toast.error("Error updating user, please reload and try again")
            console.log(error)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className="mt-5">
            <FieldSet >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Full name</FieldLabel>
                        <Input
                            id="name"
                            autoComplete="off"
                            placeholder="Evil Rabbit"
                            {...form.register("name")}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                            id="username"
                            autoComplete="off"
                            placeholder="Example: evil_rabbit"
                            {...form.register("username")}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            {...form.register("bio")}
                        />
                    </Field>

                    <Button
                        type="submit"
                        variant={'outline'}
                        className="w-full text-lg border border-cyan-300 text-cyan-600 hover:border-0 hover:bg-cyan-500 hover:text-cyan-50 transition-colors duration-300 shadow rounded-lg"
                    >
                        Save
                    </Button>
                </FieldGroup>
            </FieldSet>
        </form>
    )
}
