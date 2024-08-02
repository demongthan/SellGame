import { MenuRechargeItem } from '@/utils/constant/MenuAccount'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props{
    title:string,
    itemMenus:MenuRechargeItem[],
    url:string
}

const CardMenuRecharge = ({title, itemMenus, url}:Props) => {
    const router = useRouter();
  return (
    <div className='flex flex-col gap-5'>
        <div className='border-l-4 border-s2cyan1 border-solid text-xl text-s2slate1 pl-5 py-1'>
            {title}
        </div>
        <div className='flex flex-col gap-3'>
            {itemMenus.map((item, index)=>(
                <div key={index} className={`${item.link==url?"text-s2cyan1":"text-s2slate1"} font-normal text-base border-b border-solid border-s2slate2 py-1
                before:content-[""] before:w-[8px] before:h-[8px] before:rounded-[8px] before:opacity:0.6 before:bg-s2cyan1 before:mt-2
                before:text-[14px] before:float-left`}>
                    <Link className='pl-5' href={item.link}>{item.title}</Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CardMenuRecharge