"use client"

import { Button, Input } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { ButtonAddItemUI, CheckboxUI, DeleteWarningModalUI, ImageModal, InputUI, LoadingUI } from '@/components';
import { ModeAction } from '@/utils/types/Enum/ModeAction';
import { ValueItemKey } from '@/utils/types/PropertiesJson';
import { ItemSelect } from '@/utils/types/SelectItem';
import { isNullOrEmpty } from '@/utils/utils';

interface Props{
    closeModel:()=>void,
    valueSelectData:ItemSelect[],
    values:ValueItemKey[],
    addValue:(values:ValueItemKey[])=>void
}

const SelectPropertyValueNotOnlyModalUI = ({closeModel, valueSelectData, values, addValue}:Props) => {
    const [isSelectAll, setIsSelectAll]=useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isChangeData, setIsChangeData]=useState<boolean>(false);
    const [isOpenWarningModal, setIsOpenWarningModal]=useState<boolean>(false);

    console.log(valueSelectData);

    const compareValue=(a:ItemSelect, b:ItemSelect, values:ValueItemKey[])=>{
        const aInValue = values.some(_=>_.IdValue==a.Value);
        const bInValue = values.some(_=>_.IdValue==b.Value);

        if (aInValue && !bInValue) {
            return -1;
        } else if (!aInValue && bInValue) {
            return 1;
        }
        return 0;
    }

    const [valueSelectDataShow, setValueSelectDataShow]=useState<ItemSelect[]>(()=>valueSelectData.sort((a,b)=>compareValue(a, b, values)))
    const [valuesSelect, setValuesSelect]=useState<ValueItemKey[]>(values);
    const [value, setValue]=useState<string>("");
    
    const handleChange = (name:string) => (e: any) => {
        switch(name){
            case "value":
                setValue(e.target.value);
                setIsChangeData(true);
                setValueSelectDataShow(valueSelectData.filter(_=> isNullOrEmpty(e.target.value) || _.Name.toLowerCase().includes(e.target.value.toLowerCase())).sort((a, b)=>compareValue(a, b, values)));
                break;
            case "selectAll":
                const isCheck=!isSelectAll;
                setIsSelectAll(isCheck);
                setIsChangeData(true);

                if(isCheck){
                    let lstItem:ValueItemKey[]=[];

                    valueSelectDataShow.forEach((item:ItemSelect)=>{
                        const index=valuesSelect.findIndex(_=>_.IdValue==item.Value);

                        if(index<0){
                            lstItem.push({Id:"4d10b3a5-a9c3-4664-b9d1-05d254286f0f", IdValue:item.Value, Value:item.Name, Status:ModeAction.CREATE});
                        }
                    });

                    setValuesSelect([...valuesSelect, ...lstItem]);
                }

            default:
                break;
        }
    }

    const handleSelectChange=(index:number)=>(event: React.ChangeEvent<HTMLInputElement>)=>{
        const indexItem=valuesSelect.findIndex(_=>_.IdValue==valueSelectDataShow[index].Value);
        setIsChangeData(true);

        if(event.target.checked){
            if(indexItem>-1){
                if(valuesSelect[indexItem].Status==ModeAction.DELETE){
                    valuesSelect[indexItem].Status=ModeAction.NOCHANGE;
                    setValuesSelect([...valuesSelect]);
                }
            }
            else{
                const item:ValueItemKey={
                    Id:"4d10b3a5-a9c3-4664-b9d1-05d254286f0f", 
                    IdValue:valueSelectDataShow[index].Value, 
                    Value:valueSelectDataShow[index].Name, 
                    Status:ModeAction.CREATE};

                setValuesSelect([...valuesSelect, item]);
            }
        }
        else{
            if(isSelectAll)
                setIsSelectAll(false);

            if(indexItem>-1){
                if(valuesSelect[indexItem].Status==ModeAction.UPDATE || valuesSelect[indexItem].Status==ModeAction.NOCHANGE){
                    valuesSelect[indexItem].Status=ModeAction.DELETE;
                    setValuesSelect([...valuesSelect]);
                }
                else if(valuesSelect[indexItem].Status==ModeAction.CREATE){
                    setValuesSelect([...valuesSelect.slice(0, indexItem), ...valuesSelect.slice(indexItem + 1)])
                }
            }
            else{
                setValuesSelect([...valuesSelect.slice(0, indexItem), ...valuesSelect.slice(indexItem + 1)]);
            }
        }
    }

    const eventButtonAddClicked=()=>{
        addValue(valuesSelect);
        closeModel();
    }

    const openWarningModal=()=>
        setIsOpenWarningModal(!isOpenWarningModal);

    const eventCloseModal=async()=>{
        openWarningModal();
        closeModel();
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); 
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isOpenWarningModal && (<DeleteWarningModalUI closeModal={openWarningModal} title={'Cảnh báo dữ liệu thay đổi'} description={'Bạn đã chọn Team Color, nhưng chưa lưu.'} 
            eventDeleteItem={eventCloseModal} isDelete={false}></DeleteWarningModalUI>)}

            <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] justify-center bg-model
                items-center w-full md:inset-0 h-full max-h-full">
                <div className="relative p-4 w-full max-w-[50rem] max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tạo giá trị
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

                        {isLoading?(<div className='h-[30rem]'><LoadingUI></LoadingUI></div>):(
                            <div className="p-4 md:p-5">
                                <div className="flex flex-col gap-4 mb-4 w-full">
                                    <div className='flex flex-row gap-5 justify-start border-b border-double border-cyan-400 pb-5'>
                                        <InputUI name='Value' value={value} onChangeEvent={handleChange("value")} isBlockLabel={false} label={"Giá trị :"} 
                                        classDiv={"w-[83%]"} classInput={"w-[40%]"} classLabel={"w-[10%]"}></InputUI>

                                        <CheckboxUI name='SelectAll' isBlockLabel={false} label={"Chọn tất cả"} classDiv={"w-[17%]"} classLabel={"w-[90%]"} 
                                        isChecked={isSelectAll} onChangeEvent={handleChange("selectAll")}></CheckboxUI>
                                    </div>

                                    <div className="grid gap-4 grid-cols-4 h-[28rem] overflow-y-auto w-full px-2">
                                        {valueSelectDataShow && valueSelectDataShow.map((item:ItemSelect, index:number)=>(
                                            <div key={index} className='flex flex-col h-40'>
                                                <div className='h-28'>
                                                    {item.PathUrl && (<ImageModal src={item.PathUrl}></ImageModal>)}
                                                </div>

                                                <div className="flex justify-center items-center pt-1 text-center h-12">
                                                    <Input id={`Value${index}`} checked={valuesSelect.some(_=>_.IdValue==item.Value && _.Status!=ModeAction.DELETE)} type="checkbox" value="" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                                                    onChange={handleSelectChange(index)}></Input>
                                                    <label htmlFor={`Value${index}`} className="ms-2 text-sm font-medium text-gray-900">{item.Name}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <ButtonAddItemUI isDisabled={!isChangeData} titleButton={"Thêm"} eventButtonClicked={eventButtonAddClicked}></ButtonAddItemUI>
                            </div>  
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectPropertyValueNotOnlyModalUI