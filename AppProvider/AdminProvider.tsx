'use client';

import { AdminDisplay } from "@/utils/types/AdminDisplay";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export interface AdminContextProps{
    openSidebar: boolean,
    setOpenSidebar: (state: boolean) => any,
    adminDisplay: AdminDisplay | null,
    setAdmin:(admin: AdminDisplay | null) => void
}

const AdminContext=createContext<AdminContextProps | undefined>(undefined);
const AdminUpdateContext = createContext<{} | undefined>(undefined);

const AdminProvider =({children}:Props)=>{
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    const [adminDisplay, setAdminDisplay]=useState<AdminDisplay | null>(null)

    const setAdmin=useCallback(
        (user: AdminDisplay | null) => {
        setAdminDisplay(user);
    }, [setAdminDisplay])

    useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpenSidebar(false) : setOpenSidebar(true)
        );

        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);
    
    return(
        <AdminContext.Provider value={{openSidebar, setOpenSidebar, adminDisplay, setAdmin}}>
            <AdminUpdateContext.Provider value={{}}>
                {children}
            </AdminUpdateContext.Provider>
        </AdminContext.Provider>
    )
}

export const useAdminState = () => useContext(AdminContext);

export default AdminProvider