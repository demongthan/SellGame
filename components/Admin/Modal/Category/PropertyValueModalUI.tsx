"use client"

import { ButtonAddItemUI, InputUI } from '@/components';
import { ModeAction } from '@/utils/types/ModeAction';
import { ValueKey } from '@/utils/types/PropertiesJson';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

import React, { useState } from 'react'

interface Props{
    closeModel:()=>void,
    addProperty:(index:number, propertyValues:ValueKey[])=>void,
    indexProperty:number,
    propertyValueJson:string
}

const PropertyValueModalUI = ({closeModel, indexProperty, addProperty, propertyValueJson}:Props) => {
    const [propertyValues, setPropertyValues]=useState<ValueKey[]>(JSON.parse(propertyValueJson));
    const [search, setSearch] = useState<string>("");

    const addPropertyValue=()=>{
        const propertyValue:ValueKey={
            Id:"af1bc80d-f1b1-4634-9955-883630428d5b",
            Name:"",
            Status:ModeAction.CREATE
        }

        setPropertyValues([...propertyValues, propertyValue]);
    }

    const removePropertyValue=(index:number)=>{
        if(propertyValues[index].Status!=ModeAction.CREATE){
            propertyValues[index].Status=ModeAction.DELETE;
            setPropertyValues([...propertyValues]);
        }
        else{
            setPropertyValues([...propertyValues.slice(0, index), ...propertyValues.slice(index + 1)]);
        }
    }

    const onChangePropertyValue=(index:number)=> (e: any)=>{
        propertyValues[index].Name=e.target.value;

        if(propertyValues[index].Status==ModeAction.NOCHANGE)
            propertyValues[index].Status=ModeAction.UPDATE;

        setPropertyValues([...propertyValues]);
    }

    const handleChangeSearch=(e:any)=>
        setSearch(e.target.value);

    const eventButtonAddItem=()=>{
        addProperty(indexProperty, propertyValues.filter(_=>!isNullOrEmpty(_.Name)));
        closeModel();
    }

  return (
    <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] justify-center bg-model
    items-center w-full md:inset-0 h-full max-h-full">
        <div className="relative p-4 w-full max-w-[30rem] max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Giá trị
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
                        <div className="flex flex-row gap-4 border-b border-gray-200 pb-2 w-[98%]">
                            <div className='flex flex-col gap-2 w-[94%]'>
                                <div className="text-base text-black font-semibold leading-6">
                                    Giá trị
                                </div>
                                <InputUI classDiv={"w-full"} classInput={"w-full"} value={search} onChangeEvent={handleChangeSearch}></InputUI>
                            </div>
                            
                            <div className='mt-1 flex justify-end w-[6%]'>
                                <ButtonAddItemUI eventButtonClicked={addPropertyValue}></ButtonAddItemUI>
                            </div>
                        </div>

                        <div className='h-96 overflow-y-auto w-full'>
                            {propertyValues && propertyValues.map((propertyValue:ValueKey, index)=>{
                                let data;

                                if(propertyValue.Status!=3 && (isNullOrEmpty(search) || propertyValue.Name.includes(search))){
                                    data=(
                                        <div className="flex flex-row gap-4 w-[98%]" key={index}>
                                            <InputUI value={propertyValue.Name} name={`Name${index}`} classDiv={"w-[94%]"} classInput={"w-full"}
                                            onChangeEvent={onChangePropertyValue(index)}></InputUI>

                                            <Button className={"-mt-1 w-[6%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                removePropertyValue(index);
                                            }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem]'></MinusCircleIcon></Button>
                                        </div>
                                    )
                                }

                                return (
                                    data
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-6'>
                        <ButtonAddItemUI isDisabled={propertyValues.length==0} titleButton={'Thêm giá trị'} eventButtonClicked={ eventButtonAddItem}></ButtonAddItemUI>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PropertyValueModalUI