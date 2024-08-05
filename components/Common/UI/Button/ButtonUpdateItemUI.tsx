import { Button } from '@headlessui/react'
import React from 'react'

interface Props{
    titleButton?: string,
    eventButtonClicked:()=>void,
    type?:'submit' | 'reset' | 'button' | undefined,
    isDisabled?: boolean
}

const ButtonUpdateItemUI = ({titleButton, eventButtonClicked, type, isDisabled=false}:Props) => {
  return (
    <>
        {type=="submit"?(
            <Button disabled={isDisabled} type="submit" className={`flex flex-row gap-2 justify-center items-center text-white bg-s2cyan1 border border-transparent 
            rounded-md ${titleButton?"px-4 h-9":"px-2 h-5"} disabled:opacity-70 hover:opacity-70`}>

                {titleButton && (<p className='text-base font-semibold'>{titleButton}</p>)}
            </Button>
        ):(
            <Button disabled={isDisabled} type={type} className={`flex justify-center items-center text-white bg-s2cyan1 border border-transparent 
                rounded-md ${titleButton?"px-4 h-9":"px-1 h-5"} disabled:opacity-70 hover:opacity-70`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                    event.preventDefault();
                
                    eventButtonClicked();
            }}>

                {titleButton && (<p className='text-base font-semibold'>{titleButton}</p>)}
            </Button>
        )}
    </>
  )
}

export default ButtonUpdateItemUI