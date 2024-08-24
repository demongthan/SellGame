"use client"

import { ButtonUpdateItemUI, CheckboxUI, LoadingUI, SelectUI } from '@/components'
import ButtonAddItemUI from '@/components/Common/UI/Button/ButtonAddItemUI'
import InputUI from '@/components/Common/UI/InputUI'
import PropertiesModalUI from './PropertiesModalUI'
import { categoryApiRequest } from '@/apiRequests/category'
import { showToast } from '@/utils/showToast'
import { isNullOrEmpty } from '@/utils/utils'
import { AdminDisplay } from '@/utils/types/AdminDisplay'

import { Button } from '@headlessui/react'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { FormEvent, useEffect, useState } from 'react'

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
            const formData = new FormData(event.currentTarget)
            formData.append("isCreate", isCreate?"true":"false");

            const response = await fetch('/api/category', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();
    
            if(data.isSuccess){
                if(isCreate){
                    const result = await categoryApiRequest.createCategory({body:data.data, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "danh mục game")}</p>);
                        refreshAllCategoryCreate()
                    }
                    else{
                        showToast("error", <p>{result.payload.message}</p>);
                    }
                }
                else{
                    const result = await categoryApiRequest.updateCategory({body:data.data, id:idCategory, token:adminDisplay?.token});

                    if(result.payload.data){
                        showToast("success", <p>{result.payload.message.replace("{Item}", "danh mục game")}</p>);
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
        {isOpenPropertiesModal && <PropertiesModalUI closeModal={openModel} propertiesJson={propertiesJson} setPropertiesJson={setPropertiesJson} ></PropertiesModalUI>}
        
        <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center bg-model
        items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
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
                                    <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} label={"Hiệu lực :"} classDiv={"w-full"} classLabel={"w-1/5"}
                                    onChangeEvent={handleChange("active")}></CheckboxUI>
                                </div>

                                <div className="col-span-2">
                                    <div className='flex flex-row gap-1'>
                                        <InputUI value={propertiesJson} name='Properties' label={"Danh mục :"} classDiv={"w-[90%]"} classInput={"w-full"} isReadOnly={true}></InputUI>

                                        <Button className={"w-[10%] flex justify-center items-center pt-6"} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                            event.preventDefault();
                                            openModel();
                                        }}><PlusCircleIcon className='h-[1.5rem] w-[1.5rem]'></PlusCircleIcon></Button>
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