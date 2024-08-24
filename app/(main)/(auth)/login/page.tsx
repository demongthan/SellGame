"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'

import { InputUI, ButtonV1UI, LoadingUI } from '@/components';
import { authApiRequest } from '@/apiRequests/auth';
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider';
import {ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { showToast } from '@/utils/showToast';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '@/utils/types/DecodedToken';
import { UserRole } from '@/utils/types/UserRole';
import { Button } from '@headlessui/react';
import { TokenCookies } from '@/utils/types/TokenCookies';

const Login = () => {
    const router = useRouter();
    const { setUser } = useGlobalState() as GlobalContextProps;
    const [errArr, setErrArr]=useState<ErrorValidate[]>();
    const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);
    const [errAction, setErrAction] = useState<string |null>(null);
    const [rememberAccount, setRememberAccount]=useState<boolean>(true);
    const [userName, setUserName]=useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoadingPopup(true);
        setErrArr([]);
        setErrAction(null);

        try{
            const formData = new FormData(event.currentTarget)

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: formData,
            })
    
            const data = await response.json();
    
            if(data.isSuccess){
                const result = await authApiRequest.login(data.data);

                if(result.payload.data){
                    const jwtData=jwt.decode(result.payload.data.Token, { complete: true })?.payload as DecodedToken;
    
                    const tokenCookie:TokenCookies={
                        accessToken: result.payload.data.Token,
                        expiresAt: jwtData.exp,
                        refreshToken:result.payload.data.RefreshToken,
                        role:jwtData.role
                    }
        
                    await fetch('/api/auth',{
                        method: 'POST',
                        body:JSON.stringify(tokenCookie)
                    })
                    
                    const userDisplay:UserDisplay={
                        displayName:jwtData.sub,
                        id:jwtData.jti,
                        role:jwtData.role,
                        token:result.payload.data.Token
                    }
        
                    setUser(userDisplay);

                    if(userDisplay.role==UserRole.Admin){
                        router.push('/dashboard');
                    }
                    else{
                        router.push('/');
                    }
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
            setErrAction("Lỗi Server. Vui lòng liên hệ Quản trị viên.");
            console.log(error);
            setIsLoadingPopup(false);
        }

    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "remember":
                setRememberAccount(!rememberAccount);
                break;
            case "userName":
                setUserName(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const getDataUserInit=async ():Promise<void>=>{
        setIsLoading(true);
        try{
            const res= await fetch('/api/auth/login', {
                method: 'GET'
            })
    
            const data=await res.json();
            setUserName(data.data.userName);
            setPassword(data.data.password);
            setRememberAccount(data.data.remember=="on");

            if(data.isSuccess){
                const result = await authApiRequest.loginGoogle(data.dataLogin);

                if(result.payload.data){
                    const jwtData=jwt.decode(result.payload.data.Token, { complete: true })?.payload as DecodedToken;
    
                    const tokenCookie:TokenCookies={
                        accessToken: result.payload.data.Token,
                        expiresAt: jwtData.exp,
                        refreshToken:result.payload.data.RefreshToken,
                        role:jwtData.role
                    }
        
                    await fetch('/api/auth',{
                        method: 'POST',
                        body:JSON.stringify(tokenCookie)
                    })
                    
                    const userDisplay:UserDisplay={
                        displayName:jwtData.sub,
                        id:jwtData.jti,
                        role:jwtData.role
                    }
        
                    setUser(userDisplay);

                    if(userDisplay.role==UserRole.Admin){
                        router.push('/dashboard');
                    }
                    else{
                        router.push('/');
                    }
                }
                else{
                    setErrAction(result.payload.message);
                    setIsLoading(false);
                }
            }
            else{
                setErrArr([]);
                setIsLoading(false);
            }
        }
        catch(error){
            showToast("error", <p>Lỗi hệ thống. Vui lòng liên hệ Quản trị viên</p>)
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        getDataUserInit();
    }, [setUserName])

  return (
    <div className="flex flex-col h-[85vh] items-center justify-center px-6 mx-auto">
        {isLoading?(<LoadingUI></LoadingUI>):(
            <>
                <div className="w-[30%] bg-white rounded-lg shadow border border-gray-700 relative">
                    {isLoadingPopup &&(
                        <div className='w-full h-full flex items-center justify-center bg-s2gray7 absolute top-0'>
                            <span className='loader'></span>
                        </div>
                    )}    

                    <div className="p-6 space-y-4">
                        <h1 className="text-4xl font-bold text-center leading-tight tracking-tight text-gray-900">
                            Đăng nhập
                        </h1>

                        <form className="space-y-4" onSubmit={onSubmit}>
                            <InputUI value={userName} 
                                    isBlockLabel={true} 
                                    label={"Tài Khoản"} 
                                    classDiv='w-full' 
                                    classInput='w-full'
                                    name='userName'
                                    max={256}
                                    errArr={errArr?.filter((error)=>error.for==="userName")} 
                                    onChangeEvent={handleChange("userName")}
                            ></InputUI>

                            <InputUI 
                                    value={password} 
                                    isBlockLabel={true} 
                                    label={"Mật khẩu"} 
                                    classDiv='w-full' 
                                    classInput='w-full'
                                    name='password'
                                    max={15}
                                    errArr={errArr?.filter((error)=>error.for==="password")}
                                    type='password'
                                    onChangeEvent={handleChange("password")}
                            ></InputUI>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" name="remember" checked={rememberAccount} onChange={handleChange("remember")} aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "/>
                                    </div>

                                    <div className="ml-3 text-sm">
                                        <label htmlFor='remember' className="text-black">Nhớ tài khoản</label>
                                    </div>
                                </div>

                                <Link href="/login/forget-password" className="text-sm font-medium text-s2blue1 hover:underline">Quên mật khẩu?</Link>
                            </div>

                            {errAction && (<p className='text-lg text-center text-red-500'>
                                <ExclamationTriangleIcon className='h-[1.5rem] w-[1.5rem] inline-block'></ExclamationTriangleIcon>
                                {errAction}
                            </p>)}
                            <ButtonV1UI type='submit' className={"flex items-center justify-center w-full h-[2.5rem] bg-s2cyan1"} title='Đăng nhập' isIconCard={false}></ButtonV1UI>

                            <div className='flex justify-center items-center'>
                                <p className='border w-[45%] inline-block'></p>
                                <p className='inline-block w-[10%] text-center'>Hoặc</p>
                                <p className='border w-[45%] inline-block'></p>
                            </div>

                            <div className='flex flex-row justify-center items-center gap-3'>
                                <Button className={"hover:cursor-pointer"} 
                                onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                    event.preventDefault();
                                    setIsLoading(true);
                                    signIn("google");
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                </Button>

                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                    <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='h-[20vh]'>

                </div>
            </>
        )}
        
    </div>
  )
}

export default Login