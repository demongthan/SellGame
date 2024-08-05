'use client'

import React, { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import { Squares2X2Icon } from "@heroicons/react/20/solid";

import {menuAdmin, MenuItemAdmin} from "@/utils/constant/MenuAdmin";

interface Props{
  onClickRoute?: (e: MouseEvent<HTMLElement>) => any | any
}

export const SidebarLinks=({ onClickRoute }: Props) =>{
  const pathname = usePathname()

  const activeRoute = (routeName: string) => {
    return pathname.includes(routeName);
  };

  const createLinks = (routes: MenuItemAdmin[]) => {
    return routes.map((route: MenuItemAdmin, index: number) => {
        return (
          // <Link key={index} href={route.layout + "/" + route.path}>
          <Link key={index} href={route.path} onClick={onClickRoute}>
            <div className="relative py-1 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${activeRoute(route.path) === true
                    ? "font-bold text-base text-s2cyan1"
                    : "font-medium text-gray-600"
                    }`}
                >
                  {route.icon ? parse(route.icon) : <Squares2X2Icon className="h-6 w-6"></Squares2X2Icon>}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${activeRoute(route.path) === true
                    ? "font-bold text-navy-700"
                    : "font-medium text-gray-600"
                    }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-s2cyan1" />
              ) : null}
            </div>
          </Link>
        );
      });
  };

  // BRAND
  return createLinks(menuAdmin);
}

export default SidebarLinks;
