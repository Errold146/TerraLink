import { createContext, useState } from "react";
import { StepsConfigUserType } from "@/types";

export const StepConfigUserContext = createContext<StepsConfigUserType> ({
    step: 1,
    setStep: () => {},
    infoUser: {
        typeUser: '',
        name: '',
        platforms : [],
        avatarUrl: '',
        username: ''
    },
    setInfoUser: () => {},
    totalSteps: 5,
    nextStep: () => {},
    prevStep: () => {}
})

export function StepConfigUserProvider({children}: {children: React.ReactNode}) {
    const [step, setStep] = useState(1)
    const [infoUser, setInfoUser] = useState<StepsConfigUserType['infoUser']>({
        typeUser: '',
        name: '',
        platforms: [],
        avatarUrl: '',
        username: ''
    })

    const nextStep = () => {
        setStep(prevStep => prevStep + 1)
    }

    const prevStep = () => {
        setStep(prevStep => prevStep - 1)
    }

    const totalSteps = 5

    const data = {
        step,
        setStep,
        infoUser,
        setInfoUser,
        nextStep,
        prevStep,
        totalSteps
    }

    return (
        <StepConfigUserContext.Provider value={data}>
            {children}
        </StepConfigUserContext.Provider>
    )
}
