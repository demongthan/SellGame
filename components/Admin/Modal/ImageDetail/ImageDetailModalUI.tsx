"use client"

import { imageDetailApiRequest } from '@/apiRequests/image-detail';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI } from '@/components';
import { showToast } from '@/utils/showToast';
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

interface Props{
    closeModal:()=>void,
    idImageDetail:string,
    refreshAllCategoryCreate:()=>Promise<void>,
    refreshAllCategoryUpdate:()=>Promise<void>,
    adminDisplay:AdminDisplay | null
}

const ImageDetailModalUI = ({closeModal, idImageDetail, refreshAllCategoryCreate, refreshAllCategoryUpdate, adminDisplay}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);

    const [isChangeData, setIsChangeData] = useState<boolean>(false);
    const isCreate=isNullOrEmpty(idImageDetail);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();

    const [description, setDescription] = useState<string>("");
    const [active, setActive] = useState<boolean>(true);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setErrArr([]);
        setIsLoadingPopup(true);

        try{
            if(isCreate){
                const formData = new FormData(event.currentTarget)
                formData.append("isCreate", isCreate?"true":"false");

                const response = await fetch('/api/image-detail', {
                    method: 'POST',
                    body: formData,
                })

                const data = await response.json();

                if(data.isSuccess){
                    const result = await imageDetailApiRequest.createImageDetail({body:data.data, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "ảnh")}</p>);
                        refreshAllCategoryCreate();
                        closeModal();
                    }
                    else{
                        showToast("error", <p>{result.payload.message.replace("{Item}", "ảnh")}</p>);
                    }

                    setIsLoadingPopup(false);
                }
                else{
                    const errorArr: ErrorValidate[] =data.data.map(({...item})=>({
                        for:item.for,
                        message: item.message
                    }))
            
                    setErrArr(errorArr);
                    setIsLoadingPopup(false);
                }
            }
            else{
                const updateImageDetailDto:UpdateImageDetailDto={
                    Description:description,
                    Active:active
                }

                const result = await imageDetailApiRequest.updateImageDetail({id:idImageDetail, body:updateImageDetailDto, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "ảnh")}</p>);
                        refreshAllCategoryUpdate();
                        closeModal();
                    }
                    else{
                        showToast("error", <p>{result.payload.message.replace("{Item}", "ảnh")}</p>);
                    }

                setIsLoadingPopup(false);
            }
        }
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoadingPopup(false);
        }
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "description":
                setDescription(e.target.value);
                setIsChangeData(true);
                break;
            case "active":
                setActive(!active);
                setIsChangeData(true);
            default:
                break;
        }
    }

    const getImageDetailInit=async (): Promise<void> => {
        try{
            await imageDetailApiRequest.getImageDetailById({id:idImageDetail, fields:"Description%2CActive", token:adminDisplay?.token}).then((res)=>{
                setActive(res.payload.data.Active);
                setDescription(res.payload.data.Description);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        if(!isCreate){
            getImageDetailInit();
        }
        else{
            setIsLoading(false);
        }
    },[setActive, setDescription])

  return (
    <>
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Ảnh
                            </h3>
                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                            w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                event.preventDefault();
                                
                                closeModal();
                            }}>
                                <XMarkIcon className="w-6 h-6"></XMarkIcon>
                                <span className="sr-only">Close modal</span>
                            </Button>
                        </div>
                        
                        {isLoadingPopup &&(
                            <div className='w-full h-full flex items-center justify-center bg-s2gray7 absolute top-0 z-[1000]'>
                                <span className='loader'></span>
                            </div>
                        )} 

                        <form className="p-4 md:p-5" onSubmit={onSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {isCreate && (
                                    <div className="col-span-2">
                                        <InputUI name='Code' label={"Mã số :"} classDiv={"w-full"} classInput={"w-full"}
                                        errArr={errArr?.filter((error)=>error.for==="code")} ></InputUI>
                                    </div>
                                )}

                                <div className="col-span-2">
                                    <InputUI name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                    value={description}
                                    onChangeEvent={handleChange("description")}
                                    ></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-1/5"}
                                    onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>
                            </div>

                            <div className='mt-6'>
                                {isCreate?(
                                    <ButtonAddItemUI type='submit' titleButton={'Tạo'} eventButtonClicked={ (): void =>{} }></ButtonAddItemUI>
                                ):(
                                    <ButtonUpdateItemUI isDisabled={!isChangeData} type='submit' titleButton={'Cập nhật'} eventButtonClicked={function (): void {} }></ButtonUpdateItemUI>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default ImageDetailModalUI