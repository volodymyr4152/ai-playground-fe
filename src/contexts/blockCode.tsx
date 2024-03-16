import {createContext, useContext} from "react";

export const CodeBlockContext = createContext<boolean>(false);
export const CodeBlockContextProvider = CodeBlockContext.Provider;
export const useCodeBlockContext = () => useContext<boolean>(CodeBlockContext);
