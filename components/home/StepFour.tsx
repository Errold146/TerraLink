import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Heading } from "@/components/shared";
import { dataStepFourImages } from "@/data";
import { useStepConfig } from "@/hooks/useStepConfig";

export function StepFour() {

    const { infoUser, setInfoUser, nextStep } = useStepConfig()

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState('')
    const [showUploadPhoto, setShowUploadPhoto] = useState(false)

    const handleImageSelect = (src: string) => {
        setSelectedPhoto(src)
        setInfoUser(prevInfoUser => ({
            ...prevInfoUser,
            avatarUrl: src
        }))
    }

    async function handleContinue() {
        if (!selectedPhoto) {
            setError('Please select or upload a profile image.');
            return;
        }
        if (!name.trim() || !username.trim()) {
            setError('Name and username are required.');
            return;
        }
        setError('');
        setInfoUser(prevInfoUser => ({
            ...prevInfoUser,
            name,
            username,
        }));

        try {
            const res = await axios.post("/api/user", {
                name,
                username,
                avatarUrl: infoUser.avatarUrl,
                links: infoUser.platforms,
                typeUser: infoUser.typeUser
            })

            if ( res.status === 200 || res.status === 201 ) {
                nextStep()
            }

        } catch (error) {
            setError(`The user already exists: ${error}`)
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold text-white bg-linear-to-r from-rose-500 via-amber-400 to-rose-400 border-2 border-rose-300 shadow-lg rounded-xl py-3 px-5 animate-shake">
                    <AlertTriangle className="w-5 h-5 text-white drop-shadow-lg animate-bounce" />
                    <span>{error}</span>
                </div>
            )}
            <style jsx global>{`
                @keyframes shake {
                    0% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                    100% { transform: translateX(0); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>

            <Heading
                title="Add profile details. "
                description="Select or upload your profile image."
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4 items-center">
                {/* Avatares predefinidos */}
                {dataStepFourImages.map(({src}) => (
                    <div
                        key={src}
                        className={`flex flex-col items-center gap-2 p-1 rounded-full transition-all duration-300 cursor-pointer ${selectedPhoto === src ? 'ring-4 ring-emerald-400 border-emerald-400 shadow-lg' : ''}`}
                        onClick={() => handleImageSelect(src)}
                    >
                        <Image
                            src={src}
                            alt="Profile Avatar"
                            width={300}
                            height={300}
                            priority
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="w-full aspect-square object-cover bg-cyan-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 border-2 border-dashed border-violet-300 hover:border-violet-400"
                        />
                    </div>
                ))}

                {/* Mostrar imagen subida si existe */}
                {photoUrl && (
                    <div
                        className={`flex flex-col items-center gap-2 p-1 rounded-full transition-all duration-300 cursor-pointer ${selectedPhoto === photoUrl ? 'ring-4 ring-emerald-400 border-emerald-400 shadow-lg' : ''}`}
                        onClick={() => handleImageSelect(photoUrl)}
                    >
                        <Image
                            src={photoUrl}
                            alt="Uploaded Profile Avatar"
                            width={300}
                            height={300}
                            priority
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="w-full aspect-square object-cover bg-cyan-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 border-2 border-dashed border-violet-300 hover:border-violet-400"
                        />
                    </div>
                )}
            </div>

            <div className="relative flex items-center my-6">
                <div className="grow border-t border-slate-300" />
                <span className="mx-4 text-sm text-slate-500 italic whitespace-nowrap">
                    Or upload your own photo
                </span>
                <div className="grow border-t border-slate-300" />
            </div>

            {showUploadPhoto ? (
                <div className="flex justify-center">
                    <UploadButton
                        appearance={{
                            button: "bg-violet-100 border-2 border-dashed border-violet-300 text-violet-500 font-medium rounded-full px-6 py-3 shadow-sm hover:bg-violet-200 hover:border-violet-400 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer",
                            allowedContent: "text-violet-500 text-xs mt-1",
                        }}
                        endpoint={'profileImage'}
                        onClientUploadComplete={res => {
                            const url = res?.[0].ufsUrl;
                            setPhotoUrl(url);
                            setSelectedPhoto(url);
                            setShowUploadPhoto(false);
                            toast.success("Profile image uploaded successfully!");
                        }}
                        onUploadError={(err: Error) => {
                            toast.error("Failed to upload image. Please try again.")
                            console.log(err)
                        }}
                    />
                </div>
            ) : (
                <div className="flex justify-center">
                    <div
                        className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-violet-300 bg-violet-50 cursor-pointer hover:bg-violet-100 hover:border-violet-400 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
                        onClick={() => setShowUploadPhoto(!showUploadPhoto)}
                    >
                        <Plus className="w-8 h-8 text-violet-400" />
                    </div>
                </div>
            )}


            <div className="mt-5">
                <h3 className="text-lg my-3 text-center font-semibold text-violet-600">Add your username.</h3>

                <div className="grid gap-4">
                    <Input
                        placeholder="Name"
                        className="w-full border border-emerald-300 placeholder:text-emerald-400"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <Input
                        placeholder="Usename"
                        className="w-full border border-emerald-300 placeholder:text-emerald-400"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-6">
                <Button
                    variant={'outline'}
                    className="w-full text-cyan-600 border border-cyan-300 hover:bg-cyan-400 hover:text-cyan-50 transition-colors duration-200 cursor-pointer"
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
