import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "../ui/button";
import { Heading } from "@/components/shared";
import { useStepConfig } from "@/hooks/useStepConfig";

export function StepTree() {
    const [error, setError] = useState('');

    const { infoUser, setInfoUser, nextStep } = useStepConfig()

    const handleContinue = () => {
        let hasEmpty = false;
        const updatedPlatforms = infoUser.platforms.map(item => {
            const input = document.getElementById(`${item.name}-input`) as HTMLInputElement;
            const link = input?.value?.trim() || '';
            if (!link) hasEmpty = true;
            return {
                name: item.name,
                icon: item.icon,
                link
            }
        });
        if (hasEmpty) {
            setError('Please fill in all your platform usernames/links.');
            return;
        }
        setError('');
        setInfoUser(prevInfoUser => ({
            ...prevInfoUser,
            platforms: updatedPlatforms
        }));
        nextStep();
    }

    return (
        <div>
            {error && (
                <div className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold text-white bg-linear-to-r from-rose-500 via-amber-400 to-rose-400 border-2 border-rose-300 shadow-lg rounded-xl py-3 px-5 animate-shake">
                    <AlertTriangle className="w-5 h-5 text-white drop-shadow-lg animate-bounce" />
                    <span>{error}</span>
                </div>
            )}
            {/* Animación shake para error */}
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
                title="Add your links"
                description="Fill in the fields to add your links."
            />

            {infoUser.platforms.map(item => (
                <div
                    key={item.name}
                    className="flex items-center gap-2 mt-4"
                >
                    <div
                        className="flex flex-row w-full gap-2 items-center"
                    >
                        <item.icon className="size-6 text-violet-500" />
                        <input 
                            id={`${item.name}-input`}
                            type="text"
                            placeholder={`${item.name} Username`}
                            className="w-full rounded-lg border border-emerald-200 shadow-sm p-2 text-sm"
                            defaultValue={item.link}
                        />
                    </div>
                </div>
            ))}

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
