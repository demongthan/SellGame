import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props{
    isHot?:boolean,
    totalSale:number,
    rating:number,
    name:string,
    urlImage:string,
    titleButton:string,
    urlButton:string,
    id:string,
}

const CardGame = ({
    isHot=false, 
    urlImage, 
    name,
    totalSale,
    rating,
    titleButton,
    urlButton,
    id}:Props) => {

    const lstRating:number[]=[1, 2, 3, 4, 5];

  return (
    <div className='p-2'>
        <div className='relative flex flex-col w-full h-full border rounded-md divide-solid border-red-600 p-0.5 items-center justify-center gap-3 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='h-1/2 w-full'>
                <Image src={urlImage} 
                alt="" width={0} height={0} className='rounded-t-md' sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>

            <div className='h-[7%]'>
                <h2 className='text-xl text-black'><strong>{name}</strong></h2>
            </div>

            <div className='h-[7%]'>
                <p className='font-semibold text-red-500'>Số tài khoản: {totalSale}</p>
            </div>

            <div className='h-[7%]'>
                <p className='font-semibold text-red-500'>Đã bán: {totalSale}</p>
            </div>

            <div className="flex items-center h-[7%]">
                {lstRating.map((item, index)=>(
                    <svg key={index} className={`w-4 h-4 ${item<=rating?"text-yellow-300":"text-gray-300"}  ms-1`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                ))}
            </div>

            <div className='h-[28%] flex justify-center items-center'>
                <Link href={`${urlButton},${name}&id=,${id}`} className='border-2 divide-solid rounded-full border-red-400 text-red-400 font-normal text-base px-7 py-2 hover:border-s2cyan1 hover:text-s2cyan1'>
                    {titleButton}
                </Link>
            </div>

            {isHot && (
                <div className='absolute top-4 -left-3 h-[2rem] w-[3.5rem] flex justify-center items-center bg-s2cyan1'>
                    <span className='font-semibold text-base text-white'>HOT</span>
                </div>
            )}
        </div>
    </div>
    
  )
}

export default CardGame