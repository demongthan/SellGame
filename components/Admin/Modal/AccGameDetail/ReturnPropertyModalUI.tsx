"use client"

import ButtonAddItemUI from '@/components/Common/UI/Button/ButtonAddItemUI';
import InputUI from '@/components/Common/UI/InputUI';
import { PropertiesItemJson } from '@/utils/types/PropertiesJson';

import { Button } from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'

interface Props {
    closeModel: () => void;
    returnPropertiesJson:string;
    setReturnPropertiesJson:(propertyValues:string)=>void
}

const ReturnPropertyModalUI = ({closeModel, returnPropertiesJson, setReturnPropertiesJson}:Props) => {
    const [returnProperties, setReturnProperties]=useState<PropertiesItemJson[]>(JSON.parse(returnPropertiesJson));
    const [isChangeData, setIsChangeData]=useState<boolean>(false);

    const removePropertyValue=(index:number)=>{
        setReturnProperties([...returnProperties.slice(0, index), ...returnProperties.slice(index + 1)]);
    }

    const addPropertyValue=()=>{
        const returnProperty:PropertiesItemJson={
            Name:"",
            Value:""
        }

        setReturnProperties([...returnProperties, returnProperty]);
        setIsChangeData(true);
    }

    const eventButtonSubmit=()=>{
        setReturnPropertiesJson(JSON.stringify(returnProperties));
        closeModel();
    }

    const handleChange=(name:string, index:number)=> (e: any)=>{
        switch (name) {
            case "name":
                returnProperties[index].Name=e.target.value;
                setReturnProperties([...returnProperties]);
                setIsChangeData(true);
                break;
            case "value":
                returnProperties[index].Value=e.target.value;
                setReturnProperties([...returnProperties]);
                setIsChangeData(true);
                break;
            default:
                break;
        }
    }
    
    return (
        <>
            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Thuộc tính
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
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className="flex flex-row border-b border-gray-200 pb-2 w-[98%]">
                                    <div className="text-base text-black font-semibold leading-6 w-[46.5%]">
                                        Tên
                                    </div>

                                    <div className="text-base text-black font-semibold leading-6 w-[46.5%]">
                                        Giá trị
                                    </div>
                                    
                                    <div className='mt-1 flex justify-end w-[7%]'>
                                        <ButtonAddItemUI eventButtonClicked={addPropertyValue}></ButtonAddItemUI>
                                    </div>
                                </div>

                                <div className='h-36 overflow-y-auto w-full'>
                                    {returnProperties && returnProperties.map((propertyValue:PropertiesItemJson, index)=>(
                                        <div className="flex flex-row gap-1 w-[98%]" key={index}>
                                            <InputUI value={propertyValue.Name} name={`Name${index}`} classDiv={"w-[46.5%]"} classInput={"w-full"}
                                            onChangeEvent={handleChange("name", index)}></InputUI>

                                            <InputUI value={propertyValue.Value} name={`Name${index}`} classDiv={"w-[46.5%]"} classInput={"w-full"}
                                            onChangeEvent={handleChange("value", index)}></InputUI>

                                            <Button className={"-mt-2 w-[7%]"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                removePropertyValue(index);
                                            }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem]'></MinusCircleIcon></Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='mt-6'>
                                <ButtonAddItemUI isDisabled={!isChangeData || returnProperties.length==0} titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonSubmit}></ButtonAddItemUI>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReturnPropertyModalUI