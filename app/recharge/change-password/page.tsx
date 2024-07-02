import { TitleRecharge } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Đổi mật khẩu'}></TitleRecharge>
        
        <form className="space-y-6 w-1/2" action="#" method="POST">
            <div>
                <label htmlFor="password" className="block text-base text-black font-semibold leading-6">Mật khẩu</label>
                <div className="mt-2">
                    <input type='text' className='w-full h-9 text-black bg-clip-padding border border-solid border-gray-350 rounded px-3
                    transition-input ease-in-out delay-150 focus:outline-none focus:border-cyan-450' placeholder='Nhập mật khẩu'></input>
                </div>
            </div>

            <div>
                <label htmlFor="newpassword" className="block text-base text-black font-semibold leading-6">Mật khẩu mới</label>
                <div className="mt-2">
                    <input type='password' className='w-full h-9 text-black bg-clip-padding border border-solid border-gray-350 rounded px-3
                    transition-input ease-in-out delay-150 focus:outline-none focus:border-cyan-450' placeholder='Nhập mật khẩu mới'></input>
                </div>
            </div>

            <div>
                <label htmlFor="newpassword" className="block text-base text-black font-semibold leading-6">Xác nhận mật khẩu mới</label>
                <div className="mt-2">
                    <input type='password' className='w-full h-9 text-black bg-clip-padding border border-solid border-gray-350 rounded px-3
                    transition-input ease-in-out delay-150 focus:outline-none focus:border-cyan-450' placeholder='Xác mật khẩu mới'></input>
                </div>
            </div>

            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-650 px-3 py-1.5 text-sm font-semibold leading-6 
                text-white shadow-sm hover:bg-cyan-450 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Xác nhận</button>
            </div>
        </form>
    </div>
  )
}

export default page