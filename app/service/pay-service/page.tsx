import TitleService from '@/components/Common/TitleService'
import React from 'react'
import Image from "next/image";
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { ButtonV1UI, InputUI } from '@/components';

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleService title={'Dịch vụ ROBOX 120H GamePass'}></TitleService>

        <div className='flex flex-row gap-10 h-[12rem]'>
            <div className='w-1/4'>
                <Image src={"https://cdn3.upanh.info/upload/server-sw3/images/service/30.png"} 
                alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                <div className='pt-3'>
                    <CalendarDaysIcon className='w-[1.5rem] h-[1.5rem] inline-block'></CalendarDaysIcon>
                    <strong className='pl-3 relative top-1'>Robux 120h Gamepass</strong>
                </div>  
            </div>

            <div className='flex flex-col w-[37.5%] gap-5'>
                <div>
                    <InputUI value={undefined} isBlockLabel={true} label={"Nhập số tiền cần mua"}
                    classDiv={"w-full"} classInput={"w-full"}></InputUI>
                    <span className='text-sm'>Số tiền thanh toán phải từ <strong>10.000đ</strong> đến <strong>500.000đ</strong></span>
                </div>

                <InputUI value={undefined} isBlockLabel={true} label={"Hệ số"} classDiv='w-full' classInput='w-full'></InputUI>
            </div>

            <div className='flex flex-col w-[37.5%] gap-5'>
                <div className='w-full h-[4rem] bg-s2red4 text-lg font-semibold text-white rounded-md flex justify-center items-center'><span>Tổng: 85 Rox</span></div>
                <ButtonV1UI className={"flex items-center justify-center w-full h-[4rem] bg-s2cyan1"} title='Mua ngay' isIconCard={true}></ButtonV1UI>
            </div>
        </div>

        <div className='border-t mt-5 pt-5'>
            <p className='text-2xl font-semibold'>Mô tả</p>
        </div>

        <div>
            <TitleService title={'Dịch vụ khác'}></TitleService>
        </div>
    </div>
  )
}

export default page