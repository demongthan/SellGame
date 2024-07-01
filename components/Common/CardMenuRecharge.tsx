import { MenuRechargeItem } from '@/utils/MenuAccount'
import Link from 'next/link'
import React from 'react'

interface Props{
    title:string,
    itemMenus:MenuRechargeItem[],
}

const CardMenuRecharge = ({title, itemMenus}:Props) => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='border-l-4 border-cyan-450 border-solid text-xl text-slate-450 pl-5 py-1'>
            {title}
        </div>
        <div className='flex flex-col gap-3'>
            {itemMenus.map((item, index)=>(
                <div key={index} className='text-slate-450 font-normal text-base border-b border-solid border-slate-150 py-1
                before:content-[""] before:w-[8px] before:h-[8px] before:rounded-[8px] before:opacity:0.6 before:bg-cyan-450 before:mt-2
                before:text-[14px] before:float-left'>
                    <Link className='pl-5' href={item.link}>{item.title}</Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CardMenuRecharge