import { useContext } from "react";
import { StepConfigUserContext } from "@/context";

export const useStepConfig = () => useContext(StepConfigUserContext)