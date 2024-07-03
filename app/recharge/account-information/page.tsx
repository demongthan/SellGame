import { ButtonV1UI, InputUI, TitleRecharge } from '@/components'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

const Accountnformation = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Thông tin tài khoản'}></TitleRecharge>

        <table className='table-fix'>
            <tbody>
                <tr className='info__row'>
                    <td className='info__row__title'>ID của ban:</td>
                    <td className='flex flex-row gap-3 info__row__data'>
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
                    <td className='info__row__data text-s2red2'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Số dư Acoin:</td>
                    <td className='info__row__data text-s2red2'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Số tiền dư khuyến mãi:</td>
                    <td className='info__row__data text-s2red2'>0</td>
                </tr>
                <tr className='info__row'>
                    <td className='info__row__title'>Mật khẩu:</td>
                    <td className='info__row__data'>*** <Link href={"/"} className='text-s2red2'>Đổi mật khẩu</Link></td>
                </tr>
            </tbody>
        </table>

        <div className='flex flex-row gap-5 h-12'>
            <InputUI value={undefined} isBlockLabel={false} label={null} classDiv={"w-11/12"} classInput={"w-full"} placeholder={"Nhập mã giới thiệu"}></InputUI>
            <ButtonV1UI title={'Gửi'} className={"w-1/12"}></ButtonV1UI>
        </div>
    </div>
  )
}

export default Accountnformation