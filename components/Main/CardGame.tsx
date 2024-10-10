import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RatingDisplay from '../Common/RatingDisplay';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface Props{
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
    urlImage, 
    name,
    totalSale,
    rating,
    titleButton,
    urlButton,
    total,
    isGame,
    id}:Props) => {

  return (
    <div className='p-2'>
        <div className='relative flex flex-col w-full h-[25rem] border-2 p-0.5 rounded-md divide-solid border-red-500 items-center justify-center gap-3 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='h-[17rem] w-full'>
                <Image src={urlImage} 
                alt="" width={0} height={0} className='rounded-t-md' sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>

            <div className='h-[2rem]'>
                <h2 className='text-base text-black'><strong>{name}</strong></h2>
            </div>

            {isGame?(
                <>
                    <div className='h-[1rem]'>
                        <p className='font-semibold text-sm text-green-500'>Số tài khoản: {total}</p>
                    </div>

                    <div className='h-[1rem]'>
                        <p className='font-semibold text-sm text-red-500'>Đã bán: {totalSale}</p>
                    </div>
                </>
            ):(
                <div className='h-[2rem]'>
                    <p className='font-semibold text-sm text-red-500'>Giao dịch: {totalSale}</p>
                </div>
            )}

            <RatingDisplay rating={rating} className='[1rem]'></RatingDisplay>

            <Link href={`${urlButton},${name}&id=,${id}`} className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden 
            font-medium text-cyan-400 transition duration-300 ease-out border-2 border-cyan-400 divide-solid rounded-full shadow-md group h-[3rem]">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:translate-x-0 ease">
                    <ArrowRightIcon className='w-[1.2rem] h-[1.2rem]'></ArrowRightIcon>
                </span>

                <span className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                    {titleButton}
                </span>

                <span className="relative text-base font-semibold invisible">{titleButton}</span>
            </Link>
        </div>
    </div>
    
  )
}

export default CardGame