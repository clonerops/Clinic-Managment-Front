import { createContext, useState } from "react";

export const SidebarContext = createContext({
    sideOpen: true,
    toogleSideOpen: () => {}
})

export const SidebarContextProvider = ({children}: {children: any}) => {
    const [sideOpen, setSideOpen] = useState<boolean>(true)

    const toogleSideOpen = () => setSideOpen(prev => !prev)
    

    return (
        <SidebarContext.Provider value={{sideOpen, toogleSideOpen}}>
        {children}
    </SidebarContext.Provider>
    )
}