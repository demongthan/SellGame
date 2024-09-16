import React from 'react'
import Image from 'next/image'
import { AccGameDetailType } from '@/utils/constant/AccGameDetail/AccGameDetailType'

interface Props{
    accGameDetailType:AccGameDetailType
}

const AccGameDetailTypeDisplay = ({accGameDetailType}:Props) => {
    if(accGameDetailType==AccGameDetailType.Regular){
        return (
            <div className='flex flex-row gap-2 w-[10rem]'>
                <Image alt='' src={'/img/IconProductRegular.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Thường</p>
            </div>
        )
    }
    else if(accGameDetailType==AccGameDetailType.Hot){
        return (
            <div className='flex flex-row gap-2 w-[10rem]'>
                <Image alt='' src={'/img/IconProductHot.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Hot</p>
            </div>
        )
    }
    else if(accGameDetailType==AccGameDetailType.Limited){
        return (
            <div className='flex flex-row gap-2 w-[10rem]'>
                <Image alt='' src={'/img/IconLimitedPro.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Giới hạn</p>
            </div>
        )
    }
    else if(accGameDetailType==AccGameDetailType.Special){
        return (
            <div className='flex flex-row gap-2 w-[10rem]'>
                <Image alt='' src={'/img/IconSpecial.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Đặc biệt</p>
            </div>
        )
    }
}

export default AccGameDetailTypeDisplay