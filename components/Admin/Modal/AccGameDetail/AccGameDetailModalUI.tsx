"use client"

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI, SelectUI } from '@/components';
import { accGameDetailType } from '@/utils/constant/AccGameDetail/AccGameDetailType';
import { showToast } from '@/utils/showToast';
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { convertNumberENtoNumber, convertNumberStrENtoString, isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'
import SelectPropertyModalUI from './SelectPropertyModalUI';
import ReturnPropertyModalUI from './ReturnPropertyModalUI';

interface Props{
    closeModal:()=>void,
    idAccGameDetail:string | null,
    idCategory:string,
    refreshAllAccGameDetailCreate:()=>Promise<void>,
    refreshAllAccGameDetailUpdate:()=>Promise<void>,
    adminDisplay:AdminDisplay | null
}

const AccGameDetailModalUI = ({closeModal, idAccGameDetail, idCategory, refreshAllAccGameDetailCreate, refreshAllAccGameDetailUpdate, adminDisplay}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);

    const isCreate=isNullOrEmpty(idAccGameDetail);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [isChangeData, setIsChangeData] = useState<boolean>(false);
    const [isOpenPropertiesModal, setIsOpenPropertiesModal]=useState<boolean>(false);
    const [isOpenReturnPropertiesModal, setIsOpenReturnPropertiesModal]=useState<boolean>(false);

    const [properties, setProperties]=useState<string>('[]');
    const [price, setPrice]=useState<number>(0);
    const [discount, setDiscount]=useState<number>(0);
    const [active, setActive]=useState<boolean>(true);
    const [deposit, setDeposit]=useState<number>(0);
    const [description, setDescription]=useState<string | undefined>("");
    const [returnProperties, setReturnProperties]=useState<string>("[]");
    const [type, setType]=useState<any>(accGameDetailType[0]);

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
                    const result = await accGameDetailApiRequest.createAccGameDetail({body:data.data, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "tài khoản game")}</p>);
                        closeModal();
                        refreshAllAccGameDetailCreate();
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
                }
                else{
                    const result = await accGameDetailApiRequest.updateAccGameDetail({id:idAccGameDetail,body:data.data, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "tài khoản game")}</p>);
                        closeModal();
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

    const openModalProperties=()=>
        setIsOpenPropertiesModal(!isOpenPropertiesModal);

    const openModalReturnProperties=()=>
        setIsOpenReturnPropertiesModal(!isOpenReturnPropertiesModal);

    const setPropertyValueJson =(propertyValue:string)=>{
        setProperties(propertyValue);
        setIsChangeData(true);
    }

    const setReturnPropertiesJson =(propertyValue:string)=>{
        setReturnProperties(propertyValue);
        setIsChangeData(true);
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "price":
                if (/^\d*\.?\d*$/.test(convertNumberStrENtoString(e.target.value))) {
                    setPrice(convertNumberENtoNumber(e.target.value));
                    setIsChangeData(true);
                }
                break;
            case "active":
                setActive(e.target.isChecked);
                setIsChangeData(true);
                break;
            case "description":
                setDescription(e.target.value);
                setIsChangeData(true);
                break;
            case "type":
                setType(e);
                setIsChangeData(true);
                break;
            case "deposit":
                if (/^\d*\.?\d*$/.test(convertNumberStrENtoString(e.target.value))) {
                    setDeposit(convertNumberENtoNumber(e.target.value));
                    setIsChangeData(true);
                }
                break;
            case "discount":
                if (/^\d*\.?\d*$/.test(convertNumberStrENtoString(e.target.value))) {
                    if(Number(e.target.value)>99)
                        setDiscount(99);
                    else
                        setDiscount(convertNumberENtoNumber(e.target.value));

                    setIsChangeData(true);
                }
            default:
                break;
        }
    }

    const getAccGameDetailInit=async (): Promise<void> => {
        try{
            await accGameDetailApiRequest.getAccGameDetailById({
                id:idAccGameDetail, 
                fields:"?fields=Price%2CDescription%2CType%2CDiscount%2CDeposit%2CActive%2CProperties%2CReturnProperties", 
                token:adminDisplay?.token
            }).then((res)=>{
                setActive(res.payload.data.Active);
                setPrice(res.payload.data.Price);
                setDescription(res.payload.data.Description);
                setDiscount(res.payload.data.Discount);
                setDeposit(res.payload.data.Deposit);
                setType(accGameDetailType.find(item=>item.Value==res.payload.data.Type));
                setProperties(res.payload.data.Properties?res.payload.data.Properties:"[]");
                setReturnProperties(res.payload.data.ReturnProperties?res.payload.data.ReturnProperties:"[]")
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
            {isOpenPropertiesModal && (<SelectPropertyModalUI closeModel={openModalProperties} propertyValueJson={properties} idCategory={idCategory}
            setPropertyValueJson={setPropertyValueJson} adminDisplay={adminDisplay}></SelectPropertyModalUI>)}

            {isOpenReturnPropertiesModal && (<ReturnPropertyModalUI closeModel={openModalReturnProperties} returnPropertiesJson={returnProperties} 
            setReturnPropertiesJson={setReturnPropertiesJson}></ReturnPropertyModalUI>)}

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
                                    <InputUI value={price.toLocaleString('en')} name='Price' label={"Giá :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("price")} max={12}
                                    errArr={errArr?.filter((error)=>error.for==="price")}
                                    unit={"VND"} classUint={"w-[20%] text-base font-semibold text-yellow-500"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1 pt-[2.5rem]">
                                    <CheckboxUI name='Active' isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-2/5"} 
                                    isChecked={active} onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI value={discount} name='Discount' label={"Giảm giá :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("discount")}
                                    errArr={errArr?.filter((error)=>error.for==="discount")}
                                    unit={"%"} classUint={"w-[20%] text-base font-semibold text-red-500"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <InputUI value={deposit.toLocaleString('en')} name='Deposit' label={"Đặt cọc :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("deposit")}
                                    errArr={errArr?.filter((error)=>error.for==="deposit")}
                                    unit={"VND"} classUint={"w-[20%] text-base font-semibold text-yellow-500"}></InputUI>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <SelectUI label={"Loại :"} name={"AccGameDetailType"} data={accGameDetailType} selected={type}
                                    classDiv={"w-full"} classSelect={"w-full"} onChangeEvent={handleChange("type")}></SelectUI>
                                </div>

                                <div className="col-span-2">
                                    <InputUI name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                    value={description}
                                    onChangeEvent={handleChange("description")}
                                    ></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-row gap-1'>
                                        <InputUI value={properties} name='Properties' label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                        <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            openModalProperties();
                                        }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-row gap-1'>
                                        <InputUI value={returnProperties} name='ReturnProperties' label={"Thuộc tính gửi khách hàng:"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                        <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            openModalReturnProperties();
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