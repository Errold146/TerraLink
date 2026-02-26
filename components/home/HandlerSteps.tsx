import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { useStepConfig } from "@/hooks/useStepConfig";
import { StepOne, StepTwo, StepTree, StepFour, Summary } from "@/components/home";

interface Props {
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}

export function HandlerSteps({onReload}: Props) {

    const [open, setOpen] = useState(true)
    const { totalSteps, step, prevStep } = useStepConfig()

    const progressValue = (step / totalSteps) * 100

    const onClose = () => {
        onReload(true)
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent className="border-emerald-200/60 shadow-lg shadow-emerald-100/30">
                <AlertDialogHeader>
                    <AlertDialogTitle className="mb-3 w-full">
                        {step > 1 && step < 5 && (
                            <Button
                                variant={'outline'}
                                className="mr-2 border-violet-300 text-violet-700 hover:bg-violet-50 hover:text-violet-800 cursor-pointer"
                                onClick={prevStep}
                            >
                                Back <ArrowLeft />
                            </Button>
                        )}
                        <div className="mb-2 text-center text-emerald-800 tracking-wide">
                            Step {step} of {totalSteps}
                        </div>
                        <Progress value={progressValue} />
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="w-full">
                            {step === 1 && <StepOne />}
                            {step === 2 && <StepTwo />}
                            {step === 3 && <StepTree />}
                            {step === 4 && <StepFour />}
                            {step === 5 && <Summary onReload={onClose} />}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
