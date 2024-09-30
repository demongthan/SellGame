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
        <div className={`flex flex-row ${classDiv} border border-s2gray2 rounded-lg transition-input 
        ease-in-out delay-150 focus:outline-none focus:border-s2cyan h-12`}>
            <label htmlFor={name} className={`bg-gray-100 rounded-l-lg border-r border-s2gray2 h-full text-base text-black font-semibold leading-6 ${classLabel} flex justify-start items-center pl-2`}>{label}</label>

            <Input type={"text"} name={name} maxLength={max} value={value} onBlur={onBlurEvent} onChange={onChangeEvent}
                className={`rounded-r-lg h-full text-sm focus:outline-none px-2 ${classInput}`} placeholder={placeholder}>
            </Input>
        </div>
    )
}

export default InputSearchUI