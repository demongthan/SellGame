"use client"

import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider';
import { ButtonV2UI, CountdownTimer, LoadingUI, TitleRecharge } from '@/components'
import { generateRandomUppercaseString } from '@/utils/utils';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@headlessui/react';
import { transactionHistoryBakingApiRequest } from '@/apiRequests/transaction-history-banking';
import { TransactionStatus } from '@/utils/constant/Transaction/TransactionStatus';
import { showToast } from '@/utils/showToast';

const MoMoPayment = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const params = useSearchParams();
    const date = moment(new Date()).format('YYYYMMDDHHmm');

    const amount:any= params.get("amount"); 
    const [code] =useState<string>(`MOMOR${generateRandomUppercaseString(5)}${date}`);
    const [linkQRCode] =useState<string>(`https://res.cloudinary.com/namnv57fpt/image/upload/v1724666043/EndSars/NamNV57/fbr115shuwsjrvb1xdg4.jpg`);
    
    const { userDisplay, setUser } = useGlobalState() as GlobalContextProps;

    const processPayment=async (): Promise<void> => {
        try{
            const dataRequest:any={
                amount:amount, 
                code:code, 
                bankCodeName:"MOMO_NGUYEN VAN NAM", 
                bankSubAccId:"0399161228",
                bankName:"BVBank – Ngân hàng TMCP Bản Việt"
            }

            const response = await fetch('/api/recharge/atm-card/momo-payment', {
                method: 'POST',
                body: JSON.stringify(dataRequest),
            })

            const data = await response.json();

            if(data.isSuccess){
                const result = await transactionHistoryBakingApiRequest.createTransactionHistoryBanking({idUser:userDisplay?.id, body:data.data, token:userDisplay?.token});

                if(result.payload.data){
                    if(data.data.Status==TransactionStatus.Success){
                        router.push('/recharge/atm-card/payment-result?status=success');
                    }
                    else{
                        router.push('/recharge/atm-card/payment-result?status=fail');
                    }
                }
                else{
                    showToast("error", <p>{result.payload.message}</p>);
                }
            }
        }
        catch(err){
            console.log(err);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
        }
    }


    useEffect(() => {
        let timeoutId=setTimeout(()=>{
            setIsLoading(false);
        }, 500)

        const intervalId = setInterval(processPayment, 3000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    });

    return (
        <div className='flex flex-col gap-10 h-full'>
            <TitleRecharge title={'Nạp tiền từ MOMO'}></TitleRecharge>

            {isLoading?(<LoadingUI></LoadingUI>):(
                <form className="flex flex-row w-full gap-10 font-base">
                    <div className='flex flex-col gap-3 w-1/2'>
                        <CountdownTimer time={180} eventEndOfTime={()=>{router.push("/recharge/atm-card")} }></CountdownTimer>

                        <div className='border-b border-gray-200 pb-2'>
                            <span className='block font-semibold text-gray-500'>Chủ tài khoản</span>
                            <span className='font-bold'>NGUYEN VAN NAM</span>
                        </div>

                        <div className='border-b border-gray-200 pb-2'>
                            <span className='font-semibold text-gray-500'>Số MoMo</span>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold w-4/5'>0399161228</span>
                                <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                            </div>
                        </div>

                        <div className='border-b border-gray-200 pb-2'>
                            <span className='font-semibold text-gray-500'>Số tiền</span>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold w-4/5'>{Number(amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                            </div>
                        </div>

                        <div className='border-b border-gray-200 pb-2'>
                            <span className='font-semibold text-gray-500'>Nội dung</span>
                            <div className='flex flex-row'>
                                <span className='font-bold w-4/5'>{code}</span>
                                <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                            </div>
                        </div>

                        <div className='mt-3 flex flex-row gap-5'>
                            <ButtonV2UI title={'Hủy bỏ'}></ButtonV2UI>
                        </div>

                        <div className='text-center pt-5'>
                            <strong className='text-s2slate3'>Vui lòng nhấn Xác nhận để hoàn thành giao dịch sau khi bạn hoàn thành chuyển khoản. </strong>
                            <strong className='block text-s2slate3'>Hotline 0395.342.442</strong>
                            <strong className='block text-s2slate3'>Nếu có bất kì vấn đề phát sinh, hãy liên hệ với chúng tôi</strong>
                        </div>
                    </div>

                    <div className='w-1/2 h-full -mt-12'>
                        <Image alt='' src={linkQRCode} 
                        width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                    </div>
                </form>
            )}
        </div>
    )
}

export default MoMoPayment