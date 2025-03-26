import { createContext } from "react";
import { ChatContextType } from "../type/types";

export const ChatContext = createContext<ChatContextType | undefined>(undefined); 