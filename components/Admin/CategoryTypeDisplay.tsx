import { CategoryType } from '@/utils/types/Enum/CategoryType'

import Image from 'next/image'
import React from 'react'

interface Props{
    categoryType:CategoryType
}

const CategoryTypeDisplay = ({categoryType}:Props) => {
    if(categoryType==CategoryType.Game){
        return (
            <div className='flex flex-row gap-1 w-[8rem]'>
                <Image alt='' src={'/img/IconGame.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Trò chơi</p>
            </div>
        )
    }
    else if(categoryType==CategoryType.Service){
        return (
            <div className='flex flex-row gap-1 w-[8rem]'>
                <Image alt='' src={'/img/IconService.png'} height={40} width={40}></Image>
                <p className='text-blue-400 text-sm font-semibold'>Dịch vụ</p>
            </div>
        )
    }
    else if(categoryType==CategoryType.Status){
        return (
            <div className='flex flex-row gap-1 w-[8rem]'>
                <Image alt='' src={'/img/IconStatus.png'} height={40} width={40}></Image>
                <p className='text-green-400 text-sm font-semibold'>Trạng thái</p>
            </div>
        )
    }
    else if(categoryType==CategoryType.Transaction){
        return (
            <div className='flex flex-row gap-1 w-[8rem]'>
                <Image alt='' src={'/img/IconStatus.png'} height={40} width={40}></Image>
                <p className='text-orange-300 text-sm font-semibold'>Giao dịch</p>
            </div>
        )
    }
}

export default CategoryTypeDisplay