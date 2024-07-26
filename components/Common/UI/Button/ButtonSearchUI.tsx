import { Button } from '@headlessui/react'
import { MagnifyingGlassIcon, TableCellsIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    classDiv?:string,
    isSearch?:boolean
    isAll?:boolean,
}

const ButtonSearchUI = ({classDiv="", isSearch=true, isAll=true}:Props) => {
  return (
    <div className={`${(isAll && isSearch)?"flex flex-row":""} ${classDiv} relative gap-3`}>
        {isSearch && (
            <Button type='submit' className='flex flex-row gap-1 items-center w-full h-full bg-s2cyan1 text-white border border-transparent rounded-md px-4 hover:opacity-60 transition-input ease-in-out delay-150'>
                <MagnifyingGlassIcon className='w-[1.2rem] h-[1.2rem]'></MagnifyingGlassIcon> Tìm kiếm
            </Button>
        )}
        
        {isAll && (
            <Button className='flex flex-row gap-1 items-center w-full h-full bg-s2red2 text-white border border-transparent rounded-md px-4 hover:opacity-60 transition-input ease-in-out delay-150'>
                <TableCellsIcon className='w-[1.2rem] h-[1.2rem]'></TableCellsIcon> Tất cả
            </Button>
        )}
    </div>
  )
}

export default ButtonSearchUI