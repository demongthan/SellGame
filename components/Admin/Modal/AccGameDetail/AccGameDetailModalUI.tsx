"use client"

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI, SelectPropertyModalUI } from '@/components';
import { showToast } from '@/utils/showToast';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

interface Props{
    closeModal:()=>void,
    idAccGameDetail:string | null,
    idCategory:string,
    refreshAllAccGameDetailCreate:()=>Promise<void>,
    refreshAllAccGameDetailUpdate:()=>Promise<void>
}

const AccGameDetailModalUI = ({closeModal, idAccGameDetail, idCategory, refreshAllAccGameDetailCreate, refreshAllAccGameDetailUpdate}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const isCreate=isNullOrEmpty(idAccGameDetail);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [isChangeData, setIsChangeData] = useState<boolean>(false);
    const [isOpenPropertiesModal, setIsOpenPropertiesModal]=useState<boolean>(false);

    const [properties, setProperties]=useState<string>('[]');
    const [price, setPrice]=useState<number>(0);
    const [discount, setDiscount]=useState<number>(0);
    const [active, setActive]=useState<boolean>(true);
    const [deposit, setDeposit]=useState<number>(0);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setErrArr([]);
        setIsLoadingPopup(true);

        try{
            const formData = new FormData(event.currentTarget)
            formData.append("IdCategory", idCategory);
            formData.append("IsCreate", isCreate?"true":"false");

            const response = await fetch('/api/acc-game-detail', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();

            if(data.isSuccess){
                if(isCreate){
                    const result = await accGameDetailApiRequest.createAccGameDetail(data.data);

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "tài khoản game")}</p>);

                        refreshAllAccGameDetailCreate();
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
                }
                else{
                    const result = await accGameDetailApiRequest.updateAccGameDetail({id:idAccGameDetail,body:data.data});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "tài khoản game")}</p>);

                        refreshAllAccGameDetailUpdate();
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
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
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoadingPopup(false);
        }
    }

    const openModal=()=>
        setIsOpenPropertiesModal(!isOpenPropertiesModal);

    const setPropertyValueJson =(propertyValue:string)=>
        setProperties(propertyValue);

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "price":
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        setPrice(0);
                    else
                        setPrice(e.target.value);

                    setIsChangeData(true);
                }
                break;
            case "active":
                setActive(e.target.isChecked);
                setIsChangeData(true);
                break;
            case "deposit":
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        setDeposit(0);
                    else
                        setDeposit(e.target.value);

                    setIsChangeData(true);
                }
                break;
            case "discount":
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                    console.log(Number(e.target.value)>99)
                    if(Number(e.target.value)>99)
                        setDiscount(99);
                    else if(isNullOrEmpty(e.target.value))
                        setDiscount(0);
                    else
                        setDiscount(e.target.value);

                    setIsChangeData(true);
                }
            default:
                break;
        }
    }

    const getAccGameDetailInit=async (): Promise<void> => {
        try{
            await accGameDetailApiRequest.getAccGameDetailById({id:idAccGameDetail, fields:"?fields=Price%2CDiscount%2CDeposit%2CActive%2CProperties"}).then((res)=>{
                setActive(res.payload.data.Active);
                setPrice(res.payload.data.Price);
                setDiscount(res.payload.data.Discount);
                setDeposit(res.payload.data.Deposit);
                setProperties(res.payload.data.Properties?res.payload.data.Properties:"[]");
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(isCreate){
            setIsLoading(false);
        }
        else{
            getAccGameDetailInit();
        }
    },[setProperties, setPrice, setDiscount, setDeposit, setActive])
    
    return (
        <>
            {isOpenPropertiesModal && (<SelectPropertyModalUI closeModel={openModal} propertyValueJson={properties} idCategory={idCategory} 
            setPropertyValueJson={setPropertyValueJson}></SelectPropertyModalUI>)}

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
                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI value={price} name='Price' label={"Giá :"} classDiv={"w-full"} classInput={"w-[85%]"}
                                    onChangeEvent={handleChange("price")} max={9}
                                    errArr={errArr?.filter((error)=>error.for==="price")}
                                    unit={"VND"} classUint={"w-[15%]"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1 pt-[2.5rem]">
                                    <CheckboxUI name='Active' isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-2/5"} 
                                    isChecked={active} onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI value={discount} name='Discount' label={"Giảm giá :"} classDiv={"w-full"} classInput={"w-[85%]"}
                                    onChangeEvent={handleChange("discount")}
                                    errArr={errArr?.filter((error)=>error.for==="discount")}
                                    unit={"%"} classUint={"w-[15%]"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI value={deposit} name='Deposit' label={"Đặt cọc :"} classDiv={"w-full"} classInput={"w-[85%]"}
                                    onChangeEvent={handleChange("deposit")}
                                    errArr={errArr?.filter((error)=>error.for==="deposit")}
                                    unit={"VND"} classUint={"w-[15%]"}></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-row gap-1'>
                                        <InputUI value={properties} name='Properties' label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                        <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            openModal();
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