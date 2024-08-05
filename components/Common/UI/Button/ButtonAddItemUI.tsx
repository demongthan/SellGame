import { Button } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    titleButton?: string,
    eventButtonClicked:()=>void,
    type?:'submit' | 'reset' | 'button' | undefined,
    isDisabled?: boolean
}

const ButtonAddItemUI = ({titleButton, eventButtonClicked, type, isDisabled=false}:Props) => {
  return (
    <>
        {type=="submit"?(
            <Button disabled={isDisabled} type="submit" className={`flex flex-row gap-2 justify-center items-center text-white bg-s2cyan1 border border-transparent 
            rounded-md ${titleButton?"px-4 h-9":"px-2 h-5"} disabled:opacity-70 hover:opacity-70`}>
                <PlusIcon className={`${titleButton?"h-[1.5rem] w-[1.5rem]":"h-[1rem] w-[1rem]"}`}></PlusIcon>

                {titleButton && (<p className='text-base font-semibold'>{titleButton}</p>)}
            </Button>
        ):(
            <Button disabled={isDisabled} type={type} className={`flex flex-row gap-2 justify-center items-center text-white bg-s2cyan1 border border-transparent 
                rounded-md ${titleButton?"px-4 h-9":"px-1 h-5"} disabled:opacity-70 hover:opacity-70`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                    event.preventDefault();
                
                    eventButtonClicked();
            }}>
                <PlusIcon className={`${titleButton?"h-[1.5rem] w-[1.5rem]":"h-[1rem] w-[1rem]"}`}></PlusIcon>

                {titleButton && (<p className='text-base font-semibold'>{titleButton}</p>)}
            </Button>
        )}
    </>
  )
}

export default ButtonAddItemUI