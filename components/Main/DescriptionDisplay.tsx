"use client"

import { Button } from '@headlessui/react'
import React, { useState } from 'react'
import parse from 'html-react-parser';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/20/solid';

interface Props{
    content:string
}

const  paragraphStyle:any={
    WebkitLineClamp:5,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    display:'-webkit-box',
}

const DescriptionDisplay = ({content}:Props) => {
    const [isOpen, setIsOpen]=useState<boolean>(false);

    return (
        <div id="Description" className='w-full flex flex-col justify-center items-center gap-4'>
            <div className='p-8 bg-blue-100 w-full rounded-md'>
                <p style={isOpen?null:paragraphStyle}>
                    {parse(content)}
                </p>
            </div>

            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                event.preventDefault();
                setIsOpen(!isOpen);
            }} className={"rounded-lg bg-white hover:bg-s2cyan3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-s2cyan1 focus:ring-offset-2 transition-all"}>
                {isOpen?
                (<div className='flex flex-row font-semibold text-sm'><ChevronDoubleUpIcon className='w-[1.0rem] h-[1.0rem] mt-[3px]'></ChevronDoubleUpIcon> Thu gọn</div>):
                (<div className='flex flex-row font-semibold text-sm'><ChevronDoubleDownIcon className='w-[1.0rem] h-[1.0rem] mt-[3px]'></ChevronDoubleDownIcon> Xem tất cả</div>)}
            </Button>
        </div>
    )
}

export default DescriptionDisplay