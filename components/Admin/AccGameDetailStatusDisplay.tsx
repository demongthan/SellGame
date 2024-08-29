import { AccGameDetailStatus } from '@/utils/constant/AccGameDetailStatus'

import React from 'react'
import Image from 'next/image'

interface Props{
    accGameDetailStatus:AccGameDetailStatus
}

const AccGameDetailStatusDisplay = ({accGameDetailStatus}:Props) => {
    if(accGameDetailStatus==AccGameDetailStatus.Free){
        return (
            <div className='flex flex-row gap-1 w-[10rem]'>
                <Image alt='' src={'/img/IconFree.png'} height={40} width={40}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Chưa bán</p>
            </div>
        )
    }
    else if(accGameDetailStatus==AccGameDetailStatus.Sold){
        return (
            <div className='flex flex-row gap-1 w-[10rem]'>
                <Image alt='' src={'/img/IconSold.png'} height={40} width={40}></Image>
                <p className='text-red-300 text-sm font-semibold flex justify-center items-center'>Đã bán</p>
            </div>
        )
    }
    else if(accGameDetailStatus==AccGameDetailStatus.Deposit){
        return (
            <div className='flex flex-row gap-1 w-[10rem]'>
                <Image alt='' src={'/img/IconDeposit.png'} height={40} width={40}></Image>
                <p className='text-blue-300 text-sm font-semibold flex justify-center items-center'>Đặt cọc</p>
            </div>
        )
    }
}

export default AccGameDetailStatusDisplay