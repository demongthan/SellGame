"use client"

import { accountInformationApiRequest } from '@/apiRequests/accountInformation';
import { GlobalContextProps, useGlobalState } from '@/AppProvider/GlobalProvider';
import { ButtonV1UI, InputUI, LoadingUI, TitleRecharge } from '@/components'
import { showToast } from '@/utils/showToast';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React, { FormEvent, useEffect, useState } from 'react'

const ChangePassword = () => {
  const { userDisplay } = useGlobalState() as GlobalContextProps;

  const [errArr, setErrArr]=useState<ErrorValidate[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true);
    setErrArr([]);

    try{
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/change-password', {
          method: 'POST',
          body: formData,
      })

      const data = await response.json();

      if(data.isSuccess){
        const result = await accountInformationApiRequest.changePassword({id:userDisplay?.id, body:data.data});

        if(result.payload.data){
          showToast("success", <p>{result.payload.message}</p>)
        }
        else{
          showToast("error", <p>{result.payload.message}</p>)
        }

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
      showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
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
              <ButtonV1UI type='submit' title={'Xác nhận'} className={"w-full h-[2.5rem]"}></ButtonV1UI>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default ChangePassword