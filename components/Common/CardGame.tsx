import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ShowDiscount from './UI/ShowDiscount'

interface Props{
    isDiscount:boolean,
    isButtonImage:boolean
}

const CardGame = ({isDiscount, isButtonImage}:Props) => {

  return (
    <div className='relative flex flex-col border divide-solid border-s2gray1 p-0.5 items-center justify-center gap-7 w-1/4'>
        <div className='h-1/2 w-full'>
            <Image src={"https://cdn3.upanh.info/upload/server-sw3/acc-category-nickvn/55590/images/BAN%20ACC%20ROBLOX.jpg"} 
            alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
        </div>

        <div>
            <Link href={"/"} >
                <h3 className='text-s2yellow1 hover:text-s2blue1'><strong>Bán Acc Roblox</strong></h3>
            </Link>
        </div>

        <div>
            <p>Số tài khoản: 2222</p>
        </div>
        
        <div className='pb-5'>
            {isButtonImage?(
                <Image src={'https://nick.vn/assets/frontend/theme_1/images/muangay.jpg'}
                alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            ):(
                <Link href={"/"} className='text-center border-2 divide-solid border-s2gray1 text-s2slate1 text-base px-10 py-3 
                     hover:text-s2blue1 hover:border-s2blue1'>
                    Xem tất cả
                </Link>
            )
            }
        </div>

        {isDiscount?(<ShowDiscount></ShowDiscount>):""}
    </div>
  )
}

export default CardGame