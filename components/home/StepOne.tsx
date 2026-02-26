import { dataCreator } from "@/data";
import { useStepConfig } from "@/hooks/useStepConfig";
import { Heading } from "@/components/shared";

export function StepOne() {

    const { setInfoUser, nextStep } = useStepConfig()

    const handleClick = (value: string) => {
        setInfoUser(prevUser => ({
            ...prevUser,
            typeUser: value
        }))
        nextStep()
    }

    return (
        <div>
            <Heading
                title="Tell us about yourself"
                description="This helps us personalize your experience."
            />

            <div className="grid grid-cols-1 gap-2.5 mt-5">
                {dataCreator.map(item => (
                    <div 
                        key={item.title}
                        className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-200 py-2.5 px-4 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-sm active:bg-emerald-100 transition-all duration-200 cursor-pointer font-medium"
                        onClick={() => handleClick(item.value)}
                    >
                        <item.icon className="size-5 text-violet-500" />
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    )
}
