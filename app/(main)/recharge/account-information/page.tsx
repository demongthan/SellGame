"use client"

import { accountInformationApiRequest } from '@/apiRequests/account-information'
import { ButtonV1UI, InputUI, LoadingUI, TitleRecharge } from '@/components'
import { showToast } from '@/utils/showToast'
import { DecodedToken } from '@/utils/types/DecodedToken';

import jwt from 'jsonwebtoken';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider';

const Accountnformation = () => {
    const [isLoading, setIsLoading]=useState<boolean>(true);
    const { userDisplay, setUser } = useGlobalState() as GlobalContextProps;

    const [accountInformation, setAccountInformation]=useState<AccountInformationDto | undefined>(undefined)

    const getAccountInformationInit =async (): Promise<void>=>{
        try{
            let user:UserDisplay|null;

            if(!userDisplay){
                const response=await fetch('/api/auth',{
                    method: 'GET'
                })
    
                const res= await response.json();
    
                if(res.data){
                    const jwtData=jwt.decode(res.data, { complete: true })?.payload as DecodedToken;
                    
                    user={
                        displayName:jwtData.sub,
                        id:jwtData.jti,
                        role:jwtData.role,
                        token:res.data
                    }
                }
                else{
                    user=null;
                }

                setUser(user);
            }
            else{
                user=userDisplay;
            }

            if(user){
                const resApi=await accountInformationApiRequest.
                getAccountInformation({id:user?.id, fields:"?fileds=DisplayName%2CCode%2CPhone%2CEmail%2CBalance%2CAcoinBalance%2CPromotionalBalance", token:user.token});
                setAccountInformation(resApi.payload.data);
            }

            setIsLoading(false);
        }
        catch(error){
            showToast("error", <p>Lỗi hệ thống. Vui lòng liên hệ Quản trị viên</p>);
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAccountInformationInit();
    }, [setAccountInformation])

  return (
    <div className='flex flex-col gap-10 h-full'>
        <TitleRecharge title={'Thông tin tài khoản'}></TitleRecharge>

        {isLoading?(<LoadingUI></LoadingUI>):(
            <>
            <table className='table-fix'>
                <tbody>
                    <tr className='info__row'>
                        <td className='info__row__title'>ID của ban:</td>
                        <td className='flex flex-row-reverse gap-3 info__row__data'>
                            <p>{accountInformation?.Code}</p>
                            <DocumentDuplicateIcon className='w-[1.3rem] h-[1.3rem]'></DocumentDuplicateIcon>
                        </td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Tên tài khoản:</td>
                        <td className='info__row__data'>{accountInformation?.DisplayName}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Phone:</td>
                        <td className='info__row__data'>{accountInformation?.Phone}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Email:</td>
                        <td className='info__row__data'>{accountInformation?.Email}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Số dư tài khoản:</td>
                        <td className='info__row__data text-s2red2'>{accountInformation?.Balance}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Số dư Acoin:</td>
                        <td className='info__row__data text-s2red2'>{accountInformation?.AcoinBalance}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Số tiền dư khuyến mãi:</td>
                        <td className='info__row__data text-s2red2'>{accountInformation?.PromotionalBalance}</td>
                    </tr>
                    <tr className='info__row'>
                        <td className='info__row__title'>Mật khẩu:</td>
                        <td className='info__row__data'>*** <Link href={"/recharge/change-password"} className='text-s2red2'>Đổi mật khẩu</Link></td>
                    </tr>
                </tbody>
            </table>

            <div className='flex flex-row gap-5 h-12'>
                <InputUI value={undefined} isBlockLabel={false} label={null} classDiv={"w-11/12"} classInput={"w-full"} placeholder={"Nhập mã giới thiệu"}></InputUI>
                <ButtonV1UI title={'Gửi'} className={"w-1/12 h-[2.5rem]"}></ButtonV1UI>
            </div>
            </>
        )}
    </div>
  )
}

export default Accountnformation