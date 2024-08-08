import { Input } from '@headlessui/react'
import React, { ChangeEventHandler } from 'react'
import { number } from 'zod'

interface Props{
    value?:any,
    isBlockLabel?:boolean,
    label?:string |null,
    classLabel?:string,
    classInput?:string,
    classDiv?:string,
    placeholder?:string,
    name?:string
    errArr?:ErrorValidate[],
    type?:string,
    max?:number,
    onChangeEvent?:ChangeEventHandler<HTMLInputElement> | undefined,
    isDisabled?:boolean,
    unit?:string,
    classUint?:string,
    isReadOnly?:boolean
}

const InputUI = ({value=undefined, 
  isBlockLabel=true, 
  label="", 
  classLabel="", 
  classDiv="", 
  classInput="", 
  placeholder,
  name,
  errArr,
  type="text",
  max,
  isDisabled=false,
  onChangeEvent,
  unit,
  classUint,
  isReadOnly=false,
  }:Props) => {
    return (
      <div className={classDiv}>
          {label && (<label htmlFor={name} className={`${isBlockLabel?"block":"inline-block"} text-base text-black font-semibold leading-6 pb-2 ${classLabel}`}>{label}</label>)}

          <div className={`${unit?"flex flex-row gap-1 w-full":classInput} ${isBlockLabel?"block":"inline-block"}`}>
              <Input type={type} name={name} maxLength={max} value={value} onChange={onChangeEvent} disabled={isDisabled} readOnly={isReadOnly}
              className={`border border-s2gray2 rounded-lg text-gray-900 text-sm transition-input py-2.5 pl-3 pr-10 ${unit?classInput:"w-full"}
              ease-in-out delay-150 focus:outline-none focus:border-s2cyan1`} placeholder={placeholder}>
              </Input>

            {unit && (<p className={`flex justify-center items-center ${classUint}`}>{unit}</p>)}
          </div>

          <div className='pt-2'>
            {errArr?.map((err, index)=>(
              <div key={index} className='text-red-600 text-xs font-light'>{err.message}</div>
            ))}
          </div>
          
      </div>
    )
}

export default InputUI