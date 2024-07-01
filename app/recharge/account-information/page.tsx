import { TitleRecharge } from '@/components'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Thông tin tài khoản'}></TitleRecharge>

        <table className='table-fix'>
            <tbody>
                <tr className='info__row'>
                    <td className='info__row__title'>ID của ban:</td>
                    <td className='flex flex-row info__row__data'>
                        <p>2958807</p>
                        <DocumentDuplicateIcon className='w-[1.3rem] h-[1.3rem]'></DocumentDuplicateIcon>
                    </td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Tên tài khoản:</td>
                    <td className='info__row__data'>Nam Nguyen</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Số dư tài khoản:</td>
                    <td className='info__row__data text-red-650'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Số dư Acoin:</td>
                    <td className='info__row__data text-red-650'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Số tiền dư khuyến mãi:</td>
                    <td className='info__row__data text-red-650'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Mật khẩu:</td>
                    <td className='info__row__data'>*** <Link href={"/"} className='text-red-650'>Đổi mật khẩu</Link></td>
                </tr>
            </tbody>
        </table>

        <div className='flex flex-row gap-5 h-12'>
            
            <input type='text' className='w-11/12 text-black bg-clip-padding border border-solid border-gray-350 rounded px-3
            transition-input ease-in-out delay-150 focus:outline-none focus:border-cyan-450' placeholder='Nhập mã giới thiệu'></input>
            <button className='w-1/12 bg-blue-750 text-white h-full border border-transparent rounded-md px-4'>Gửi</button>
        </div>
    </div>
  )
}

export default page