"use client"

import { serviceDetailApiRequest } from '@/apiRequests/service-detail';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI, PropertyServiceDetailModalUI, SelectUI } from '@/components';
import { methodCalculateSelects, MethodCalculateSelectValue } from '@/utils/constant/MethodCalculateSelect';
import { showToast } from '@/utils/showToast';
import { isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

interface Props{
    closeModal:()=>void,
    idServiceDetail:string,
    refreshAllServiceDetailCreate:()=>Promise<void>,
    refreshAllServiceDetailUpdate:()=>Promise<void>,
}

const ServiceDetailModalUI = ({closeModal, idServiceDetail, refreshAllServiceDetailCreate, refreshAllServiceDetailUpdate}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [isChangeData, setIsChangeData] = useState<boolean>(false);

    const isCreate=isNullOrEmpty(idServiceDetail);

    const [name, setName]=useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [active, setActive] = useState<boolean>(true);
    const [method, setMethod] = useState<MethodCalculateSelectValue>(methodCalculateSelects[0]);
    const [unit, setUnit] = useState<string>("");
    const [unitPrice, setUnitPrice] = useState<number>(1);
    const [properties, setProperties]=useState<string>('[]');
    const [isOpenPropertyModal, setIsOpenPropertyModal] = useState<boolean>(false);

    const openPropertyModal=()=>
        setIsOpenPropertyModal(!isOpenPropertyModal)

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setErrArr([]);
        setIsLoadingPopup(true);

        try{
            const formData = new FormData(event.currentTarget)
            formData.append("IsCreate", isCreate?"true":"false");

            const response = await fetch('/api/service-detail', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();

            if(data.isSuccess){
                let result;

                if(isCreate)
                    result = await serviceDetailApiRequest.createServiceDetail(data.data);
                else
                    result = await serviceDetailApiRequest.updateServiceDetail({id: idServiceDetail,body:data.data});

                if(result.payload.data){
                    showToast("success", <p>{result.payload.message.replace("{Item}", "dịch vụ")}</p>);

                    refreshAllServiceDetailCreate();
                }
                else{
                    showToast("error", <p>{result.payload.message.replace("{Item}", "dịch vụ")}</p>);
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

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "name":
                setName(e.target.value);
                setIsChangeData(true);
                break;
            case "description":
                setDescription(e.target.value);
                setIsChangeData(true);
                break;
            case "method":
                setMethod(e);
                setIsChangeData(true);
                break;
            case "unit":
                setUnit(e.target.value);
                setIsChangeData(true);
                break;
            case "unitPrice":
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        setUnitPrice(0);
                    else
                        setUnitPrice(e.target.value);
                    setIsChangeData(true);
                }
                break;
            case "active":
                setActive(e.target.isChecked);
                setIsChangeData(true);
                break;
            default:
                break;
        }
    }

    const getServiceDetailInit=async():Promise<void>=>{
        try{
            await serviceDetailApiRequest.getServiceDetailById({id:idServiceDetail, fields:"?fields=Name%2CMethod%2CUnitPrice%2CUnit%2CProperties%2CDescription%2CActive"}).then((res)=>{
                setName(res.payload.data.Name);
                setDescription(res.payload.data.Description);
                setMethod(methodCalculateSelects[methodCalculateSelects.findIndex(_=>_.Value==res.payload.data.Method)]);
                setUnit(res.payload.data.Unit);
                setUnitPrice(res.payload.data.UnitPrice);
                setActive(res.payload.data.Active);
                setProperties(res.payload.data.Properties);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const addProperties=(value:string)=>{
        setProperties(value);
        setIsChangeData(true);
    }

    useEffect(()=>{
        if(isCreate){
            setIsLoading(false);
        }
        else{
            getServiceDetailInit();
        }
    },[setName, setIsLoading, setDescription, setMethod, setUnit, setUnitPrice, setActive, setProperties])

    return (
        <>
            {isOpenPropertyModal && (<PropertyServiceDetailModalUI closeModal={openPropertyModal} method={method.Value} 
            propertiesJson={'[]'} setProperties={addProperties}></PropertyServiceDetailModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {isLoading?(<LoadingUI></LoadingUI>):(
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Dịch vụ Game
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
                                    <div className="col-span-2">
                                        <InputUI value={name} name='Name' label={"Tên :"} classDiv={"w-full"} classInput={"w-full"}
                                        errArr={errArr?.filter((error)=>error.for==="name")} onChangeEvent={handleChange("name")}></InputUI>
                                    </div>

                                    <div className="col-span-2">
                                        <InputUI value={description} name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                        onChangeEvent={handleChange("description")}></InputUI>
                                    </div>

                                    {isCreate && (<div className="col-span-2 sm:col-span-1">
                                        <SelectUI selected={method} label={"Phương thức :"} name={"MethodCalculate"} data={methodCalculateSelects}
                                        onChangeEvent={handleChange("method")}></SelectUI>
                                    </div>)}

                                    <div className={`col-span-2 ${isCreate?"sm:col-span-1":""}`}>
                                        <InputUI value={unit} name='Unit' label={"Đơn vị :"} classDiv={"w-full"} classInput={"w-full"}
                                        errArr={errArr?.filter((error)=>error.for==="unit")}
                                        onChangeEvent={handleChange("unit")}></InputUI>
                                    </div>

                                    <div className="col-span-2">
                                        <InputUI value={unitPrice} max={9} name='UnitPrice' label={"Đơn giá :"} classDiv={"w-full"} classInput={"w-[70%] text-right"}
                                        onChangeEvent={handleChange("unitPrice")}
                                        errArr={errArr?.filter((error)=>error.for==="unitPrice")}
                                        unit={"/ 1.000VND"} classUint={"w-[30%] text-base font-semibold text-brand-300"}></InputUI>
                                    </div>

                                    <div className="col-span-2">
                                        <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-1/5"}
                                        onChangeEvent={handleChange("active")}></CheckboxUI>
                                    </div>

                                    <div className="col-span-2">
                                        <div className='flex flex-row gap-1'>
                                            <InputUI name='Properties' value={properties} label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                            <Button disabled={isNullOrEmpty(name)} className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                openPropertyModal();
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
            </div>
        </>
    )
}

export default ServiceDetailModalUI