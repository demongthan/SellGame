"use client"

import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'
import Image from 'next/image'

interface Props{
    closeModel:()=>void,
}

const UploadImageModalUI = ({closeModel}:Props) => {
    const [file, setFile] = useState<any>("")

  const handleFileChange = (event:any) => {
    const fileUpload = event.target.files[0];

    setFile(fileUpload);
  }

  return (
    <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] justify-center bg-model
    items-center w-full md:inset-0 h-full max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Ảnh
                    </h3>
                    <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                    w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();
                        
                        closeModel();
                      }}>
                        <XMarkIcon className="w-6 h-6"></XMarkIcon>
                        <span className="sr-only">Close modal</span>
                    </Button>
                </div>
                
                <div className="p-4 md:p-5">
                    <div className="flex flex-col gap-4 mb-4">
                        {file && <Image src={URL.createObjectURL(file)} width={1000} height={1000} alt='Uplaoded Media'></Image>}

                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                            "/>
                        </label>
                    </div>

                    <div className='mt-6'>
                    <Button className={`flex flex-row gap-2 justify-center items-center text-white bg-s2cyan1 border border-transparent 
                        rounded-md px-4 h-9 disabled:opacity-70 hover:opacity-70`}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                event.preventDefault();
                            
                
                        }}>
                        <ArrowUpTrayIcon className="h-[1.5rem] w-[1.5rem]"></ArrowUpTrayIcon>
                        Tải ảnh
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UploadImageModalUI