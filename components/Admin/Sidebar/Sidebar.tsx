"use client"

import { AdminContextProps, useAdminState } from '@/AppProvider/AdminProvider'
import useMobileView from '@/hooks/UseMobileView'

import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'
import { FC } from 'react'
import Links from './Links';

interface Props {

}

const Sidebar:FC<Props> = () => {
    const { isMobile } = useMobileView()
    const { openSidebar, setOpenSidebar } = useAdminState() as AdminContextProps;
    
    return (
      <>
        <div className={`bg-[#000] bg-opacity-70 absolute inset-0 z-50 ${openSidebar && isMobile ? 'block w-screen h-full' : 'hidden'}`} onClick={() => setOpenSidebar(false)}></div>

        <div className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 
          ${openSidebar ? "translate-x-0" : "-translate-x-96"}`}>
          <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={() => setOpenSidebar(false)} >
            <XMarkIcon></XMarkIcon>
          </span>
  
          <div className={`mx-[56px] mt-[50px] flex items-center`}>
            <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700">
              Horizon <span className="font-medium">FREE</span>
            </div>
          </div>
  
          <div className="mt-[58px] mb-7 h-px bg-gray-300" />
            {/* Nav item */}
            <ul className="flex flex-col gap-3 mb-auto pt-1">
              <Links onClickRoute={isMobile ? () => setOpenSidebar(false) : undefined} />
            </ul>
        </div>
      </>
    );
};

export default Sidebar