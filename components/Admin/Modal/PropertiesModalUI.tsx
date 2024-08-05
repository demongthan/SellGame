"use client"

import { ButtonAddItemUI, InputUI } from '@/components';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { MinusCircleIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { use, useState } from 'react'
import PropertyValueModalUI from './PropertyValueModalUI';

interface Props{
    closeModal:()=>void,
    propertiesJson:string,
    setPropertiesJson:any
}

const PropertiesModalUI = ({closeModal, propertiesJson, setPropertiesJson}:Props) => {
    const [properties, setProperties]=useState<PropertiesJson[]>(JSON.parse(propertiesJson));
    const [isOpenPropertyValueModal, setIsOpenPropertyValueModal]=useState<boolean>(false);
    const [indexProperty, setIndexProperty]=useState<number>(-1);
    const [propertyValueJson, setPropertyValueJson]=useState<string>('[]');

    const addProperty=()=>{
        let property:PropertiesJson={
            Key:"",
            Name:"",
            Value:[]
        }

        setProperties([...properties, property])
    }

    const removeProperty=(index:number)=>{
        setProperties([...properties.slice(0, index), ...properties.slice(index + 1)]);
    }

    const openModal=()=>
        setIsOpenPropertyValueModal(!isOpenPropertyValueModal);

    const onChangePropertyKey=(index:number)=> (e: any)=>{

        properties[index].Key=e.target.value;

        setProperties([...properties]);
    }

    const onChangePropertyName=(index:number)=> (e: any)=>{
        properties[index].Name=e.target.value;

        setProperties([...properties]);
    }

    const setPropertyValue=(index:number, propertyValues:ValueKey[])=>{
        properties[index].Value=propertyValues;

        setProperties([...properties]);
    }

    const eventButtonAddItem=()=>{
        setPropertiesJson(JSON.stringify(properties))

        closeModal();
    }

  return (
    <>
        {isOpenPropertyValueModal && <PropertyValueModalUI closeModel={openModal} addProperty={setPropertyValue} 
        indexProperty={indexProperty} propertyValueJson={propertyValueJson}></PropertyValueModalUI>}

        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-xl max-h-full">
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
                    
                    <form className="p-4 md:p-5">
                        <div className="flex flex-col gap-4 mb-4">
                            <div className="flex flex-row gap-1 text-base text-black font-semibold leading-6 border-b border-gray-200 pb-2 w-[98%]">
                                <p className='w-[30%]'>Key</p>
                                <p className='w-[30%]'>Tên</p>
                                <p className='w-[30%]'>Giá trị</p>

                                <div className='mt-1 flex justify-end w-[10%]'>
                                    <ButtonAddItemUI eventButtonClicked={addProperty}></ButtonAddItemUI>
                                </div>
                            </div>

                            <div className='h-48 overflow-y-auto w-full'>
                                {properties && properties.map((property:PropertiesJson, index)=>(
                                    <div className="flex flex-row gap-1 w-[98%]" key={index}>
                                        <InputUI value={property.Key} name={`Key${index}`} classDiv={"w-[30%]"} classInput={"w-full"}
                                        onChangeEvent={onChangePropertyKey(index)}></InputUI>

                                        <InputUI value={property.Name} name={`Name${index}`} classDiv={"w-[30%]"} classInput={"w-full"}
                                        onChangeEvent={onChangePropertyName(index)}></InputUI>

                                        <InputUI value={JSON.stringify(property.Value)} name={`Value${index}`} classDiv={"w-[30%]"} classInput={"w-full"} isDisabled={true}></InputUI>

                                        <div className='flex flex-row w-[10%] gap-1 -mt-2'>
                                            <Button disabled={isNullOrEmpty(property.Key)} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();

                                                setIndexProperty(index);

                                                setPropertyValueJson(JSON.stringify(property.Value));
                                                
                                                openModal();
                                            }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>

                                            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                
                                                removeProperty(index);
                                            }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem]'></MinusCircleIcon></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-6'>
                            <ButtonAddItemUI isDisabled={properties.length==0} titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonAddItem}></ButtonAddItemUI>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default PropertiesModalUI