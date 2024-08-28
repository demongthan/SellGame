"use client"

import { AdminContextProps, useAdminState } from '@/AppProvider/AdminProvider';
import { menuAdmin } from '@/utils/constant/Menu/MenuAdmin';
import { Bars4Icon, BellIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';

const NavbarAdmin = () => {
  const [currentRoute, setCurrentRoute] = useState("Bảng điều khiển");

  const pathname = usePathname()
  const { setOpenSidebar } = useAdminState() as AdminContextProps;

  useEffect(() => {
    getActiveRoute(menuAdmin);
  }, [pathname]);

  const getActiveRoute = (routes: any) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <Link className="text-sm font-normal text-gray-600 hover:underline" href=" " >
            Admin
            <span className="mx-1 text-sm text-gray-600 hover:text-navy-700">
              {" "}
              /{" "}
            </span>
          </Link>
          <Link className="text-sm font-normal capitalize text-gray-600 hover:underline" href="#" >
            {currentRoute}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-gray-600">
          <Link href="#" className="font-bold capitalize hover:text-gray-600" >
            {currentRoute}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white 
      px-2 py-2 shadow-xl shadow-shadow-500 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 sm:w-fit"
          />
        </div>
        <span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={() => setOpenSidebar(true)} >
          <Bars4Icon className="h-5 w-5" />
        </span>

        {/* start Notification */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <BellIcon className="h-4 w-4 text-gray-600" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          className={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        >
          <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 sm:w-[460px]">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700">
                Notification
              </p>
              <p className="text-sm font-bold text-navy-700">
                Mark all read
              </p>
            </div>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>

            <button className="flex w-full items-center">
              <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                
              </div>
              <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                <p className="mb-1 text-left text-base font-bold text-gray-900">
                  New Update: Horizon UI Dashboard PRO
                </p>
                <p className="font-base text-left text-xs text-gray-900">
                  A new update for your downloaded item is available!
                </p>
              </div>
            </button>
          </div>
        </Dropdown>

        {/* start Horizon PRO */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <InformationCircleIcon className="h-4 w-4 text-gray-600" />
            </p>
          }
          className={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        >
          <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500">
            <div className="mb-2 aspect-video w-full rounded-lg bg-cover bg-no-repeat" />
              <Link target="blank" href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold 
                text-white transition duration-200 active:bg-brand-700"
              >
                Buy Horizon UI PRO
              </Link>
              <Link target="blank" href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 
                transition duration-200 hover:bg-gray-200 hover:text-navy-700"
              >
                See Documentation
              </Link>
              <Link target="blank" href="https://horizon-ui.com/?ref=live-free-tailwind-react"
                className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] 
                font-bold text-navy-700 transition duration-200 hover:text-navy-700"
              >
                Try Horizon Free
              </Link>
          </div>
        </Dropdown>

        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={'/img/avatars/avatar4.png'}
              alt="Elon Musk"
            />
          }
          className={"py-2 top-8 -left-[180px] w-max"}
        >
          <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700">
                  👋 Hey, Adela
                </p>{" "}
              </div>
            </div>
            <div className="h-px w-full bg-gray-200" />

            <div className="flex flex-col p-4">
              <Link href=" " className="text-sm text-gray-800" >
                Profile Settings
              </Link>
              <Link href=" " className="mt-3 text-sm text-gray-800 hover:dark:text-white" >
                Newsletter Settings
              </Link>
              <Link href="/auth" className="mt-3 text-sm font-medium text-red-500 hover:text-red-500" >
                Log Out
              </Link>
            </div>
          </div>
        </Dropdown>

      </div>
    </nav>
  )
}

export default NavbarAdmin