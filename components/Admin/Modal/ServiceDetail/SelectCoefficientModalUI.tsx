"use client"

import { ButtonAddItemUI, InputUI } from '@/components';
import { ValueKey } from '@/utils/types/PropertiesJson';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react'

interface Props{
    closeModal:()=>void,
    titleCoefficients:any,
    selectCoefficients:any,
    addPropertySelectCoefficient:(titles:ValueKey[], selects:ValueKey[])=>void
}

const SelectCoefficientModalUI = ({closeModal, titleCoefficients, selectCoefficients, addPropertySelectCoefficient}:Props) => {
    const [titles, setTitles]=useState<ValueKey[]>(titleCoefficients);
    const [selects, setSelects]=useState<ValueKey[]>(selectCoefficients);

    const handleChange = (name:string, index:number) => (e: any) => {
        switch (name) {
            case "title":
                titles[index].Name=e.target.value;
                setTitles([...titles]);
                break;
            case "select":
                if (/^[0-9]*([.,][0-9]{0,2})?$/.test(e.target.value)) {
                    if(isNullOrEmpty(e.target.value))
                        selects[index].Name="1.00";
                    else
                        selects[index].Name=e.target.value;
                    
                    setSelects([...selects]);
                }
                break;
            default:
                break;
        }
    }

    const addSelectCoefficient=()=>{
        titles.push({Name:""});
        setTitles([...titles])
        selects.push({Name:""});
        setSelects([...selects]);
    }

    const removeSelectCoefficient=(index:number)=>{
        setTitles([...titles.slice(0, index), ...titles.slice(index+1)]);
        setSelects([...selects.slice(0, index), ...selects.slice(index+1)]);
    }

    const eventButtonClicked=()=>{
        addPropertySelectCoefficient(titles, selects);
        closeModal();
    }

    return (
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Hệ số
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
                        <div className="flex flex-col gap-4 mb-4 w-full">
                            <div className="flex flex-row border-b border-gray-200 pb-2 w-[98%]">
                                <div className="text-base text-black font-semibold leading-6 w-[46.5%]">
                                    Tiêu đề
                                </div>

                                <div className="text-base text-black font-semibold leading-6 w-[46.5%]">
                                    Hệ số
                                </div>
                                
                                <div className='mt-1 flex justify-end w-[7%]'>
                                    <ButtonAddItemUI eventButtonClicked={addSelectCoefficient}></ButtonAddItemUI>
                                </div>
                            </div>

                            <div className='h-36 overflow-y-auto w-full'>
                                {titles && titles.map((title:ValueKey, index)=>(
                                    <div className="flex flex-row gap-2 w-[98%]" key={index}>
                                        <InputUI value={title.Name} name={`Title${index}`} classDiv={"w-[47.5%]"} classInput={"w-full"}
                                        onChangeEvent={handleChange("title", index)}></InputUI>

                                        <InputUI value={selects?selects[index].Name:""} name={`Coefficients${index}`} classDiv={"w-[47.5%]"} classInput={"w-full"}
                                        onChangeEvent={handleChange("select", index)}></InputUI>

                                        <Button className={"-mt-2 w-[5%]"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            
                                            removeSelectCoefficient(index);
                                        }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem]'></MinusCircleIcon></Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-6'>
                            <ButtonAddItemUI titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonClicked}></ButtonAddItemUI>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCoefficientModalUI