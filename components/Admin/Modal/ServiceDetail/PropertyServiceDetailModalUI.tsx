"use client"

import { ButtonAddItemUI, InputUI, SelectCoefficientModalUI } from '@/components';
import { MethodCalculate } from '@/utils/types/MethodCalculate';
import { ServiceDetailProperties } from '@/utils/types/PropertiesJson';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'

interface Props{
    closeModal:()=>void,
    method:MethodCalculate,
    propertiesJson:string
}

const PropertyServiceDetailModalUI = ({closeModal, method, propertiesJson}:Props) => {
    const isInput=method!=MethodCalculate.Select;
    const isInputCoefficient=method==MethodCalculate.InputCoefficient;
    const isSelectCoefficient=method==MethodCalculate.InputSelectCoefficient;
    const isSelect=method==MethodCalculate.Select;

    const [propertyValues, setPropertyValues]=useState<ServiceDetailProperties[]>(()=>{
        if(propertiesJson!="[]")
            return JSON.parse(propertiesJson);

        let properties:ServiceDetailProperties[]=[];
        if(isInput){
            properties.push({
                Key:"Input",
                Name:"",
                MaxValue:100000,
                MinValue:10000
            })
        }

        if(isInputCoefficient){
            properties.push({
                Key:"InputCoefficient",
                Name:"",
                Coefficient:1.00,
            })
        }

        if(isSelectCoefficient){
            properties.push({
                Key:"SelectCoefficient",
                Name:"",
                TitleCoefficient:[],
                SelectCoefficient:[]
            })
        }

        if(isSelect){
            properties.push({
                Key:"Select",
                Name:"",
                SelectPrice:[]
            })
        }

        return properties;
    })

    const FindServiceDetailProperties=(key:string):ServiceDetailProperties=>{
        const index=propertyValues.findIndex(_=>_.Key==key);
        return propertyValues[index];
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "minPrice":
                if (/^\d*\.?\d*$/.test(e.target.value) && Number(e.target.value)<Number(FindServiceDetailProperties("Input").MaxValue)) {
                    if(isNullOrEmpty(e.target.value))
                        FindServiceDetailProperties("Input").MinValue=0;
                    else
                        FindServiceDetailProperties("Input").MinValue=Number(e.target.value);

                    setPropertyValues([...propertyValues])
                }
                break;
            case "maxPrice":
                if (/^\d*\.?\d*$/.test(e.target.value) && Number(e.target.value)>Number(FindServiceDetailProperties("Input").MinValue)) {
                    if(isNullOrEmpty(e.target.value))
                        FindServiceDetailProperties("Input").MaxValue=0;
                    else
                        FindServiceDetailProperties("Input").MaxValue=Number(e.target.value);
                    
                    setPropertyValues([...propertyValues])
                }
                break;
            case "coefficient":
                const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/;
                console.log(e.target.value.match(regex)[0]);
                if (/^[0-9]*([.,][0-9]{0,2})?$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        FindServiceDetailProperties("InputCoefficient").Coefficient=1.00;
                    else
                        FindServiceDetailProperties("InputCoefficient").Coefficient=e.target.value;
                    
                    setPropertyValues([...propertyValues])
                }
                break;
        }
    }

    return (
        <>
            <SelectCoefficientModalUI closeModal={function (): void {
                throw new Error('Function not implemented.');
            } } titleCoefficients={FindServiceDetailProperties("SelectCoefficient").TitleCoefficient} 
            selectCoefficients={FindServiceDetailProperties("SelectCoefficient").SelectCoefficient}></SelectCoefficientModalUI>

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Thuộc tính
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
                        
                        <div className="p-4 md:p-5">
                            <div className='flex flex-col gap-2'>
                                {isInput && (
                                    <>
                                        <label className={`block text-base text-black font-semibold leading-6 pb-2`}>Nhập giá:</label>
                                        <div className='flex flex-row gap-3 px-3'>
                                            <InputUI value={FindServiceDetailProperties("Input").MinValue} max={12} isBlockLabel={false} name='MinPrice' label={"Nhỏ nhất:"} classLabel={"w-[35%]"} classDiv={"w-full"} classInput={"w-[70%]"}
                                            onChangeEvent={handleChange("minPrice")} classDivUnit={"w-[65%]"} unit={"VND"} classUint='w-[20%]'></InputUI>

                                            <InputUI value={FindServiceDetailProperties("Input").MaxValue} isBlockLabel={false} name='MaxPrice' max={12} label={"Lớn nhất:"} classLabel={"w-[35%]"} classDiv={"w-full"} classInput={"w-[70%]"}
                                            onChangeEvent={handleChange("maxPrice")} classDivUnit={"w-[65%]"} unit={"VND"} classUint='w-[20%]'></InputUI>
                                        </div>
                                    </>
                                )}

                                {isInputCoefficient && (
                                    <>
                                        <InputUI value={FindServiceDetailProperties("InputCoefficient").Coefficient} max={6} name='Coefficient' label={"Hệ số:"} classDiv={"w-full"} classInput={"w-1/2"}
                                        onChangeEvent={handleChange("coefficient")}></InputUI>
                                    </>
                                )}

                                {isSelectCoefficient && (
                                    <>
                                        <label className={`block text-base text-black font-semibold leading-6 pb-2`}>Hệ số:</label>
                                        <div className='flex flex-row gap-1 px-3'>
                                            <InputUI value={""} name='NameCoefficient' label={"Tiêu đề:"} classDiv={"w-[32%]"} classInput={"w-full"}
                                            onChangeEvent={handleChange("description")}></InputUI>

                                            <InputUI value={""} name='TitleCoefficient' label={"Giá trị:"} isReadOnly={true} classDiv={"w-[32%]"} classInput={"w-full"}></InputUI>

                                            <InputUI value={""} name='Coefficient' label={"Giá trị hệ số:"} isReadOnly={true} classDiv={"w-[32%]"} classInput={"w-full"}></InputUI>

                                            <Button disabled={isNullOrEmpty(FindServiceDetailProperties("SelectCoefficient").Name)} className={"pt-6 w-[4%]"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                    event.preventDefault();
                                            }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
                                        </div>
                                    </>
                                )}

                                {isSelect && (
                                    <div className='flex flex-row gap-1'>
                                        <InputUI value={""} name='NamePrice' label={"Tên:"} classDiv={"w-[30%]"} classInput={"w-full"}
                                        onChangeEvent={handleChange("description")}></InputUI>

                                        <InputUI value={""} name='TitleSelect' label={"Giá trị:"} classDiv={"w-[30%]"} classInput={"w-full"}></InputUI>

                                        <InputUI value={""} name='PriceSelect' label={"Giá:"} classDiv={"w-[30%]"} classInput={"w-full"}></InputUI>

                                        <Button className={"pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                        }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
                                    </div>
                                )}
                            </div>

                            <div className='mt-6'>
                                <ButtonAddItemUI titleButton={'Thêm danh sách'} eventButtonClicked={()=>{}}></ButtonAddItemUI>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyServiceDetailModalUI