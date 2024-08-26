import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RatingDisplay from '../Common/RatingDisplay';

interface Props{
    isHot?:boolean,
    totalSale?:number,
    rating:number,
    name:string,
    urlImage:string,
    titleButton:string,
    urlButton:string,
    id:string,
    total?:number,
    isGame:boolean
}

const CardGame = ({
    isHot=false, 
    urlImage, 
    name,
    totalSale,
    rating,
    titleButton,
    urlButton,
    total,
    isGame,
    id}:Props) => {

    const lstRating:number[]=[1, 2, 3, 4, 5];

  return (
    <div className='p-2'>
        <div className='relative flex flex-col w-full h-full max-h-[25rem] border rounded-md divide-solid border-red-600 p-0.5 items-center justify-center gap-3 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='h-1/2 w-full'>
                <Image src={urlImage} 
                alt="" width={0} height={0} className='rounded-t-md' sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>

            <div className='h-[7%]'>
                <h2 className='text-base text-black'><strong>{name}</strong></h2>
            </div>

            {isGame?(
                <>
                    <div className='h-[7%]'>
                        <p className='font-semibold text-sm text-green-500'>Số tài khoản: {totalSale}</p>
                    </div>

                    <div className='h-[7%]'>
                        <p className='font-semibold text-sm text-red-500'>Đã bán: {totalSale}</p>
                    </div>
                </>
            ):(
                <div className='h-[14%]'>
                    <p className='font-semibold text-sm text-red-500'>Giao dịch: {totalSale}</p>
                </div>
            )}

            <RatingDisplay rating={rating} className='w-[7%]'></RatingDisplay>

            <div className='h-[28%] flex justify-center items-center'>
                <Link href={`${urlButton},${name}&id=,${id}`} className='border-2 divide-solid rounded-full border-blue-400 text-blue-400 font-normal text-base px-7 py-2 hover:border-s2cyan1 hover:text-s2cyan1'>
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