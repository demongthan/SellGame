"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { ButtonAddItemUI, LoadingUI, SelectUI } from '@/components';
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { PropertiesItemJson, PropertiesJson, ValueKey } from '@/utils/types/PropertiesJson';
import { ItemSelect } from '@/utils/types/SelectItem';
import { isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'

interface Props{
    closeModel:()=>void,
    idCategory:string,
    addPropertyValue:(name:string, value:string)=>void,
    propertyValues:PropertiesItemJson[],
    adminDisplay:AdminDisplay | null
}

const SelectPropertyValueModalUI = ({closeModel, idCategory, addPropertyValue, propertyValues, adminDisplay}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [name, setName] = useState<any>({Name:"", Value:""});
    const [value, setValue] = useState<any>({Name:""});

    const [nameSelectData, setNameSelectData] = useState<ItemSelect[]>([]);
    const [valueSelectData, setValueSelectData] = useState<ValueKey[]>([]);
    const [properties, setProperties] = useState<PropertiesJson[]>([]);

    const eventButtonClick=()=> {
        addPropertyValue(name.Name, value.Name);
        closeModel();
    }

    const getSelectDataInit=async ():Promise<void> => {
        try{
            await categoryApiRequest.getCategoryById({id:idCategory, fields:"?fields=Properties", token:adminDisplay?.token}).then((res)=>{
                const propertiesJsons:PropertiesJson[]=JSON.parse(res.payload.data.Properties);

                if(propertiesJsons){
                    let names:ItemSelect[]=[];
                    propertiesJsons.map((propertiesJson:PropertiesJson, index)=>{
                        if(propertiesJson.IsOnly){
                            if(propertyValues.findIndex(_=>_.Name==propertiesJson.Name)==-1){
                                names.push({Name:propertiesJson.Name, Value:propertiesJson.Id});
                            }
                        }
                        else{
                            names.push({Name:propertiesJson.Name, Value:propertiesJson.Id});
                        }
                    });

                    setNameSelectData(names);
                    setName(names?names[0]:{Name:"", Value:""});
                    
                    if(names){
                        const index:number=propertiesJsons.findIndex(_=>_.Id==names[0].Value);

                        const selectData:ValueKey[]=propertiesJsons[index].Value.filter(_=>propertyValues.findIndex(item=>item.Value==_.Name && item.Name==names[0].Value)==-1);
                        setValueSelectData(selectData);
                        setValue(selectData?selectData[0]:{Name:"", Value:""});
                    }
                }

                setProperties(propertiesJsons);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "name":
                setName(e);

                const index:number=properties.findIndex(_=>_.Id==e.Value);
                const selectData:ValueKey[]=properties[index].Value.filter(_=>propertyValues.findIndex(item=>item.Value==_.Name && item.Name==e.Value)==-1);

                setValueSelectData(selectData);
                setValue(selectData?selectData[0]:{Name:"", Value:""})
                break;
            case "value":
                setValue(e);
                break;
            default:
                break;
        }
    }

    useEffect(() =>{
        getSelectDataInit();
    }, [setNameSelectData, setValueSelectData, setIsLoading, setName, setValue]);

    return (
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[150] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-xs max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tạo thuộc tính
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
                            <div className="p-2 md:p-3">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <SelectUI selected={name} label={"Tên :"} name={"Name"} data={nameSelectData} onChangeEvent={handleChange("name")}></SelectUI>
                                    </div>

                                    <div className="col-span-2">
                                        <SelectUI selected={value} label={"Giá trị :"} name={"Value"} data={valueSelectData} onChangeEvent={handleChange("value")}></SelectUI>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <ButtonAddItemUI isDisabled={!name || isNullOrEmpty(name.Value)} titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonClick}></ButtonAddItemUI>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectPropertyValueModalUI