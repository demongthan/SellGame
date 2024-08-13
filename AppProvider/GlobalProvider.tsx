"use client"

import jwt from 'jsonwebtoken';
import { DecodedToken } from '@/utils/types/DecodedToken';
import { usePathname } from "next/navigation";
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";

interface Props {
    children: React.ReactNode;
}

export interface GlobalContextProps{
    userDisplay:UserDisplay|null,
    setUser: (user: UserDisplay | null) => void
    isAuthenticated: boolean,
    isLoadingTotal:boolean,
    changeIsLoadingTotal:(isLoading:boolean) => void,
    isLogin: boolean
    isRegister: boolean
}

const GlobalContext=createContext<GlobalContextProps | undefined>(undefined);
const GlobalUpdateContext = createContext<{} | undefined>(undefined);

 const GlobalProvider =({children}:Props)=>{
    const pathname:string =usePathname();
    const [userDisplay, setUserDisplay]=useState<UserDisplay | null>(null)
    const [isLoadingTotal, setIsLoadingTotal] = useState(true);
    const isAuthenticated = Boolean(userDisplay);
    const isLogin=Boolean(pathname=='/login');
    const isRegister=Boolean(pathname=='/register');


    const setUser=useCallback(
        (user: UserDisplay | null) => {
        setUserDisplay(user);
    }, [setUserDisplay])

    const changeIsLoadingTotal=useCallback((isLoading:boolean)=>{
        setIsLoadingTotal(isLoading);
    }, [setIsLoadingTotal])

    const getUserDisplayInit = async():Promise<void>=>{
        try{
            const response=await fetch('/api/auth',{
                method: 'GET'
            })

            await response.json().then(res=>{
                let userDisplay:UserDisplay|null;
                if(res.data){
                    const jwtData=jwt.decode(res.data, { complete: true }) as DecodedToken;
                    
                    userDisplay={
                        displayName:jwtData.sub,
                        id:jwtData.jti,
                        role:jwtData.role
                    }
                }
                else{
                    userDisplay=null;
                }

                setUserDisplay(userDisplay);
                setIsLoadingTotal(false);
            })
        }
        catch (error) {
            setUserDisplay(null);
            setIsLoadingTotal(false);
        }
    }

    useEffect(() => {
        getUserDisplayInit();
    }, [setUserDisplay])

    return(
        <GlobalContext.Provider value={{userDisplay, setUser, isAuthenticated, isLoadingTotal, changeIsLoadingTotal, isLogin, isRegister}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider