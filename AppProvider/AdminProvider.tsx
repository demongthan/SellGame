'use client';

import { createContext, useContext, useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export interface AdminContextProps{
    openSidebar: boolean,
    setOpenSidebar: (state: boolean) => any
}

const AdminContext=createContext<AdminContextProps | undefined>(undefined);
const AdminUpdateContext = createContext<{} | undefined>(undefined);

const AdminProvider =({children}:Props)=>{
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpenSidebar(false) : setOpenSidebar(true)
        );

        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);
    
    return(
        <AdminContext.Provider value={{openSidebar, setOpenSidebar}}>
            <AdminUpdateContext.Provider value={{}}>
                {children}
            </AdminUpdateContext.Provider>
        </AdminContext.Provider>
    )
}

export const useAdminState = () => useContext(AdminContext);

export default AdminProvider