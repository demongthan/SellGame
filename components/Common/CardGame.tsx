import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CardGame = () => {
  return (
    <div className='flex flex-col border divide-solid border-[#ccc] p-0.5 items-center justify-center gap-7 w-1/4'>
        <div className='h-1/2 w-full'>
            <Image src={"https://cdn3.upanh.info/upload/server-sw3/acc-category-nickvn/55590/images/BAN%20ACC%20ROBLOX.jpg"} 
            alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
        </div>

        <div>
            <Link href={"/"} >
                <h3 className='text-[#f1c40f] hover:text-[#007bff]'><strong>Bán Acc Roblox</strong></h3>
            </Link>
        </div>

        <div>
            <p>Số tài khoản: 2222</p>
        </div>
        
        <div className='pb-5'>
            <Link href={"/"} className='text-center border-2 divide-solid border-[#ccc] text-[#3f444a] text-base px-10 py-3 
            hover:text-[#007bff] hover:border-[#007bff]'>
                Xem tất cả
            </Link>
        </div>
    </div>
  )
}

export default CardGame