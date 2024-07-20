"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Bars3CenterLeftIcon, BellIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

import { navItems } from '@/utils/Menu';
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider';
import { authApiRequest } from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/showToast';

interface Props{
    openNav:()=>void
}
  

const Navbar = ({openNav}:Props) => {
    const { isAuthenticated, userDisplay, setUser, isLoadingTotal, changeIsLoadingTotal, isLogin, isRegister} = useGlobalState() as GlobalContextProps;
    const router = useRouter();

    const [navSticky, setNavSticky]=useState(false);
    const [urlImageLogo, seturlImageLogo] =useState<string>(""); 

    const GetLogoUrl= async():Promise<void>=>{
        try{
            const res=await authApiRequest.getAllImageUrl("LOGO");

            seturlImageLogo(res.payload.data[0].PathUrl);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
      const handler=()=>{
        if(window.scrollY>=10){
          setNavSticky(true);
        }
  
        if(window.scrollY<=10){
          setNavSticky(false);
        }
      };
  
      window.addEventListener('scroll', handler);


      GetLogoUrl();
    }, [seturlImageLogo]);
  
    const stickyStyle=navSticky?'shadow-custom':'';

    const processLogout=async (): Promise<void>=> {
        changeIsLoadingTotal(true);
        try{
            await fetch('/api/auth', {
                method: 'DELETE'
            })

            const response= await authApiRequest.logout(userDisplay?.displayName);

            if(response.payload.data){
                setUser(null);
                router.push('/');
            }
            changeIsLoadingTotal(false);

        }
        catch(error){
            showToast("warning", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên!</p>);
            changeIsLoadingTotal(false);
        }
    }

    if(isLoadingTotal){
        return (
            <div className="w-full h-[100vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        )
    }
    
  return (
    <div className={`fixed ${stickyStyle} bg-white w-[100%] z-[1000] transition-all duration-100`}>
        <div className='flex items-center h-[130px] justify-between w-[90%] sm:w-[70%] mx-auto'>
            <div className='w-[10%]'>
                <Image src={urlImageLogo} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '50%' }}
                alt="logo" className="md:cursor-pointer h-9" />
            </div>

            <ul className='md:flex hidden items-center space-x-10 h-[100%] w-[60%] justify-end'>
                {navItems. map((navItem, index)=>(
                    <li key={index} className='group relative text-xl w-fit block transition-all h-[100%]'>
                        <Link href={navItem.link} className="flex cursor-pointer items-center text-base h-[100%] font-semibold gap-2 text-black group-hover:text-s2blue1">
                            <span>{navItem.label}</span>

                            {navItem.children && (
                                <ChevronDownIcon className='text-black w-[1.5rem] h-[1.5rem] rotate-0 transition-all group-hover:rotate-180'></ChevronDownIcon>
                            )}
                        </Link>

                        {navItem.children &&(
                            <ul className="fixed flex-col hidden bg-s2gray3 rounded-lg top-[9.5%] left-[42.5%] group-hover:flex z-[10000000]">
                                {navItem.children.map((navItemChild, index)=>(
                                    <li key={index} className='group w-[100%] py-4 px-5 relative text-xl block hover:bg-s2gray5 hover:rounded-lg'>
                                        <Link href={navItemChild.link} className="flex cursor-pointer items-center text-base font-semibold gap-2 text-white hover:text-s2blue1">
                                            <span>{navItemChild.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                           
                        )}
                    </li>
                ))}
            </ul>

            <div className='md:flex hidden gap-8'>
                <div className='relative pt-1.5'>
                    <BellIcon className='text-black w-[1.5rem] h-[1.5rem]'></BellIcon>
                    <div className="px-1 bg-red-500 rounded-full text-center text-white text-sm absolute top-0.5 -end-2">
                        3
                        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red-200 w-full h-full" ></div>
                    </div>
                </div>

                {!isLogin && (
                    <Link href={isAuthenticated?"/recharge/account-information":"/login"} className='flex flex-row py-1.5 px-4 border border-black rounded-2xl cursor-pointer'>
                        <div><UserIcon className='text-black w-[1.5rem] h-[1.5rem]'></UserIcon></div>
                        <div className="pl-1 text-base">{isAuthenticated?userDisplay?.displayName:"Đăng nhập"}</div>
                    </Link>
                )}

                {!isRegister && !isAuthenticated && (
                    <Link href="/register" className='flex flex-row py-1.5 px-4 border border-black rounded-2xl cursor-pointer'>
                        <div><UserIcon className='text-black w-[1.5rem] h-[1.5rem]'></UserIcon></div>
                        <div className="pl-1 text-base">Đăng kí</div>
                    </Link>
                )}

                {!isRegister && isAuthenticated &&(
                    <button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();

                        processLogout();
                      }} 
                      className='flex flex-row py-1.5 px-4 border border-black rounded-2xl cursor-pointer'>
                        <div><UserIcon className='text-black w-[1.5rem] h-[1.5rem]'></UserIcon></div>
                        <div className="pl-1 text-base">Đăng xuất</div>
                    </button>
                )}
            </div>

            <Bars3CenterLeftIcon className='w-[2.3rem] md:hidden h-[2.3rem] text-black rotate-180' onClick={openNav}></Bars3CenterLeftIcon>
        </div>
    </div>
  )
}

export default Navbar