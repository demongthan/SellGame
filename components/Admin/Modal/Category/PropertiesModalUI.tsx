"use client"

import { ButtonAddItemUI, CheckboxUI, DeleteWarningModalUI, InputUI, LoadingUI } from '@/components';
import { Button } from '@headlessui/react';
import { PropertiesJson, ValueKey } from '@/utils/types/PropertiesJson';
import PropertyValueModalUI from './PropertyValueModalUI'

import { MinusCircleIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, {useState } from 'react';
import { ModeAction } from '@/utils/types/Enum/ModeAction';
import { AdminDisplay } from '@/utils/types/Auth/AdminDisplay';
import { isNullOrEmpty } from '@/utils/utils';
import { categoryApiRequest } from '@/apiRequests/category';
import { showToast } from '@/utils/showToast';

interface Props{
    closeModal:()=>void,
    propertiesJson:string,
    setPropertiesJson:(property:string)=>void,
    adminDisplay:AdminDisplay | null
}

const PropertiesModalUI = ({closeModal, propertiesJson, setPropertiesJson, adminDisplay}:Props) => {
    const [properties, setProperties]=useState<PropertiesJson[]>(JSON.parse(propertiesJson));
    const [isOpenPropertyValueModal, setIsOpenPropertyValueModal]=useState<boolean>(false);
    const [indexProperty, setIndexProperty]=useState<number>(-1);
    const [isOnly, setIsOnly]=useState<boolean>(true);
    const [propertyValueJson, setPropertyValueJson]=useState<string>('[]');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChangeData, setIsChangeData] = useState<boolean>(false);
    const [isOpenWarningModal, setIsOpenWarningModal]=useState<boolean>(false);

    const addProperty=()=>{
        let property:PropertiesJson={
            Id:"af1bc80d-f1b1-4634-9955-883630428d5b",
            Status:ModeAction.CREATE,
            Name:"",
            IsOnly:true,
            IsSearch:true,
            Value:[]
        }

        setProperties([...properties, property]);
        setIsChangeData(true);
    }

    const removeProperty=async (index:number)=>{
        setIsChangeData(true);

        if(properties[index].Status==ModeAction.CREATE){
            const valueKeys:ValueKey[]=properties[index].Value.filter(_=>(_.Status==ModeAction.CREATE && !isNullOrEmpty(_.PathUrl)) 
            || _.Status==ModeAction.UPLOAD || (_.Status==ModeAction.UPLOADDELETE) )

            if(valueKeys.length!=0){
                setIsLoading(true);

                try{
                    await categoryApiRequest.deleteImageCategoryPropertyDetailNotSave({body:valueKeys, token:adminDisplay?.token}).then((response)=>{
                        setProperties([...properties.slice(0, index), ...properties.slice(index + 1)]);
                        setIsLoading(false);
                    })
                }
                catch(error){
                    console.log(error);
                    showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
                    setIsLoading(false);
                }
            }
            else{
                setProperties([...properties.slice(0, index), ...properties.slice(index + 1)]);
            }
        }
        else{
            properties[index].Status=ModeAction.DELETE;
            setProperties([...properties]);
        }
    }

    const openModal=()=>
        setIsOpenPropertyValueModal(!isOpenPropertyValueModal);

    const handleChange=(name:string, index:number)=> (e: any)=>{
        switch (name) {
            case "name":
                setIsChangeData(true);
                properties[index].Name=e.target.value;

                if(properties[index].Status==ModeAction.NOCHANGE)
                    properties[index].Status=ModeAction.UPDATE;

                setProperties([...properties]);
                break;
            case "only":
                setIsChangeData(true);
                properties[index].IsOnly=!properties[index].IsOnly;

                if(properties[index].Status==ModeAction.NOCHANGE)
                    properties[index].Status=ModeAction.UPDATE;

                setProperties([...properties]);
                break;
            case "search":
                setIsChangeData(true);
                properties[index].IsSearch=!properties[index].IsSearch;

                if(properties[index].Status==ModeAction.NOCHANGE)
                    properties[index].Status=ModeAction.UPDATE;

                setProperties([...properties]);
                break;
            default:
                break;
        }
    }

    const setPropertyValue=(index:number, propertyValues:ValueKey[])=>{
        properties[index].Value=propertyValues;
        setIsChangeData(true);

        if(properties[index].Status==ModeAction.NOCHANGE)
            properties[index].Status=ModeAction.UPDATE;
        
        setProperties([...properties]);
    }

    const eventButtonAddItem=()=>{
        if(properties.some(_=>isNullOrEmpty(_.Name))){
            showToast("warning", <p>Tên không được để trống. Vui lòng nhập đầy đủ</p>)
        }
        else{
            setPropertiesJson(JSON.stringify(properties))
            closeModal();
        }
    }

    const openWarningModal=()=>
        setIsOpenWarningModal(!isOpenWarningModal);

    const eventCloseModal=async ()=>{
        let valueKeys:ValueKey[]=[];
        openWarningModal();

        if(properties.length>0){
            properties.forEach((value, index)=>{
                if(value.Status!=ModeAction.NOCHANGE){
                    const valueKeyItems:ValueKey[]=properties[index].Value.filter(_=>(_.Status==ModeAction.CREATE && !isNullOrEmpty(_.PathUrl)) 
                    || _.Status==ModeAction.UPLOAD || (_.Status==ModeAction.UPLOADDELETE))

                    if(valueKeyItems.length!=0){
                        valueKeys=valueKeys.concat(valueKeyItems);
                    }
                }
            });

            if(valueKeys.length!=0){
                setIsLoading(true);
                try{
                    await categoryApiRequest.deleteImageCategoryPropertyDetailNotSave({body:valueKeys, token:adminDisplay?.token}).then((res)=>{
                        closeModal();
                    })
                }
                catch(error){
                    console.log(error);
                    showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
                    setIsLoading(false);
                }
            }
            else{
                closeModal();
            }
        }
        else{
            closeModal();
        }
    }

  return (
    <>
        {isOpenPropertyValueModal && <PropertyValueModalUI closeModel={openModal} addProperty={setPropertyValue}
          indexProperty={indexProperty} propertyValueJson={propertyValueJson} isOnly={isOnly} adminDisplay={adminDisplay}></PropertyValueModalUI>}

        {isOpenWarningModal && (<DeleteWarningModalUI closeModal={openWarningModal} title={'Thay đổi dữ liệu'} description={'Dữ liệu đã thay đổi nhưng chưa được lưu'} 
            eventDeleteItem={eventCloseModal} isDelete={false}></DeleteWarningModalUI>)}

        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-[50rem] max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Thuộc tính
                            </h3>
                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                            w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                event.preventDefault();
                                
                                if(isChangeData)
                                    openWarningModal();
                                else
                                    closeModal();
                            }}>
                                <XMarkIcon className="w-6 h-6"></XMarkIcon>
                                <span className="sr-only">Close modal</span>
                            </Button>
                        </div>
                        
                        <form className="p-4 md:p-5">
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex flex-row gap-4 text-base text-black font-semibold leading-6 border-b border-gray-200 pb-2 w-[97%]">
                                    <p className='w-[45%]'>Tên</p>
                                    <p className='w-[13%]'>Tìm kiếm</p>
                                    <p className='w-[13%]'>Chọn một</p>
                                    <p className='w-[22%]'>Giá trị</p>

                                    <div className='mt-1 flex justify-end w-[7%]'>
                                        <ButtonAddItemUI eventButtonClicked={addProperty}></ButtonAddItemUI>
                                    </div>
                                </div>

                                <div className='h-60 overflow-y-auto w-full'>
                                    {properties && properties.map((property:PropertiesJson, index)=>{
                                        let data;

                                        if(property.Status!=ModeAction.DELETE){
                                            data=(
                                                <div className="flex flex-row gap-4 w-[97%]" key={index}>
                                                    <InputUI value={property.Name} name={`Name${index}`} classDiv={"w-[45%]"} classInput={"w-full"}
                                                    onChangeEvent={handleChange("name", index)}></InputUI>

                                                    <div className='flex justify-center items-center w-[13%]'>
                                                        <CheckboxUI isChecked={property.IsSearch} onChangeEvent={handleChange("search", index)} className='defaultCheckboxInline'></CheckboxUI>
                                                    </div>
                                                    
                                                    <div className='flex justify-center items-center w-[13%]'>
                                                        <CheckboxUI isChecked={property.IsOnly} onChangeEvent={handleChange("only", index)} className='defaultCheckboxInline'></CheckboxUI>
                                                    </div>

                                                    <InputUI value={property.Value?property.Value.filter(_=>_.Status!=ModeAction.DELETE).map(_=>_.Name).join(" | "):""} name={`Value${index}`} classDiv={"w-[22%]"} classInput={"w-full"} isDisabled={true}></InputUI>

                                                    <div className='flex flex-row w-[7%] gap-1 -mt-2'>
                                                        <Button 
                                                            onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                event.preventDefault();
                                                                setIndexProperty(index);
                                                                setPropertyValueJson(JSON.stringify(property.Value));
                                                                setIsOnly(property.IsOnly);
                                                                openModal();
                                                            }} 
                                                            disabled={!property.IsSearch || isNullOrEmpty(property.Name)}
                                                            className={"disabled:opacity-70"}>
                                                                <PlusCircleIcon className='h-[1.5rem] w-[1.5rem] text-green-600'></PlusCircleIcon>
                                                        </Button>

                                                        <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                            event.preventDefault();
                                                            removeProperty(index);
                                                        }}><TrashIcon className='h-[1.2rem] w-[1.2rem] text-red-600'></TrashIcon></Button>
                                                    </div>
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
                                <ButtonAddItemUI isDisabled={properties.length==0 || !isChangeData} titleButton={'Thêm danh sách'} eventButtonClicked={eventButtonAddItem}></ButtonAddItemUI>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default PropertiesModalUI