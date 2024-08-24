"use client"

import { AdminContextProps, useAdminState } from '@/AppProvider/AdminProvider'
import useMobileView from '@/hooks/UseMobileView'

import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'
import { FC } from 'react'
import Links from './Links';
import Image from "next/image";

interface Props {

}

const Sidebar:FC<Props> = () => {
    const { isMobile } = useMobileView()
    const { openSidebar, setOpenSidebar } = useAdminState() as AdminContextProps;
    
    return (
      <>
        <div className={`bg-[#000] bg-opacity-70 absolute inset-0 z-50 ${openSidebar && isMobile ? 'block w-screen h-full' : 'hidden'}`} onClick={() => setOpenSidebar(false)}></div>

        <div className={`sm:none duration-175 w-[18rem] linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 
          ${openSidebar ? "translate-x-0" : "-translate-x-96"}`}>
          <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={() => setOpenSidebar(false)} >
            <XMarkIcon></XMarkIcon>
          </span>
  
          <div className={`flex justify-center items-center border-b-2 border-gray-300 h-[8rem]`}>
            <div className="w-[10rem] h-[4rem]">
              <Image src={"/img/logo.png"} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}
              alt="logo" className="md:cursor-pointer h-9" />
            </div>
          </div>

            {/* Nav item */}
            <ul className="flex flex-col gap-3 mb-auto pt-5">
              <Links onClickRoute={isMobile ? () => setOpenSidebar(false) : undefined} />
            </ul>
        </div>
      </>
    );
};

export default Sidebar