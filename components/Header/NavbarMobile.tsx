"use client"

import { navItems } from '@/utils/Menu'
import { BellIcon, ChevronDownIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props{
    showNav:boolean;
  closeNav:()=>void
}

const NavbarMobile = ({showNav, closeNav}:Props) => {
    const [isItemOpen, setItem] = useState<boolean>(false);
    const navOpenStyle=showNav?"translate-x-0":"translate-x-[-100%]"

    const toggleItem=(isUpdate:boolean): any => {
        if(isUpdate){
            setItem(!isItemOpen);
        }
    }

  return (
    <>
        <div className={`fixed ${navOpenStyle} top-0 transform transition-all duration-500 z-[10000] left-0 right-0 bottom-0 bg-black opacity-70 w-[100vw] h-[100vh]`}></div>

        <ul className={`${navOpenStyle} fixed flex items-center flex-col justify-center h-[100%] transform transition-all 
                            duration-300 delay-300 w-[60%] bg-white space-y-5 z-[10006]`}>
            
            {navItems. map((navItem, index)=>(
                <li key={index} className='relative text-xl w-fit block transition-all' onClick={()=>toggleItem(navItem.children!=null)}>
                    <Link href={navItem.link} className="flex cursor-pointer items-center text-base font-semibold gap-2 text-black group-hover:text-[#007bff]">
                        <span>{navItem.label}</span>

                        {navItem.children && (
                            <ChevronDownIcon className={`text-black w-[1.5rem] h-[1.5rem] transition-all ${isItemOpen && " rotate-180"}`}></ChevronDownIcon>
                        )}
                    </Link>

                    {isItemOpen && navItem.children && (
                        <ul className="flex flex-col">
                            {navItem.children.map((navItemChild, index)=>(
                                <li key={index} className='w-[100%] pl-[0.8rem] relative text-xl block'>
                                    <Link href={navItemChild.link} className="flex cursor-pointer items-center text-base font-semibold gap-2 text-black">
                                        <span>{navItemChild.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
                    )}
                </li>
            ))}

            <li className='relative text-xl w-fit block transition-all'>
                <div className='flex flex-row py-1.5 px-4 border border-black rounded-2xl text-black'>
                    <div><UserIcon className='w-[1.5rem] h-[1.5rem]'></UserIcon></div>
                    <div className="pl-1 text-base">Đăng nhập</div>
                </div>
            </li>

            <li className='relative text-xl w-fit block transition-all'>
                <div className='flex flex-row py-1.5 px-4 border border-black rounded-2xl text-black'>
                    <div><UserIcon className='w-[1.5rem] h-[1.5rem]'></UserIcon></div>
                    <div className="pl-1 text-base tẽ">Đăng kí</div>
                </div>
            </li>



            <div className='absolute top-[-0.4rem] left-[1.4rem]'>
                <div className='relative pt-1.5'>
                    <BellIcon className='text-black w-[1.5rem] h-[1.5rem]'></BellIcon>
                    <div className="px-1 bg-red-500 rounded-full text-center text-white text-sm absolute top-0.5 -end-2">
                        3
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red-200 w-full h-full" ></div>
                    </div>
                </div>
            </div>

            <XMarkIcon onClick={closeNav} className='absolute top-[-0.4rem] right-[1.4rem] w-[2.2rem] h-[2.2rem] text-black'></XMarkIcon>
        </ul> 
    </>
  )
}

export default NavbarMobile