"use client"

import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI } from '@/components';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useState } from 'react'

interface Props{
    closeModal:()=>void,
    idAccGameDetail:string | undefined,
    idCategory:string | undefined,
}

const AccGameDetailModalUI = ({closeModal, idAccGameDetail}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const isCreate=isNullOrEmpty(idAccGameDetail);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [isChangeData, setIsChangeData] = useState<boolean>(false);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
    }
    
    return (
        <>
            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tài khoản game
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

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI name='Price' label={"Giá :"} classDiv={"w-full"} classInput={"w-full"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1 pt-[2.4rem]">
                                    <CheckboxUI name='Active' isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-2/5"} isChecked={false}></CheckboxUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI name='Discount' label={"Giảm giá :"} classDiv={"w-full"} classInput={"w-full"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI name='Deposit' label={"Đặt cọc :"} classDiv={"w-full"} classInput={"w-full"}></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-row gap-1'>
                                        <InputUI name='Properties' label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isDisabled={true}></InputUI>

                                        <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            
                                        }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
                                    </div>
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
        </>
    )
}

export default AccGameDetailModalUI