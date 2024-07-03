import React from 'react'

interface Props{
    value:string|undefined,
    isBlockLabel:boolean,
    label:string |null,
    classLabel?:string,
    classInput?:string,
    classDiv?:string,
    placeholder?:string
}

const InputUI = ({value=undefined, isBlockLabel, label="", classLabel="", classDiv="", classInput="", placeholder}:Props) => {
  return (
    <div className={classDiv}>
        {label && (<label className={`${isBlockLabel?"block":"inline-block"} text-base text-black font-semibold leading-6 pb-2 ${classLabel}`}>{label}</label>)}
        <input type='text' className={`border border-s2gray2 rounded-lg text-gray-900 text-sm transition-input py-2.5 pl-4 pr-14 ${classInput}
        ease-in-out delay-150 focus:outline-none focus:border-s2cyan1`} placeholder={placeholder}></input>
    </div>
  )
}

export default InputUI