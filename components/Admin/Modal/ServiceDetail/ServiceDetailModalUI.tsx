"use client"

import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI, PropertyServiceDetailModalUI, SelectUI } from '@/components';
import { methodCalculateSelects, MethodCalculateSelectValue } from '@/utils/constant/MethodCalculateSelect';
import { MethodCalculate } from '@/utils/types/MethodCalculate';
import { isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useState } from 'react'

interface Props{
    closeModal:()=>void,
    idServiceDetail:string,
    refreshAllServiceDetailCreate:()=>Promise<void>,
    refreshAllServiceDetailUpdate:()=>Promise<void>,
}

const ServiceDetailModalUI = ({closeModal, idServiceDetail, refreshAllServiceDetailCreate, refreshAllServiceDetailUpdate}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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


    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "name":
                setName(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "method":
                setMethod(e);
                break;
            case "unit":
                setUnit(e.target.value);
                break;
            case "unitPrice":
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        setUnitPrice(0);
                    else
                        setUnitPrice(e.target.value);
                }
                break;
            case "active":
                setActive(e.target.isChecked);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <PropertyServiceDetailModalUI closeModal={function (): void {
                throw new Error('Function not implemented.');
            } } method={MethodCalculate.InputSelectCoefficient} propertiesJson={'[]'}></PropertyServiceDetailModalUI>

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

                                    <div className="col-span-2 sm:col-span-1">
                                        <SelectUI selected={method} label={"Phương thức :"} name={"MethodCalculate"} data={methodCalculateSelects}
                                        onChangeEvent={handleChange("method")}></SelectUI>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <InputUI value={unit} name='Unit' label={"Đơn vị :"} classDiv={"w-full"} classInput={"w-full"}
                                        onChangeEvent={handleChange("unit")}></InputUI>
                                    </div>

                                    <div className="col-span-2">
                                        <InputUI value={unitPrice} max={9} name='UintPrice' label={"Đơn giá :"} classDiv={"w-full"} classInput={"w-[70%] text-right"}
                                        onChangeEvent={handleChange("unitPrice")}
                                        errArr={errArr?.filter((error)=>error.for==="uintPrice")}
                                        unit={"/ 1.000VND"} classUint={"w-[30%] text-base font-semibold text-brand-300"}></InputUI>
                                    </div>

                                    <div className="col-span-2">
                                        <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-1/5"}
                                        onChangeEvent={handleChange("active")}></CheckboxUI>
                                    </div>

                                    <div className="col-span-2">
                                        <div className='flex flex-row gap-1'>
                                            <InputUI name='Properties' value={properties} label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

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
            </div>
        </>
    )
}

export default ServiceDetailModalUI