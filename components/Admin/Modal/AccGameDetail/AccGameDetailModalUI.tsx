"use client"
import { Button, Input } from '@headlessui/react';
import { PencilSquareIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, DeleteWarningModalUI, InputUI, LoadingUI, SelectUI } from '@/components';
import { accGameDetailType, AccGameDetailTypeItem } from '@/utils/constant/AccGameDetail/AccGameDetailType';
import { showToast } from '@/utils/showToast';
import { AdminDisplay } from '@/utils/types/Auth/AdminDisplay';
import { convertNumberENtoNumber, convertNumberStrENtoString, isNullOrEmpty, truncateString } from '@/utils/utils';
import SelectPropertyModalUI from './SelectPropertyModalUI';
import ReturnPropertyModalUI from './ReturnPropertyModalUI';
import { CreateAccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/CreateAccGameDetailDto';
import { UpdateAccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/UpdateAccGameDetailDto';
import { PropertiesItemJson } from '@/utils/types/Json/PropertiesItemJson';
import { ValueReturnItem } from '@/utils/types/Json/ValueReturnItem';

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
    const [isOpenWarningModal, setIsOpenWarningModal]=useState<boolean>(false);

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
    const [type, setType]=useState<AccGameDetailTypeItem>(accGameDetailType[0]);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setErrArr([]);
        setIsLoadingPopup(true);

        try{
            const formData = new FormData(event.currentTarget);
            formData.append("Price", price.toString());
            formData.append("Discount", discount.toString());
            formData.append("Deposit", deposit.toString());

            const response = await fetch('/api/acc-game-detail', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();

            if(data.isSuccess){
                if(isCreate){
                    const createAccGameDetailDto: CreateAccGameDetailDto={
                        IdCategory:idCategory,
                        Price: price,
                        Discount: discount,
                        Deposit: deposit,
                        Active: active,
                        Properties: properties,
                        Description: description,
                        ReturnProperties: returnProperties,
                        Type:type.Value
                    }
                    const result = await accGameDetailApiRequest.createAccGameDetail({body:createAccGameDetailDto, token:adminDisplay?.token});

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
                    const updateAccGameDetailDto: UpdateAccGameDetailDto={
                        Price: price,
                        Discount: discount,
                        Deposit: deposit,
                        Active: active,
                        Properties: properties,
                        Description: description,
                        ReturnProperties: returnProperties,
                        Type:type.Value
                    }

                    const result = await accGameDetailApiRequest.updateAccGameDetail({id:idAccGameDetail,body:updateAccGameDetailDto, token:adminDisplay?.token});

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
                const typeAccGame=accGameDetailType.find(item=>item.Value==res.payload.data.Type);

                setActive(res.payload.data.Active);
                setPrice(res.payload.data.Price);
                setDescription(res.payload.data.Description);
                setDiscount(res.payload.data.Discount);
                setDeposit(res.payload.data.Deposit);
                setType(typeAccGame?typeAccGame:accGameDetailType[0]);
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

    const openWarningModal=()=>
        setIsOpenWarningModal(!isOpenWarningModal);

    const eventCloseModal=async()=>{
        openWarningModal();
        closeModal();
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

            {isOpenWarningModal && (<DeleteWarningModalUI closeModal={openWarningModal} title={'Cảnh báo dữ liệu thay đổi'} description={'Bạn thay đổi dữ liệu, nhưng chưa lưu.'} 
            eventDeleteItem={eventCloseModal} isDelete={false}></DeleteWarningModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow max-w-[50rem] w-[50rem]">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tài khoản game
                            </h3>
                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                            w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                event.preventDefault();
                                if(isChangeData)
                                    openWarningModal();
                                else
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
                            <div className="grid gap-4 mb-4 grid-cols-3">
                                <div className="col-span-1">
                                    <InputUI value={price.toLocaleString('en')} name='Price' label={"Giá :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("price")} max={12}
                                    errArr={errArr?.filter((error)=>error.for==="price")}
                                    unit={"VND"} classUint={"w-[20%] text-base font-semibold text-yellow-500"}></InputUI>
                                </div>

                                <div className="col-span-1">
                                    <InputUI value={discount} name='Discount' label={"Giảm giá :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("discount")}
                                    errArr={errArr?.filter((error)=>error.for==="discount")}
                                    unit={"%"} classUint={"w-[20%] text-base font-semibold text-red-500"}></InputUI>
                                </div>

                                <div className="col-span-1">
                                    <InputUI value={deposit.toLocaleString('en')} name='Deposit' label={"Đặt cọc :"} classDiv={"w-full"} classInput={"w-[80%]"}
                                    onChangeEvent={handleChange("deposit")}
                                    errArr={errArr?.filter((error)=>error.for==="deposit")}
                                    unit={"VND"} classUint={"w-[20%] text-base font-semibold text-yellow-500"}></InputUI>
                                </div>

                                <div className="col-span-1 pt-[2.5rem]">
                                    <CheckboxUI name='Active' isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-2/5"} 
                                    isChecked={active} onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>

                                <div className="col-span-2">
                                    <SelectUI label={"Loại :"} name={"AccGameDetailType"} data={accGameDetailType} selected={type}
                                    classDiv={"w-full"} classSelect={"w-full"} onChangeEvent={handleChange("type")}></SelectUI>
                                </div>

                                <div className="col-span-3">
                                    <InputUI name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                    value={description}
                                    onChangeEvent={handleChange("description")}
                                    ></InputUI>
                                </div>

                                <div className="col-span-3">
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row w-full'>
                                            <label className='text-base text-black font-semibold leading-6 w-[90%]'>Thuộc tính:</label>

                                            <Button className={"w-[10%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                openModalProperties();
                                            }}>{isCreate?(<PlusCircleIcon className='h-[1.5rem] w-[1.5rem] text-green-400'></PlusCircleIcon>)
                                            :(<PencilSquareIcon className='h-[1.5rem] w-[1.5rem] text-blue-600'></PencilSquareIcon>)}</Button>
                                        </div>
                                    </div>

                                    <Input value={properties} name='Properties' readOnly={true} hidden={true}></Input>
                                    
                                    <div className="flex flex-col w-full py-2 mt-2 max-h-[7.2rem] overflow-y-auto">
                                        {properties && JSON.parse(properties).map((property:PropertiesItemJson, index: number)=>(
                                            <div key={index} className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                                <div className="flex w-full items-center border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div className="w-full items-center flex py-1">
                                                        <div className="w-4/5 "><span className='text-sm font-semibold'>{property.Name}</span>
                                                            <div className="text-xs truncate w-full normal-case font-normal text-gray-500">{truncateString(property.Value.map(_=>_.Value). join(" | "), 80)}</div>
                                                        </div>
                                                        <div className="w-1/5 flex">
                                                            {!property.IsShow && !isNullOrEmpty(property.Description) && (<div className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-fuchsia-700 bg-fuchsia-100 border border-teal-300 `}>
                                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">{truncateString(property.Description?property.Description:"", 20)}</div>
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row w-full'>
                                            <label className='text-base text-black font-semibold leading-6 w-[90%]'>Thuộc tính:</label>

                                            <Button className={"w-[10%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                openModalReturnProperties();
                                            }}>{isCreate?(<PlusCircleIcon className='h-[1.5rem] w-[1.5rem] text-green-500'></PlusCircleIcon>)
                                            :(<PencilSquareIcon className='h-[1.5rem] w-[1.5rem] text-blue-600'></PencilSquareIcon>)}</Button>
                                        </div>
                                    </div>

                                    <Input value={returnProperties} name='ReturnProperties' readOnly={true} hidden={true}></Input>

                                    <div className="flex flex-col w-full py-2 mt-2 max-h-[7.2rem] overflow-y-auto">
                                        {returnProperties && JSON.parse(returnProperties).map((returnProperty:ValueReturnItem, index:number) =>(
                                            <div key={index} className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                                <div className="flex w-full items-center border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div className="w-full items-center flex py-1">
                                                        <div className="w-4/5 "><span className='text-sm font-semibold'>{returnProperty.Name}</span>
                                                            <div className="text-xs truncate w-full normal-case font-normal text-gray-500">{returnProperty.Value}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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