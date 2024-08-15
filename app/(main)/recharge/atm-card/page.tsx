"use client"

import { ButtonV2UI, InputUI, TitleRecharge } from '@/components'
import React, { useState } from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import { isNullOrEmpty } from '@/utils/utils';
import { useRouter } from 'next/navigation';

const ATMCard = () => {
    const valueMoney:number[]=[10000,20000,50000,100000,200000,500000,1000000,2000000];
    const [money, setMoney]=useState<number>(10000)
    const router = useRouter();

    const eventButtonMoneyClicked=(value:number)=>(event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setMoney(value);
    }

    const handleChange=(e:any) => {
        if (/^\d*\.?\d*$/.test(e.target.value.replaceAll(",", ""))) {
            setMoney(Number(e.target.value.replaceAll(",", "")));
        }
    }

    const handleBlur=(e:any) => {
        if(isNullOrEmpty(e.target.value)){
            setMoney(10000)
        }
    }

    const processPayment=async (): Promise<void> => {
        console.log("11111")
        try{
            const response = await fetch('/api/recharge/atm-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: money, 
                    orderInfo: 'Thanh toán đơn hàng #123',
                }),
            });

            const data = await response.json();
            if (data.redirectUrl) {
                router.push(data.redirectUrl);
            }
        }
        catch(error){
            console.error(error);
        }
    }

    const eventButtonPaymentClicked=(event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();

        console.log("111")
        processPayment();
    }

  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp tiền từ ATM'}></TitleRecharge>

        <div className='flex flex-col items-center justify-center gap-10 p-5 h-[70vh]'>
            <table className='table-fixed border border-solid border-s2gray6 text-left w-1/2'>
                <tbody>
                    <tr>
                        <th className='border-r border-b p-2'>Số tiền thanh toán</th>
                        <th className='border-b p-2'>Số tiền thực nhận</th>
                    </tr>
                    <tr>
                        <th className='border-r p-2'>{money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</th>
                        <th className='p-2'>{money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</th>
                    </tr>
                </tbody>
            </table>

            <div className='flex flex-col w-1/2 gap-6'>
                <div>
                    <InputUI value={money.toLocaleString('en')} isBlockLabel={true} label={"Nhập số tiền cần mua"}
                    classDiv={"w-full"} classInput={"w-[90%] text-right font-semibold"} onChangeEvent={handleChange} onBlurEvent={handleBlur}
                    unit='VND' classUint='w-[10%] text-s2cyan1' classDivUnit='w-full'></InputUI>

                    <span className='text-xs'>Số tiền thanh toán ít nhất
                        <strong> {(10000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
                    </span>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                    {valueMoney.map((value, index)=>(
                        <ButtonV2UI key={index} title={value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        eventClickButton={eventButtonMoneyClicked(value)}
                        className='bg-s2yellow1'
                        ></ButtonV2UI>
                    ))}
                </div>

                <ButtonV2UI title='Thanh toán' eventClickButton={eventButtonPaymentClicked}></ButtonV2UI>
            </div>

            <div className='w-4/5 text-center'>
                <strong className='block text-s2slate3 pb-3'>Nếu sau 5 phút không được cộng tiền vui lòng liên hệ fanpage: 
                    Chăm Sóc Khách Hàng hoặc Hotline 0395.342.442 để được xử lý.</strong>
                <strong className='flex flex-row justify-center text-s2red2 gap-3'>NAP NVN 2958807 <DocumentDuplicateIcon className='w-[1.3rem] h-[1.3rem] text-s2slate3'></DocumentDuplicateIcon></strong>
            </div>
        </div>
    </div>
  )
}

export default ATMCard