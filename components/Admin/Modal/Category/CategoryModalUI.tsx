"use client"

import { ButtonUpdateItemUI, CheckboxUI, LoadingUI, SelectUI } from '@/components'
import ButtonAddItemUI from '@/components/Common/UI/Button/ButtonAddItemUI'
import InputUI from '@/components/Common/UI/InputUI'
import PropertiesModalUI from './PropertiesModalUI'
import { categoryApiRequest } from '@/apiRequests/category'
import { showToast } from '@/utils/showToast'
import { isNullOrEmpty, truncateString } from '@/utils/utils'
import { AdminDisplay } from '@/utils/types/AdminDisplay'

import { Button, Input } from '@headlessui/react'
import { PencilSquareIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { FormEvent, useEffect, useState } from 'react'
import { PropertiesJson } from '@/utils/types/PropertiesJson'
import { CreateCategoryDto } from '@/apiRequests/DataDomain/Category/CreateCategoryDto'

interface Props{
    refreshAllCategoryCreate:()=>Promise<void>,
    refreshAllCategoryUpdate:()=>Promise<void>,
    closeModel:()=>void,
    idCategory:string,
    adminDisplay:AdminDisplay | null
}

const CategoryModalUI = ({closeModel, refreshAllCategoryCreate, refreshAllCategoryUpdate, idCategory, adminDisplay}:Props) => {
    const [isOpenPropertiesModal, setIsOpenPropertiesModal]=useState<boolean>(false);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const [isChangeData, setIsChangeData] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const isCreate=isNullOrEmpty(idCategory);

    const [name, setName]=useState<string>("");
    const [propertiesJson,setPropertiesJson]=useState<string>("[]");
    const [description, setDescription] = useState<string | undefined>("");
    const [active, setActive] = useState<boolean>(true);

    const openModel=()=>
        setIsOpenPropertiesModal(!isOpenPropertiesModal);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setErrArr([]);
        setIsLoadingPopup(true);

        try{
            const formData = new FormData();
            formData.append("Name", name);

            const response = await fetch('/api/category', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();
    
            if(data.isSuccess){
                if(isCreate){
                    const createCategoryDto: CreateCategoryDto={
                        Name: name,
                        Description: description,
                        Active: active,
                        Properties:propertiesJson
                    }

                    const result = await categoryApiRequest.createCategory({body:createCategoryDto, token:adminDisplay?.token})

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "danh mục game")}</p>);
                        closeModel();
                        refreshAllCategoryCreate()
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
                }
                else{
                    const updateCategoryDto: UpdateCategoryDto={
                        Name: name,
                        Description: description,
                        Active: active,
                        Properties:propertiesJson
                    }

                    const result = await categoryApiRequest.updateCategory({body:updateCategoryDto, id:idCategory, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "danh mục game")}</p>);
                        closeModel();
                        refreshAllCategoryUpdate();
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
                }
            }
            else{
                const errorArr: ErrorValidate[] =data.data.map(({...item})=>({
                    for:item.for,
                    message: item.message
                }))
                setErrArr(errorArr);
            }
            setIsLoadingPopup(false);
        }
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoadingPopup(false);
        }
    }

    const getCategoryInit=async ():Promise<void>=>{
        try{
            await categoryApiRequest.getCategoryById({id:idCategory,fields: "?fields=Name%2CDescription%2CActive%2CProperties", token:adminDisplay?.token}).then((res)=>{
                if(res.payload.data){
                    setActive(res.payload.data.Active)
                    setPropertiesJson(res.payload.data.Properties?res.payload.data.Properties:"[]")
                    setDescription(res.payload.data.Description)
                    setName(res.payload.data.Name);
                }

                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoading(false);
        }
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "name":
                setName(e.target.value);
                setIsChangeData(true);
                break;
            case "description":
                setDescription(e.target.value);
                setIsChangeData(true);
                break;
            case "active":
                setActive(e.target.isChecked);
                setIsChangeData(true);
            default:
                break;
        }
    }

    const setProperties = (property:string)=>{
        setPropertiesJson(property);
        setIsChangeData(true);
    }

    useEffect(()=>{
        if(!isCreate){
            getCategoryInit();
        }
        else{
            setIsLoading(false);
        }
        setIsLoading
    }, [setName, setActive, setDescription, setPropertiesJson])

  return (
    <>
        {isOpenPropertiesModal && <PropertiesModalUI closeModal={openModel} propertiesJson={propertiesJson} setPropertiesJson={setProperties} ></PropertiesModalUI>}
        
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-[40rem] max-h-full">
                {isLoading?(<LoadingUI></LoadingUI>):(
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Danh mục
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
                        
                        {isLoadingPopup &&(
                            <div className='w-full h-full flex items-center justify-center bg-s2gray7 absolute top-0 z-[1000]'>
                                <span className='loader'></span>
                            </div>
                        )} 

                        <form className="p-4 md:p-5" onSubmit={onSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <InputUI name='Name' label={"Danh mục :"} classDiv={"w-full"} classInput={"w-full"}
                                    value={name}
                                    onChangeEvent={handleChange("name")}
                                    errArr={errArr?.filter((error)=>error.for==="name")} ></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <InputUI name='Description' label={"Mô tả :"} classDiv={"w-full"} classInput={"w-full"}
                                    value={description}
                                    onChangeEvent={handleChange("description")}
                                    ></InputUI>
                                </div>

                                <div className="col-span-2">
                                    <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-2/5"}
                                    onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-col'>
                                        <div className='flex flex-row w-full'>
                                            <label className='text-base text-black font-semibold leading-6 w-[90%]'>Thuộc tính:</label>

                                            <Button className={"w-[10%] flex justify-end items-center"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                event.preventDefault();
                                                openModel();
                                            }}>{isCreate?(<PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon>)
                                            :(<PencilSquareIcon className='h-[1.5rem] w-[1.5rem]'></PencilSquareIcon>)}</Button>
                                        </div>
                                    </div>

                                    <Input value={propertiesJson} name='Properties' readOnly={true} hidden={true}></Input>

                                    <div className="flex flex-col w-full py-2 mt-2 max-h-40 overflow-y-auto">
                                        {propertiesJson && JSON.parse(propertiesJson).map((property:PropertiesJson, index:number) =>(
                                            <div key={index} className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                                                <div className="flex w-full items-center py-2 border-transparent border-l-2 relative hover:border-teal-100">
                                                    <div className="w-full items-center flex py-2">
                                                        <div className="w-4/5 "><span className='text-sm font-semibold'>{property.Name}</span>
                                                            <div className="text-xs truncate w-full normal-case font-normal mt-1 text-gray-500">{truncateString(property.Value.map(_=>_.Name). join(" | "), 80)}</div>
                                                        </div>
                                                        <div className="w-1/5 flex">
                                                            <div className={`flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full ${property.IsOnly?"text-fuchsia-700 bg-fuchsia-100":"text-purple-700 bg-purple-100"} border border-teal-300 `}>
                                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">{property.IsOnly?"Chọn một":"Chọn nhiều"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='mt-6'>
                                {isCreate?(
                                    <ButtonAddItemUI type='submit' titleButton={'Thêm danh mục'} eventButtonClicked={ (): void =>{} }></ButtonAddItemUI>
                                ):(
                                    <ButtonUpdateItemUI isDisabled={!isChangeData} type='submit' titleButton={'Cập nhật'} eventButtonClicked={function (): void {} }></ButtonUpdateItemUI>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
        
    </> 
  )
}

export default CategoryModalUI