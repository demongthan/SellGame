import {ShoppingCartIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    className?:string
    title:string,
    isIconCard?:boolean,
    type?:'submit' | 'reset' | 'button' | undefined;
}

const ButtonV1UI = ({title, className, isIconCard, type}:Props) => {
  return (
        <button type={type} className={`${className} text-white bg-s2cyan1 border border-transparent rounded-md px-4 hover:opacity-70`}>
          {isIconCard && (
            <ShoppingCartIcon className='w-[1.2rem] h-[1.2rem]'></ShoppingCartIcon>
          )}
        {title}
        </button>
  )
}

export default ButtonV1UI