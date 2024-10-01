import { Input } from '@headlessui/react'
import React, { ChangeEventHandler, FocusEventHandler } from 'react'

interface Props{
    value?:any,
    label?:string |null,
    classLabel?:string,
    classInput?:string,
    classDiv?:string,
    placeholder?:string,
    name?:string,
    max?:number,
    onChangeEvent?:ChangeEventHandler<HTMLInputElement> | undefined,
    onBlurEvent?:FocusEventHandler<HTMLInputElement> | undefined
}

const InputSearchUI = ({
        value=undefined, 
        name="", 
        max, 
        onBlurEvent, 
        onChangeEvent, 
        placeholder="", 
        label="", 
        classDiv="", 
        classInput="", 
        classLabel=""
    }:Props) => {
    return (
        <div className={`flex flex-row ${classDiv} border rounded-lg border-slate-300 h-12 shadow-xl`}>
            <label htmlFor={name} className={`bg-lime-50 rounded-l-lg border-r border-slate-300 h-full text-base text-coolGray-500 font-semibold leading-6 ${classLabel} flex justify-start items-center pl-2`}>{label}</label>

            <Input type={"text"} name={name} maxLength={max} value={value} onBlur={onBlurEvent} onChange={onChangeEvent}
                className={`rounded-r-lg h-full text-slate-500 font-normal text-sm focus:outline-none px-2 ${classInput}`} placeholder={placeholder}>
            </Input>
        </div>
    )
}

export default InputSearchUI