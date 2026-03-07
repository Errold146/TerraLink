import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { Heading } from "@/components/shared";
import { stepTwoData } from "@/data";
import { useStepConfig } from "@/hooks/useStepConfig";
import { Button } from "../ui/button";

export function StepTwo() {
    const [error, setError] = useState('');

    const { nextStep, infoUser, setInfoUser } = useStepConfig()

    const [selectedPlatform, setSelectedPlatform] = useState<string[]>(
        infoUser.platforms.map(platform => platform.name) || []
    )

    const handleSelectPlatform = (platform: string) => {
        setSelectedPlatform(prevSelected => {
            if (prevSelected.includes(platform)) {
                return prevSelected.filter(item => item !== platform)
            } else {
                return [...prevSelected, platform]
            }
        })
    }

    const handleContinue = () => {
        if (selectedPlatform.length === 0) {
            setError('Please select at least one platform.');
            return;
        }
        setError('');
        setInfoUser(prevInfoUser => ({
            ...prevInfoUser,
            platforms: stepTwoData.filter(({name}) => selectedPlatform.includes(name))
        }))
        nextStep()
    }

    return (
        <div>
            {error && (
                <div className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold text-white bg-linear-to-r from-rose-500 via-amber-400 to-rose-400 border-2 border-rose-300 shadow-lg rounded-xl py-3 px-5 animate-shake">
                    <AlertTriangle className="w-5 h-5 text-white drop-shadow-lg animate-bounce" />
                    <span>{error}</span>
                </div>
            )}
            {/* // Animación shake para error */}
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
                title="Which platforms are you on?"
                description="Select the ones you are using."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {stepTwoData.map(item => (
                    <div
                        key={item.name}
                        className={`flex flex-col gap-1 items-center rounded-lg py-3 hover:bg-emerald-100 hover:shadow-md border border-emerald-300      transition-colors duration-300 cursor-pointer
                            ${selectedPlatform.includes(item.name) ? "bg-emerald-100 border-violet-400" : ''}
                        `}
                        onClick={() => handleSelectPlatform(item.name)}
                    >
                        <item.icon className="size-5 text-violet-500" />
                        <span className={`${selectedPlatform.includes(item.name) ? "text-violet-500" : "text-emerald-600"}`}>{item.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <Button
                    variant={'outline'}
                    className="w-full text-cyan-600 border border-cyan-300 hover:bg-cyan-400 hover:text-cyan-50 transition-colors duration-300 cursor-pointer"
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
