"use client"

import { ButtonAddItemUI, DeleteWarningModalUI, InputUI, LoadingUI } from '@/components';
import { ModeAction } from '@/utils/types/Enum/ModeAction';
import { ValueKey } from '@/utils/types/PropertiesJson';
import { isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, MinusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

import React, { useState } from 'react'
import UploadImagePropertyValueModalUI from './UploadImagePropertyValueModalUI';
import { AdminDisplay } from '@/utils/types/Auth/AdminDisplay';
import { categoryApiRequest } from '@/apiRequests/category';
import { showToast } from '@/utils/showToast';

interface Props{
    closeModel:()=>void,
    addProperty:(index:number, propertyValues:ValueKey[])=>void,
    indexProperty:number,
    propertyValueJson:string,
    isOnly:boolean,
    adminDisplay:AdminDisplay | null
}

const PropertyValueModalUI = ({closeModel, indexProperty, addProperty, propertyValueJson, isOnly, adminDisplay}:Props) => {
    const [propertyValues, setPropertyValues]=useState<ValueKey[]>(JSON.parse(propertyValueJson));
    const [search, setSearch] = useState<string>("");
    const [indexPropertyValue, setIndexPropertyValue]=useState<number>(-1);
    
    const [isOpenUploadImageModal, setIsOpenUploadImageModal]=useState<boolean>(false);
    const [isOpenWarningModal, setIsOpenWarningModal]=useState<boolean>(false);

    const [isChangeData, setIsChangeData]=useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addPropertyValue=()=>{
        const propertyValue:ValueKey={
            Id:"af1bc80d-f1b1-4634-9955-883630428d5b",
            Name:"",
            PathUrl:"",
            Status:ModeAction.CREATE
        }

        setPropertyValues([...propertyValues, propertyValue]);
    }

    const removePropertyValue=async (index:number)=>{
        setIsChangeData(true);

        if(propertyValues[index].Status==ModeAction.UPDATE){
            propertyValues[index].Status=ModeAction.UPLOADDELETE;
            setPropertyValues([...propertyValues]);
        }
        else if(propertyValues[index].Status!=ModeAction.CREATE){
            propertyValues[index].Status=ModeAction.DELETE;
            setPropertyValues([...propertyValues]);
        }
        else{
            if(!isNullOrEmpty(propertyValues[index].PathUrl)){
                setIsLoading(true);

                try{
                    await categoryApiRequest.deleteImageCategoryPropertyDetail({body:propertyValues[index].PathUrl, token:adminDisplay?.token}).then((res)=>{
                        setPropertyValues([...propertyValues.slice(0, index), ...propertyValues.slice(index + 1)]);
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
                setPropertyValues([...propertyValues.slice(0, index), ...propertyValues.slice(index + 1)]);
            }
        }
    }

    const onChangePropertyValue=(index:number)=> (e: any)=>{
        setIsChangeData(true);
        propertyValues[index].Name=e.target.value;

        if(propertyValues[index].Status==ModeAction.NOCHANGE)
            propertyValues[index].Status=ModeAction.UPDATE;

        setPropertyValues([...propertyValues]);
    }

    const onChangePropertyPathUrl=(url:string ,index:number)=>{
        setIsChangeData(true);
        propertyValues[index].PathUrl=url;

        if(propertyValues[index].Status==ModeAction.NOCHANGE || propertyValues[index].Status==ModeAction.UPDATE)
            propertyValues[index].Status=ModeAction.UPLOAD;

        setPropertyValues([...propertyValues]);
    }

    const handleChangeSearch=(e:any)=>
        setSearch(e.target.value);

    const eventButtonAddItem=()=>{
        if(propertyValues.some(_=>isNullOrEmpty(_.Name))){
            showToast("warning", <p>Giá trị không được để trống. Vui lòng nhập đầy đủ</p>)
        }
        else{
            addProperty(indexProperty, propertyValues.filter(_=>!isNullOrEmpty(_.Name)));
            closeModel();
        }
    }

    const openUploadImageModal=()=>
        setIsOpenUploadImageModal(!isOpenUploadImageModal);

    const openWarningModal=()=>
        setIsOpenWarningModal(!isOpenWarningModal);

    const eventCloseModal=async ()=>{
        openWarningModal();
        const valueKeys:ValueKey[]=propertyValues.filter(_=>(_.Status==ModeAction.CREATE && !isNullOrEmpty(_.PathUrl)) 
        || _.Status==ModeAction.UPLOAD || (_.Status==ModeAction.UPLOADDELETE) )

        if(valueKeys.length!=0){
            setIsLoading(true);
            try{
                await categoryApiRequest.deleteImageCategoryPropertyDetailNotSave({body:valueKeys, token:adminDisplay?.token}).then((response)=>{
                    closeModel();
                })
            }
            catch(error){
                console.log(error);
                showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
                setIsLoading(false);
            }
        }
        else{
            closeModel();
        }
    }

    return (
        <>
            {isOpenUploadImageModal && (
                <UploadImagePropertyValueModalUI closeModel={openUploadImageModal} adminDisplay={adminDisplay}
                    pathUrl={propertyValues[indexPropertyValue].PathUrl}
                    indexPropertyValue={indexPropertyValue}
                    changePropertyPathUrl={onChangePropertyPathUrl} 
                    idPropertyDetail={propertyValues[indexPropertyValue].Id}>
                </UploadImagePropertyValueModalUI>
            )}

            {isOpenWarningModal && (<DeleteWarningModalUI closeModal={openWarningModal} title={'Thay đổi dữ liệu'} description={'Dữ liệu đã thay đổi nhưng chưa được lưu'} 
            eventDeleteItem={eventCloseModal} isDelete={false}></DeleteWarningModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] justify-center bg-model
            items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-[35rem] max-h-full">
                    {isLoading?(<LoadingUI></LoadingUI>):(
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Giá trị
                                </h3>
                                <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                                w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                    event.preventDefault();
                                    if(isChangeData)
                                        openWarningModal();
                                    else
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

                                            if((propertyValue.Status!=ModeAction.DELETE && propertyValue.Status!=ModeAction.UPLOADDELETE) && (isNullOrEmpty(search) || propertyValue.Name.includes(search))){
                                                data=(
                                                    <div className="flex flex-row gap-4 w-[98%]" key={index}>
                                                        <InputUI value={propertyValue.Name} name={`Name${index}`} 
                                                        classDiv={`${!isOnly?"w-[94%]":"w-[88%]"}`} classInput={"w-full"}
                                                        onChangeEvent={onChangePropertyValue(index)}></InputUI>

                                                        {!isOnly && (<Button className={"-mt-1 w-[6%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                            event.preventDefault();
                                                            setIndexPropertyValue(index);
                                                            openUploadImageModal();
                                                        }}><ArrowUpTrayIcon className='h-[1.5rem] w-[1.5rem] text-s2cyan1'></ArrowUpTrayIcon></Button>)}

                                                        <Button className={"-mt-1 w-[6%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                            event.preventDefault();
                                                            removePropertyValue(index);
                                                        }}><MinusCircleIcon className='h-[1.5rem] w-[1.5rem] text-red-600'></MinusCircleIcon></Button>
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
                                    <ButtonAddItemUI isDisabled={propertyValues.length==0 || !isChangeData} titleButton={'Thêm giá trị'} eventButtonClicked={ eventButtonAddItem}></ButtonAddItemUI>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PropertyValueModalUI