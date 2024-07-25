"use client"

import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const BreadCrumb = () => {
    const paths = usePathname()
    const params = useSearchParams();
    const pathNames:string[] = paths.split('/').filter(_=>_!="");
    const pathTitle:any= params.get("title")?.split(',');

    console.log(pathNames, params.get("title"))

  return (
    <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
                <Link href={"/"} className='inline-flex items-center text-base font-semibold leading-6 text-gray-700 hover:text-blue-600'>
                    <HomeIcon className='w-5 h-5 me-2.5 -mt-1' aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"></HomeIcon> Trang chủ
                </Link>
            </li>

            {pathNames.map((pathName, index)=>(
                <li key={index}>
                    {index==(pathNames.length-1)?(
                        <div className="flex items-center">
                            <ChevronDoubleRightIcon className="rtl:rotate-180 block w-5 h-5 mx-1 text-gray-400 "></ChevronDoubleRightIcon>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{pathTitle[index]}</span>
                        </div>
                    ):(
                        <div className="flex items-center">
                            <ChevronDoubleRightIcon className="rtl:rotate-180 block w-5 h-5 mx-1 text-gray-400 "></ChevronDoubleRightIcon>
                            <Link href={`/${pathNames.slice(0, index + 1).join('/')}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">{pathTitle[index]}</Link>
                        </div>
                    )} 
                </li>
            ))}
        </ol>
    </nav>
  )
}

export default BreadCrumb