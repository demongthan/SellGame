import { accountInformationApiRequest } from '@/apiRequests/accountInformation'
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider'
import { ButtonV1UI, InputUI, TitleRecharge } from '@/components'
import { showToast } from '@/utils/showToast'

import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Accountnformation = () => {
    const {userDisplay, changeIsLoadingTotal}= useGlobalState() as GlobalContextProps;

    const [accountInformation, setaccountInformation]=useState<AccountInformationDto>({
        Id:'',
        DisplayName:'',
        Balance:0,
        AcoinBalance:0,
        PromotionalBalance:0
    })

    const getAccountInformationInit =async (): Promise<void>=>{
        changeIsLoadingTotal(true);
        try{
            const res=await accountInformationApiRequest.getAccountInformation(userDisplay?.id);

            setaccountInformation(res.payload.data);

            changeIsLoadingTotal(false);
        }
        catch{
            showToast("error", <p>Lỗi hệ thống. Vui lòng liên hệ Quản trị viên</p>)
            changeIsLoadingTotal(false);
        }
    }

    useEffect(() => {
        getAccountInformationInit();
    }, [setaccountInformation])

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