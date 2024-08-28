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
            <div className='p-8 bg-s2cyan3 w-full'>
                <p style={isOpen?null:paragraphStyle}>
                    {parse(content)}
                </p>
            </div>

            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                event.preventDefault();
                setIsOpen(!isOpen);
            }} className={"bg-white hover:bg-s2cyan1 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"}>
                {isOpen?
                (<div className='flex flex-row font-semibold text-base'><ChevronDoubleUpIcon className='w-[1.5rem] h-[1.5rem]'></ChevronDoubleUpIcon> Thu gọn</div>):
                (<div className='flex flex-row font-semibold text-base'><ChevronDoubleDownIcon className='w-[1.5rem] h-[1.5rem]'></ChevronDoubleDownIcon> Xem tất cả</div>)}
            </Button>
        </div>
    )
}

export default DescriptionDisplay