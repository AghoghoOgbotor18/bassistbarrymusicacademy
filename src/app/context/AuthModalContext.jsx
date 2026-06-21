"use client"
import { Children, createContext, useContext, useState } from "react"

const AuthModalContext = createContext();
export default function AuthModalProvider({children}){
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("login");
    const openModal = (initialMode = "login") => {
        setOpen(true);
        setMode(initialMode);
    }
    const closeModal = () => setOpen(false);

    return (
        <AuthModalContext.Provider value={{open, mode, setMode, openModal, closeModal}}>
            {children}
        </AuthModalContext.Provider>
    )
}

export const useAuthModal = () => useContext(AuthModalContext);