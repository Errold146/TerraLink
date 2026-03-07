import { UserContext } from "@/context";
import { useContext } from "react";

export const useUserInfo = () => useContext(UserContext)
