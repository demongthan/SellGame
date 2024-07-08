'use client'

import { ButtonV1UI, ContentBannerSlide } from '@/components'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const PayAccount = () => {
    const imgUrls:string[]=[
        "https://cdn.upanh.info/storage/upload/images/Banner%20shop/banner-nickvn-1%20(1).jpg",
        "https://cdn.upanh.info/storage/upload/images/Banner%20shop/banner-nickvn-2%20(2).jpg",
        "https://cdn.upanh.info/storage/upload/images/Banner%20shop/banner-nickvn-1%20(3).jpg"
    ]

  return (
    <div className='flex flex-col gap-10 w-full float-none overflow-hidden'>
        <div className='flex flex-row gap-5'>
            <div className='flex flex-col'>
                <ContentBannerSlide className={"w-1/2 h-[20rem]"}></ContentBannerSlide>

                <div className='flex flex-row'>
                    
                </div>
            </div>

            <div className='flex flex-col w-1/2 gap-3'>
                <div className='bg-s2cyan1 text-white p-3'>
                    <strong className='text-2xl'>Mã số: #YTT83</strong><br></br>
                    <strong>Danh mục: Bán acc roblox</strong>
                </div>

                <table className='table-fixed border'>
                    <thead>
                        <tr className='bg-s2blue3 text-base leading-6'>
                            <th className='text-left p-3'>Thẻ cào <br></br> <strong>80.000 Card</strong></th>
                            <th className='p-3'>Hoặc</th>
                            <th className='text-right p-3'>ATM <br></br> <strong>80000 ATM</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-black border-b'>
                            <td rowSpan={2} className='p-3 flex flex-row'><ChevronRightIcon className='w-[1.2rem] h-[1.2rem]'></ChevronRightIcon> <span className='inline-block'>Game</span></td>
                            <td>Blox Fruits</td>
                        </tr>
                        <tr className='text-black'>
                            <td rowSpan={2} className='p-3 flex flex-row'><ChevronRightIcon className='w-[1.2rem] h-[1.2rem]'></ChevronRightIcon> <span className='inline-block'>Game</span></td>
                            <td>Blox Fruits</td>
                        </tr>
                    </tbody>
                </table>

                <ButtonV1UI className={"flex items-center justify-center w-full h-[2.5rem] bg-s2cyan1"} title='Mua ngay' isIconCard={true}></ButtonV1UI>

                <div className='flex flex-row gap-5'>
                    <ButtonV1UI className={"w-1/2 h-[2.5rem] bg-s2green1"} title={'ATM - Ví điện tử'}></ButtonV1UI>
                    <ButtonV1UI className={"w-1/2 h-[2.5rem] bg-s2green1"} title={'Nạp thẻ cào'}></ButtonV1UI>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PayAccount