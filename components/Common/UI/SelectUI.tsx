import React from 'react'

interface Props{
    value:string|undefined,
    isBlockLabel:boolean,
    label:string |null,
    classLabel?:string,
    classSelect?:string,
    classDiv?:string
}

const SelectUI = ({value=undefined, isBlockLabel, label="", classLabel="", classDiv="", classSelect=""}:Props) => {
  return (
    <div className={classDiv}>
        {label && (<label className={`${isBlockLabel?"block pb-2":"inline-block pr-3"} text-base text-black font-semibold leading-6 ${classLabel}`}>{label}</label>)}
        <select id="countries" value={value} className={`border border-s2gray2 rounded-lg text-gray-900 text-sm transition-input py-2.5 pl-4 pr-14 ${classSelect}
            ease-in-out delay-150 focus:outline-none focus:border-s2cyan1`}>
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
    </div>
  )
}

export default SelectUI