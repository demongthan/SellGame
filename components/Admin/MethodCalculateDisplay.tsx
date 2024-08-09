import { MethodCalculate } from '@/utils/types/MethodCalculate'

import Image from 'next/image'
import React from 'react'

interface Props{
    methodCalculate:MethodCalculate
}

const MethodCalculateDisplay = ({methodCalculate}:Props) => {
    if(methodCalculate==MethodCalculate.Input){
        return (
            <div className='flex flex-row gap-1 w-[9rem]'>
                <Image alt='' src={'/img/IconInput.png'} height={20} width={20}></Image>
                <p className='text-cyan-300 text-sm font-semibold flex justify-center items-center'>Nhập</p>
            </div>
        )
    }
    else if(methodCalculate==MethodCalculate.InputCoefficient){
        return (
            <div className='flex flex-row gap-1 w-[9rem]'>
                <Image alt='' src={'/img/IconInputA.png'} height={20} width={20}></Image>
                <p className='text-blue-400 text-sm font-semibold'>Nhập, Hệ số</p>
            </div>
        )
    }
    else if(methodCalculate==MethodCalculate.InputSelectCoefficient){
        return (
            <div className='flex flex-row gap-1 w-[9rem]'>
                <Image alt='' src={'/img/IconSelect.png'} height={20} width={20}></Image>
                <p className='text-green-400 text-sm font-semibold'>Nhập, Chọn hệ số</p>
            </div>
        )
    }
    else if(methodCalculate==MethodCalculate.Select){
        return (
            <div className='flex flex-row gap-1 w-[9rem]'>
                <Image alt='' src={'/img/IconSelectA.png'} height={20} width={20}></Image>
                <p className='text-orange-300 text-sm font-semibold'>Chọn giá</p>
            </div>
        )
    }
}

export default MethodCalculateDisplay