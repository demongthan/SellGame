"use client"

import { ButtonV1UI, InputUI, LoadingUI, TitleRecharge } from '@/components'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

const ChangePassword = () => {
  const [errArr, setErrArr]=useState<ErrorValidate[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errAction, setErrAction] = useState<string |null>(null);

  
  const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true);
    setErrArr([]);
    setErrAction(null);

    try{
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/change-password', {
          method: 'POST',
          body: formData,
      })

      const data = await response.json();

      if(data.isSuccess){
        

      }
      else{
        const errorArr: ErrorValidate[] =data.data.map(({...item})=>({
            for:item.for,
            message: item.message
        }))

        setErrArr(errorArr);
      }

      setIsLoading(false);
    }
    catch(error){
      setErrAction("Lỗi Server. Vui lòng liên hệ Quản trị viên.");
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [setIsLoading])

  return (
    <div className='flex flex-col gap-10 h-full'>
      <TitleRecharge title={'Đổi mật khẩu'}></TitleRecharge>

      {isLoading?(<LoadingUI></LoadingUI>):(
        <>
          <form className="space-y-6 w-1/2" onSubmit={onSubmit}>
            <InputUI 
            value={undefined} 
            isBlockLabel={true} 
            label={"Mật khẩu"} 
            placeholder={"Nhập mật khẩu"}
            classInput={"w-full"}
            name='oldPassword'
            errArr={errArr?.filter((error)=>error.for==="oldPassword")} 
            max={15}
            type='password'>
            </InputUI>

            <InputUI 
            value={undefined} 
            isBlockLabel={true} 
            label={"Mật khẩu mới"}
            classInput={"w-full"} 
            placeholder={"Nhập mật khẩu mới"}
            name='password'
            errArr={errArr?.filter((error)=>error.for==="password")} 
            max={15}
            type='password'>
            </InputUI>

            <InputUI 
            value={undefined} 
            isBlockLabel={true} 
            label={"Xác nhận mật khẩu mới"}
            classInput={"w-full"} 
            placeholder={"Xác nhận mật khẩu mới"}
            name='confirmPassword'
            errArr={errArr?.filter((error)=>error.for==="confirmPassword")} 
            max={15}
            type='password'>
            </InputUI>

            <div>
              {errAction && (<p className='text-lg text-center text-red-500'>
                <ExclamationTriangleIcon className='h-[1.5rem] w-[1.5rem] inline-block'></ExclamationTriangleIcon>
                {errAction}
              </p>)}
              <ButtonV1UI type='submit' title={'Xác nhận'} className={"w-full h-[2.5rem]"}></ButtonV1UI>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default ChangePassword