import { Button } from '@headlessui/react'
import React from 'react'

interface Props{
    className?:string
    title:string,
    eventClickButton?:(event: React.MouseEvent<HTMLButtonElement>)=>void
    type?:'submit' | 'reset' | 'button' | undefined;
}

const ButtonV2UI = ({className, title, eventClickButton, type}:Props) => {
    return (
        <Button type={type} className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border 
        border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 ${className} focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}
        onClick={eventClickButton}>
            {title}
        </Button>
    )
}

export default ButtonV2UI