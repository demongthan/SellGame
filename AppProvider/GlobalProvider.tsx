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
    const [userDisplay, setuserDisplay]=useState<UserDisplay | null>(null)
    const [isLoadingTotal, setIsLoadingTotal] = useState(false);
    const isAuthenticated = Boolean(userDisplay);
    const isLogin=Boolean(pathname=='/login');
    const isRegister=Boolean(pathname=='/register');


    const setUser=useCallback(
        (user: UserDisplay | null) => {
        setuserDisplay(user);
    }, [setuserDisplay])

    const changeIsLoadingTotal=useCallback((isLoading:boolean)=>{
        setIsLoadingTotal(isLoading);
    }, [setIsLoadingTotal])

    const getUserDisplayInit = async():Promise<void>=>{
        setIsLoadingTotal(true);
        try{
            const response=await fetch('/api/auth',{
                method: 'GET'
            })

            const data = await response.json();

            setuserDisplay(data.data);
            setIsLoadingTotal(false);
        }
        catch (error) {
            setuserDisplay(null);
            setIsLoadingTotal(false);
        }
    }

    useEffect(() => {
        getUserDisplayInit();
    }, [setuserDisplay])

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