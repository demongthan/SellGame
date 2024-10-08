"use client"

import { Button } from '@headlessui/react';
import Image from 'next/image'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'

import { AdminDisplay } from '@/utils/types/Auth/AdminDisplay'
import { showToast } from '@/utils/showToast';
import { categoryApiRequest } from '@/apiRequests/category';
import { isNullOrEmpty } from '@/utils/utils';
import LoadingUI from '@/components/Common/LoadingUI';

interface Props{
    closeModel:()=>void,
    adminDisplay:AdminDisplay | null,
    pathUrl?:string,
    indexPropertyValue:number,
    changePropertyPathUrl:(url:string ,index:number)=>void,
    idPropertyDetail:string,
}

const UploadImagePropertyValueModalUI = ({pathUrl, closeModel, adminDisplay, changePropertyPathUrl, indexPropertyValue, idPropertyDetail}:Props) => {
    const [file, setFile] = useState<any>(null);
    const [srcFile, setSrcFile]=useState<string | undefined>(pathUrl);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isChangeData, setIsChangeData] = useState<boolean>(false);

    const handleFileChange = (event:any) => {
        const fileUpload = event.target.files[0];

        if(fileUpload){
            setFile(fileUpload);
            setSrcFile(URL.createObjectURL(fileUpload));
            setIsChangeData(true);
        }
    }

    const eventUploadImage = async ():Promise<void>=>{
        setIsLoadingPopup(true);    
        try{
            const formData:FormData = new FormData();
            formData.append("file", file);
            formData.append("pathUrl", srcFile?srcFile:"");

            await categoryApiRequest.uploadImageCategoryPropertyDetail({idPropertyDetail:idPropertyDetail,body:formData, token:adminDisplay?.token}).then((res)=>{
                if(!isNullOrEmpty(res.payload.data)){
                    showToast("success", <p>{res.payload.message}</p>)
                    closeModel();
                    changePropertyPathUrl(res.payload.data, indexPropertyValue);
                }
                else{
                    showToast("error", <p>{res.payload.message}</p>);
                }

                setIsLoadingPopup(false); 
            });
        }
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoadingPopup(false); 
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300); 
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[300] justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-xs max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        {isLoadingPopup &&(
                            <div className='w-full h-full flex items-center justify-center bg-s2gray7 absolute top-0 z-[1000]'>
                                <span className='loader'></span>
                            </div>
                        )} 

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
                                {srcFile && (<Image src={srcFile} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} alt='Uplaoded Media'></Image>)}

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
                                <Button disabled={file==null || !isChangeData} className={`flex flex-row gap-2 justify-center items-center text-white bg-s2cyan1 border border-transparent 
                                    rounded-md px-4 h-9 disabled:opacity-70 hover:opacity-70`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                        event.preventDefault();
                                        eventUploadImage();
                                    }}>
                                    <ArrowUpTrayIcon className="h-[1.5rem] w-[1.5rem]"></ArrowUpTrayIcon>
                                    Tải ảnh
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadImagePropertyValueModalUI