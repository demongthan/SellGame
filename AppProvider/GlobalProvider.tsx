import React, {createContext, useCallback, useContext, useState} from "react";

interface Props {
    children: React.ReactNode;
}

export interface GlobalContextProps{
    userDisplay:UserDisplay|null,
    setUser: (user: UserDisplay | null) => void
    isAuthenticated: boolean,
}

const GlobalContext=createContext<GlobalContextProps | undefined>(undefined);
const GlobalUpdateContext = createContext<{} | undefined>(undefined);

 const GlobalProvider =({children}:Props)=>{
    const [userDisplay, setuserDisplay]=useState<UserDisplay | null>(null)
    
    const isAuthenticated = Boolean(userDisplay);

    const setUser=useCallback(
        (user: UserDisplay | null) => {
        setuserDisplay(user);
    }, [setuserDisplay])

    return(
        <GlobalContext.Provider value={{userDisplay, setUser, isAuthenticated}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider