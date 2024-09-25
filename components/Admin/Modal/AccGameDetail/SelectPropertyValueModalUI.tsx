"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { ButtonAddItemUI, ButtonUpdateItemUI, CheckboxUI, InputUI, LoadingUI, SelectUI } from '@/components';
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { PropertiesItemJson, PropertiesJson, ValueItemKey, ValueKey } from '@/utils/types/PropertiesJson';
import { ItemSelect } from '@/utils/types/SelectItem';
import { isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'
import SelectPropertyValueNotOnlyModalUI from './SelectPropertyValueNotOnlyModalUI';
import { ModeAction } from '@/utils/types/ModeAction';

interface Props{
    closeModel:()=>void,
    idCategory:string,
    addPropertyValue:(name:ItemSelect, value:ValueItemKey[], isShow:boolean, description:string | undefined)=>void,
    editPropertyValue:(value:ValueItemKey[], isShow:boolean, description:string | undefined, index:number)=>void,
    propertyValues:PropertiesItemJson[],
    adminDisplay:AdminDisplay | null,
    isCreate:boolean,
    indexPropertyValue:number,
}

const SelectPropertyValueModalUI = ({closeModel, idCategory, addPropertyValue, propertyValues, adminDisplay, isCreate, indexPropertyValue, editPropertyValue}:Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false);

    const [name, setName] = useState<ItemSelect>({Name:"", Value:"74055f4b-afea-46a6-b467-7680014808c5"});
    const [value, setValue] = useState<ItemSelect>({Name:"", Value:"74055f4b-afea-46a6-b467-7680014808c5"});
    const [isShow, setIsShow]=useState<boolean>(true);
    const [description, setDescription] = useState<string | undefined>("");

    const [nameSelectData, setNameSelectData] = useState<ItemSelect[]>([]);
    const [valueSelectData, setValueSelectData] = useState<ItemSelect[]>([]);
    const [properties, setProperties] = useState<PropertiesJson[]>([]);
    const [isOnly, setIsOnly]=useState<boolean>(true);
    const [isSearch, setIsSearch] = useState<boolean>(true);

    const [values, setValues] =useState<ValueItemKey[]>([]);

    const eventButtonAddClick=()=> {
        addPropertyValue(name, values, isShow, description);
        closeModel();
    }

    const eventButtonEditClick=()=> {
        editPropertyValue(values, isShow, description, indexPropertyValue);
        closeModel();
    }

    const addValues=(values:ValueItemKey[])=>{
        setValues(values);
    }

    const getSelectDataInit=async ():Promise<void> => {
        try{
            await categoryApiRequest.getCategoryById({id:idCategory, fields:"?fields=Properties", token:adminDisplay?.token}).then((res)=>{
                const propertiesJsons:PropertiesJson[]=JSON.parse(res.payload.data.Properties);

                if(propertiesJsons){
                    let names:ItemSelect[]=[];

                    if(isCreate){
                        propertiesJsons.map((propertiesJson:PropertiesJson)=>{
                            if(propertyValues.findIndex(_=>_.IdName==propertiesJson.Id)==-1){
                                names.push({Name:propertiesJson.Name, Value:propertiesJson.Id});
                            }
                        });

                        setNameSelectData(names);
                        setName(names?names[0]:{Name:"", Value:""});

                        if(names){
                            const index=propertiesJsons.findIndex(_=>_.Id==names[0].Value);
                            setIsOnly(propertiesJsons[index].IsOnly);
                            setIsSearch(propertiesJsons[index].IsSearch);

                            const selectData:ItemSelect[]=propertiesJsons[index].Value?propertiesJsons[index].Value.map((item:ValueKey)=>({Name:item.Name, Value:item.Id})):[];
                            setValueSelectData(selectData);

                            if(propertiesJsons[index].IsOnly){
                                setValue(selectData?selectData[0]:{Name:"", Value:"74055f4b-afea-46a6-b467-7680014808c5"});
                                setValues([{Id:"74055f4b-afea-46a6-b467-7680014808c5", IdValue:selectData[0].Value, Status:1, Value:selectData[0].Name}])
                            }
                            else{
                                setValues([]);
                            }
                        }
                    }
                    else{
                        propertiesJsons.map((propertiesJson:PropertiesJson)=>{
                            const index=propertyValues.findIndex(_=>_.IdName==propertiesJson.Id);
                            if(index==-1 || index==indexPropertyValue){
                                names.push({Name:propertiesJson.Name, Value:propertiesJson.Id});
                            }

                            console.log(index, propertiesJson, propertyValues, indexPropertyValue)
                            if(index==indexPropertyValue){
                                setIsOnly(propertiesJson.IsOnly);
                                setIsSearch(propertiesJson.IsSearch);
                                const selectData:ItemSelect[]=propertiesJson.Value?propertiesJson.Value.map((item:ValueKey)=>({Name:item.Name, Value:item.Id})):[];
                                setValueSelectData(selectData);

                                if(propertiesJson.IsOnly){
                                    setValue(selectData?selectData[selectData.findIndex(_=>propertyValues[indexPropertyValue].Value[0].IdValue==_.Value)]:{Name:"", Value:"74055f4b-afea-46a6-b467-7680014808c5"});
                                    setValues(propertyValues[index].Value);
                                }
                                else{
                                    setValues([]);
                                }
                            }

                            setNameSelectData(names);
                            setName(names?names[names.findIndex(_=>_.Value==propertyValues[indexPropertyValue].IdName)]:{Name:"", Value:""});
                        });
                    }
                }

                setProperties(propertiesJsons);

                if(!isCreate){
                    setIsShow(propertyValues[indexPropertyValue].IsShow);
                    setDescription(propertyValues[indexPropertyValue].Description);
                    setValues(propertyValues[indexPropertyValue].Value);
                }

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
                setIsOnly(properties[index].IsOnly);
                setIsSearch(properties[index].IsSearch);
                
                const selectData:ItemSelect[]=properties[index].Value?properties[index].Value.map((item:ValueKey)=>({Name:item.Name, Value:item.Id})):[];
                setValueSelectData(selectData);

                if(properties[index].IsSearch){
                    if(properties[index].IsOnly){
                        setValue(selectData?selectData[0]:{Name:"", Value:"74055f4b-afea-46a6-b467-7680014808c5"});
                        values[0].IdValue=selectData[0].Value;
                        values[0].Value=selectData[0].Name;
                        setValues([...values]);
                    }
                    else{
                        setValues([]);
                    }
                }
                break;
            case "value":
                setValue(e);
                values[0].IdValue=e?e.Value:"";
                values[0].Value=e?e.Name:"";
                if(values[0].Status==ModeAction.NOCHANGE)
                    values[0].Status=ModeAction.UPDATE;
                setValues([...values]);
                break;
            case "isShow":
                setIsShow(!isShow);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            default:
                break;
        }
    }

    const openModal=()=>
        setIsOpenModel(!isOpenModel);

    useEffect(() =>{
        getSelectDataInit();
    }, [setNameSelectData, setValueSelectData, setIsLoading, setName, setValue]);

    return (
        <>
            {isOpenModel && (<SelectPropertyValueNotOnlyModalUI closeModel={openModal} 
            valueSelectData={valueSelectData} values={values} addValue={addValues}></SelectPropertyValueNotOnlyModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[150] justify-center bg-model
                items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {isLoading?(<LoadingUI></LoadingUI>):(
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {isCreate?"Tạo thuộc tính":"Cập nhật thuộc tính"}
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
                                            <SelectUI isDisabled={!isCreate} selected={name} label={"Tên :"} name={"Name"} data={nameSelectData} onChangeEvent={handleChange("name")}></SelectUI>
                                        </div>

                                        {isSearch && isOnly && (
                                            <div className="col-span-2">
                                                <SelectUI selected={value} label={"Giá trị :"} name={"Value"} data={valueSelectData} onChangeEvent={handleChange("value")}></SelectUI>
                                            </div>
                                        )}
                                        
                                        {isSearch &&  !isOnly && (
                                            <div className="col-span-2">
                                                <div className='flex flex-row gap-1'>
                                                    <InputUI value={value?values.map(_=>_.Value).join("|"):""} name='Properties' label={"Thuộc tính :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                                    <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                        event.preventDefault();
                                                        openModal();
                                                    }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
                                                </div>
                                            </div>
                                        )}

                                        {isSearch && (
                                            <div className="col-span-2 sm:col-span-1 pt-2">
                                                <CheckboxUI name='IsShow' isBlockLabel={false} label={"Hiển thị :"} classDiv={"w-full"} classLabel={"w-1/2"} 
                                                isChecked={isShow} onChangeEvent={handleChange("isShow")}></CheckboxUI>
                                            </div>
                                        )}

                                        <div className="col-span-2">
                                            <InputUI isDisabled={!(!(isSearch && isShow) || !isSearch)} value={description} name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                            onChangeEvent={handleChange("description")}></InputUI>
                                        </div>
                                    </div>
                                </div>

                                {isCreate?(
                                    <ButtonAddItemUI isDisabled={!name || isNullOrEmpty(name.Value)} titleButton={"Thêm"} eventButtonClicked={eventButtonAddClick}></ButtonAddItemUI>
                                ):(
                                    <ButtonUpdateItemUI titleButton='Cập nhật' eventButtonClicked={eventButtonEditClick}></ButtonUpdateItemUI>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default SelectPropertyValueModalUI