"use client"

import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";

interface Props{
    startDate: Date |null;
    endDate: Date |null;  
    label:string |null,
    isBlockLabel:boolean,
    classLabel?:string,
    classDateTime?:string,
    classDiv?:string
    // Assuming this is the end date for the range.  You can modify this as per your requirements.  If you want the start date, just remove endDate from the interface.  Example: startDate: Date;  // Assuming this is the start date for the range.  You can modify this as per your requirements.  If you want the end date, just remove startDate from the interface.  Example: endDate: Date;  // Assuming this is the end date for the range.  You can modify this as per your requirements.  If you want the start date, just remove endDate from the interface.  Example: startDate: Date;  // Assuming this is the start date for the range.  You can modify this as per your requirements.  If you want the end date, just remove startDate from the interface.  Example: endDate: Date;  // Assuming this is the end date for the
}

const FromToDateUI = ({startDate, endDate, label="", classDiv="", classDateTime="", classLabel="", isBlockLabel}:Props) => {
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    }); 

    const handleValueChange = (newValue:any) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
    }

  return (
    <div className={classDiv}>
        {label && (<label className={`${isBlockLabel?"block":"inline-block"} text-base text-black font-semibold leading-6 pb-2 ${classLabel}`}>{label}</label>)}
        <Datepicker 
            i18n={"vi"} 
            inputClassName={`relative transition-all duration-300 py-2.5 pl-4 pr-14 ${classDateTime} border border-s2gray2 rounded-lg 
                tracking-wide font-light text-sm placeholder-gray-400 transition-input ease-in-out delay-150 focus:outline-none focus:border-s2cyan1`}
            value={{startDate:startDate, endDate:endDate}} 
            onChange={handleValueChange} 
            showShortcuts={true} 
            configs={{
                shortcuts: {
                    today: "Hôm nay", 
                    yesterday: "Hôm qua", 
                    past: period => `${period} ngày trước`, 
                    currentMonth: "Tháng hiện tại", 
                    pastMonth: "Tháng trước" 
                }
            }} 
        /> 
    </div>
  )
}

export default FromToDateUI