"use client"

import React,{createContext,useContext,useState} from "react"

type FORMUIContextType = {
    loading:boolean;
    setLoading:(value:boolean) => void
}

const UUIDClientContext = createContext<FORMUIContextType | undefined>(undefined)

export function UUIDClientProvider({children}:{children:React.ReactNode}){
    const [loading,setLoading] = useState(false)

    return (
        <UUIDClientContext.Provider value={{loading,setLoading}}>
            {children}
        </UUIDClientContext.Provider>
    )
}

export function useUUIDClient(){
    const context = useContext(UUIDClientContext)
    if(!context || context === undefined){
        throw new Error("UUID Client must be used within FormUIProvider");
    }
    return context
}