import { TableShowData, TitleRecharge } from '@/components'
import React from 'react'
import Image from 'next/image'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import { titleTableRecharge_ATMCard } from '@/utils/constant/TitleTableRecharge'

const ATMCard = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp tiền từ ATM'}></TitleRecharge>

        <div className='flex flex-col items-center justify-center gap-5 bg-s2cyan2 p-5'>
            <table className='table-fixed border border-solid border-s2gray6 text-left w-full'>
                <tbody>
                    <tr>
                        <th colSpan={2} className='border-r border-b p-2'>Tên tài khoản: Hoàng Thị Nguyệt</th>
                        <th className='border-b p-2'>Chi nhánh</th>
                    </tr>
                    <tr>
                        <th className='border-r p-2'>ACB</th>
                        <th className='border-r p-2'>40786177</th>
                        <th className='p-2'>Giang Văn Minh</th>
                    </tr>
                </tbody>
            </table>

            <div className='h-1/5 w-[25%]'> 
                <Image src={'https://cdn3.upanh.info/upload/server-sw3/images/image(19).png'} alt={''} 
                width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>

            <div className='w-4/5 text-center'>
                <strong className='block text-s2slate3 pb-3'>Nếu sau 5 phút không được cộng tiền vui lòng liên hệ fanpage: Chăm Sóc Khách Hàng hoặc Hotline 0395.342.442 để được xử lý.</strong>
                <strong className='flex flex-row justify-center text-s2red2 gap-3'>NAP NVN 2958807 <DocumentDuplicateIcon className='w-[1.3rem] h-[1.3rem] text-s2slate3'></DocumentDuplicateIcon></strong>
            </div>
        </div>

        <TableShowData thItems={titleTableRecharge_ATMCard} trItems={[]}></TableShowData>
    </div>
  )
}

export default ATMCard