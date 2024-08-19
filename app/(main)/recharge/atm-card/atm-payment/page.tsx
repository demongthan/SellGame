"use client"

import { TitleRecharge } from '@/components'
import LoadingUI from '@/components/Common/LoadingUI';
import { Button } from '@headlessui/react';
import { DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import ButtonV2UI from '@/components/Common/UI/Button/ButtonV2UI';

const ATMPayment = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
    }

    return (
        <div className='flex flex-col gap-10 h-[50vh]'>
            <TitleRecharge title={'Nạp tiền từ ATM/MOMO'}></TitleRecharge>

            <form className="flex flex-row w-full gap-10 font-base" onSubmit={onSubmit}>
                <div className='flex flex-col gap-3 w-1/2'>
                    <div className='flex flex-row border-b border-gray-200 pb-2'>
                        <Image alt='' src={"https://api.vietqr.io/img/MB.png"} width={0} height={0} sizes="100vw" style={{ width: '30%', height: '100%' }}></Image>
                        <div>
                            <span className='block font-semibold text-gray-500'>Ngân hàng</span>
                            <span className='font-bold'>Ngân hàng TMCP Quân đội</span>
                        </div>
                    </div>

                    <div className='border-b border-gray-200 pb-2'>
                        <span className='block font-semibold text-gray-500'>Tên tài khoản</span>
                        <span className='font-bold'>NGUYỄN VĂN NAM</span>
                    </div>

                    <div className='border-b border-gray-200 pb-2'>
                        <span className='font-semibold text-gray-500'>Số tài khoản</span>
                        <div className='flex flex-row gap-2'>
                            <span className='font-bold w-4/5'>1111</span>
                            <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                        </div>
                    </div>

                    <div className='border-b border-gray-200 pb-2'>
                        <span className='font-semibold text-gray-500'>Số tiền</span>
                        <div className='flex flex-row gap-2'>
                            <span className='font-bold w-4/5'>{(12000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                            <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                        </div>
                    </div>

                    <div className='border-b border-gray-200 pb-2'>
                        <span className='font-semibold text-gray-500'>Nội dung</span>
                        <div className='flex flex-row'>
                            <span className='font-bold w-4/5'>Thanh toán</span>
                            <Button className={`rounded-md w-1/5 px-3 py-1 -mt-2 border border-transparent font-semibold text-white bg-s2cyan1 hover:bg-blue-600 focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm`}>Sao chép</Button>
                        </div>
                    </div>

                    <div className='mt-3 flex flex-row gap-5'>
                        <ButtonV2UI title={'Hủy bỏ'}></ButtonV2UI>
                        <ButtonV2UI title={'Xác nhận'}></ButtonV2UI>
                    </div>

                    <div className='text-center pt-5'>
                        <strong className='text-s2slate3'>Vui lòng nhấn Xác nhận để hoàn thành giao dịch sau khi bạn hoàn thành chuyển khoản. </strong>
                        <strong className='block text-s2slate3'>Hotline 0395.342.442</strong>
                        <strong className='block text-s2slate3'>Nếu có bất kì vấn đề phát sinh, hãy liên hệ với chúng tôi</strong>
                    </div>
                </div>

                <div className='w-1/2 h-4/5 -mt-12'>
                    <Image alt='' src={'https://img.vietqr.io/image/vietinbank-113366668888-compact.jpg?amount=790000&addInfo=dong%20gop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid'} 
                    width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                </div>
            </form>
        </div>
    )
}

export default ATMPayment