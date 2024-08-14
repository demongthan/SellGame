"use client"

import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { InputUI, LoadingUI } from '@/components';
import { Button } from '@headlessui/react';
import { authApiRequest } from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

const ForgetPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [errAction, setErrAction] = useState<string |null>(null);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoadingPopup(true);
        setErrArr([]);
        setErrAction(null);

        try{
            const formData = new FormData(event.currentTarget)

            const response = await fetch('/api/auth/login/forget-password', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json();

            if(data.isSuccess){
                const result = await authApiRequest.forgetPassword(data.data);

                if(result.payload.data){
                    router.push('/login');
                }
                else{
                    setIsLoadingPopup(false);
                    setErrAction(result.payload.message);
                }
            }
            else{
                const errorArr: ErrorValidate[] =data.data.map(({...item})=>({
                    for:item.for,
                    message: item.message
                }))
        
                setErrArr(errorArr);
                setIsLoadingPopup(false);
            }
        }
        catch(error){
            console.error(error);
            setErrAction("Lỗi Server. Vui lòng liên hệ Quản trị viên.");
            setIsLoadingPopup(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 250);
    }, [setIsLoading])

    return (
        <div className="flex flex-col h-[85vh] items-center px-6 mx-auto">
            {isLoading?(<LoadingUI></LoadingUI>):(
                <>
                    <div className="mt-7 bg-white  rounded-xl shadow-lg border-2 border-indigo-300 w-[25rem] relative">
                        {isLoadingPopup &&(
                            <div className='w-full h-full flex items-center justify-center bg-s2gray7 absolute top-0'>
                                <span className='loader'></span>
                            </div>
                        )}  
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800">Quên mật khẩu?</h1>
                                <p className="mt-4 text-sm text-gray-600">
                                    Nhớ mật khẩu của bạn?
                                    <Link className="text-blue-600 decoration-2 hover:underline font-medium pl-1" href="/login">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-5">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <p className="text-base text-center mb-4">Vui lòng nhập email đăng kí. Chúng tôi sẽ gửi mật khẩu mới qua email!</p>
                                            <InputUI label={"Email"} name='Email' errArr={errArr?.filter((error)=>error.for==="email")} ></InputUI>
                                        </div>

                                        {errAction && (<p className='text-base font-semibold text-center text-red-500'>
                                            <ExclamationTriangleIcon className='h-[1.5rem] w-[1.5rem] inline-block -mt-[6px]'></ExclamationTriangleIcon>
                                            {errAction}
                                        </p>)}

                                        <Button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border 
                                        border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 
                                        focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">Đặt lại mật khẩu</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ForgetPassword