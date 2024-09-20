"use client"

import { ButtonAddItemUI, CheckboxUI, InputUI } from '@/components'
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { PropertiesItemJson, ValueItemKey } from '@/utils/types/PropertiesJson';
import { ItemSelect } from '@/utils/types/SelectItem';

import { Button } from '@headlessui/react';
import { MinusCircleIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'
import SelectPropertyValueModalUI from './SelectPropertyValueModalUI';
import { ModeAction } from '@/utils/types/ModeAction';

interface Props {
    closeModel: () => void;
    propertyValueJson:string;
    idCategory:string;
    setPropertyValueJson:(propertyValues:string)=>void,
    adminDisplay:AdminDisplay | null
}

const SelectPropertyModalUI = ({closeModel, propertyValueJson, idCategory, setPropertyValueJson, adminDisplay}:Props) => {
    const [propertyValues, setPropertyValues]=useState<PropertiesItemJson[]>(JSON.parse(propertyValueJson));
    const [isOpenPropertyValueModal, setIsOpenPropertyValueModal]=useState<boolean>(false);
    const [isChangeData, setIsChangeData]=useState<boolean>(false);

    const [isCreate, setIsCreate]=useState<boolean>(true);
    const [indexPropertyValue, setIndexPropertyValue]=useState<number>(0);

    const removePropertyValue=(index:number)=>{
        if(propertyValues[index].Status==ModeAction.CREATE){
            setPropertyValues([...propertyValues.slice(0, index), ...propertyValues.slice(index + 1)]);
        }
        else{
            propertyValues[index].Status=ModeAction.DELETE;
            setPropertyValues([...propertyValues]);
        }

        setIsChangeData(true);
    }

    const addPropertyValue=(name:ItemSelect,value:ValueItemKey[], isShow:boolean, description:string | undefined)=>{
        const propertyValue:PropertiesItemJson={
            Name: name.Name,
            Value: value,
            IdName: name.Value,
            Status: ModeAction.CREATE,
            IsShow: isShow,
            Description: description,
            Id: "74055f4b-afea-46a6-b467-7680014808c5"
        }

        setPropertyValues([...propertyValues, propertyValue]);
        setIsChangeData(true);
    }

    const editPropertyValue=(value:ValueItemKey[], isShow:boolean, description:string | undefined, index:number)=>{
        propertyValues[index].Description = description;
        propertyValues[index].IsShow = isShow;
        propertyValues[index].Value = value;
        if(propertyValues[index].Status==ModeAction.NOCHANGE)
            propertyValues[index].Status = ModeAction.UPDATE;

        setPropertyValues([...propertyValues]);
        setIsChangeData(true);
    }

    const openModal=()=>
        setIsOpenPropertyValueModal(!isOpenPropertyValueModal);

    const openCreatePropertyValueModal=()=>{
        setIsCreate(true);
        setIndexPropertyValue(0);
        setIsOpenPropertyValueModal(!isOpenPropertyValueModal);
    }

    const openUpdatePropertyValueModal=(index:number)=>{
        setIsCreate(false);
        setIndexPropertyValue(index);
        setIsOpenPropertyValueModal(!isOpenPropertyValueModal);
    }

    const eventButtonSubmit=()=>{
        setPropertyValueJson(JSON.stringify(propertyValues));
        closeModel();
    }
    
    return (
        <>
            {isOpenPropertyValueModal && (<SelectPropertyValueModalUI closeModel={openModal} idCategory={idCategory}
            addPropertyValue={addPropertyValue} propertyValues={propertyValues} adminDisplay={adminDisplay}
            isCreate={isCreate} indexPropertyValue={indexPropertyValue} editPropertyValue={editPropertyValue}></SelectPropertyValueModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-[50rem] max-h-full">
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
                                <div className="flex flex-row gap-4 border-b border-gray-200 pb-2 w-[98%] text-base text-black font-semibold leading-6">
                                    <div className="w-[30%]">
                                        Tên
                                    </div>

                                    <div className="w-[20%]">
                                        Giá trị
                                    </div>

                                    <div className="w-[10%]">
                                        Hiển thị
                                    </div>

                                    <div className="w-[30%]">
                                        Mô tả
                                    </div>
                                    
                                    <div className='mt-1 flex justify-end w-[10%]'>
                                        <ButtonAddItemUI eventButtonClicked={openCreatePropertyValueModal}></ButtonAddItemUI>
                                    </div>
                                </div>

                                <div className='h-56 overflow-y-auto w-full'>
                                    {propertyValues && propertyValues.map((propertyValue:PropertiesItemJson, index)=>(
                                        <div className="flex flex-row gap-4 w-[98%]" key={index}>
                                            <InputUI isDisabled={true} value={propertyValue.Name} name={`Name${index}`} classDiv={"w-[30%]"} classInput={"w-full"}></InputUI>

                                            <InputUI isDisabled={true} value={propertyValue.Value?propertyValue.Value.map(_=>_.Value).join("|"):""} name={`Name${index}`} classDiv={"w-[20%]"} classInput={"w-full"}></InputUI>

                                            <div className='flex justify-center items-center w-[10%]'>
                                                <CheckboxUI disabled={true} isChecked={propertyValue.IsShow} className='defaultCheckboxInline'></CheckboxUI>
                                            </div>

                                            <InputUI isDisabled={true} value={propertyValue.Description} name={`Name${index}`} classDiv={"w-[30%]"} classInput={"w-full"}></InputUI>

                                            <div className='flex flex-row w-[10%] gap-1 -mt-2'>
                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                    event.preventDefault();
                                                    openUpdatePropertyValueModal(index);
                                                }}><PencilSquareIcon className='h-[1.5rem] w-[1.5rem]'></PencilSquareIcon></Button>

                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                    event.preventDefault();
                                                    removePropertyValue(index);
                                                }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem]'></MinusCircleIcon></Button>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='mt-6'>
                                <ButtonAddItemUI isDisabled={!isChangeData} titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonSubmit}></ButtonAddItemUI>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectPropertyModalUI