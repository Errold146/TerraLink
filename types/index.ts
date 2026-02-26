import { IconType } from "react-icons";

export type StepsConfigUserType = {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    infoUser: InfoUserType
    setInfoUser: React.Dispatch<React.SetStateAction<InfoUserType>>
    totalSteps: number
    nextStep: () => void
    prevStep: () => void
}

type InfoUserType = {
    typeUser: string
    name: string
    platforms: {
        icon: IconType
        link: string
        name: string
    }[]
    avatarUrl: string
    username: string
}