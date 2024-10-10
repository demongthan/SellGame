"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { PropertyAccGameDetail } from '@/utils/types/Json/PropertyAccGameDetail';
import { AccGameDetailType } from '@/utils/constant/AccGameDetail/AccGameDetailType';

interface Props{
    urlImage: string,
    properties:PropertyAccGameDetail[],
    discount: number,
    titleButton:string,
    price:number,
    code:string,
    urlButton:string,
    description?:string,
    type:AccGameDetailType
}

const CardGameDetail = ({urlImage,
    properties,
    discount,
    titleButton,
    price,
    code,
    urlButton,
    description,
    type
}:Props) => {
    const [urlImageType]=useState<string>(()=>{
        let url="";

        switch(type) {
            case AccGameDetailType.Hot:
                url='/img/AccGameDetailType/IconProductHot.png';
                break;
            case AccGameDetailType.Limited:
                url='/img/AccGameDetailType/IconLimitedPro.png';
                break;
            case AccGameDetailType.Special:
                url="/img/AccGameDetailType/IconSpecial.png";
                break;
            default:
        }

        return url;
    })

  return (
    <div className='p-4'>
        <div className='relative flex flex-col px-0.5 w-full h-[30rem] border-2 rounded-md divide-solid border-red-500 items-center justify-center gap-4 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='w-full h-[14rem] flex flex-col'>
                <div className='h-[12rem] rounded-t-md'>
                    <Image 
                        src={urlImage} alt="" width={0} height={0} className='rounded-t-md' 
                        sizes="100vw" style={{ width: '100%', height: '100%' }}>
                    </Image>
                </div>
                
                {description && (<div className='flex justify-center items-center !text-xs font-semibold truncate text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-2 h-[2rem]'>
                    {parse(description)}
                </div>)}
            </div>

            <div className='flex flex-col gap-2 w-[90%] text-sm h-[10rem] overflow-y-auto scrollbar-hide'>
            {properties && properties.map((property:PropertyAccGameDetail, index)=>(
                    <div key={index} className='w-full'>
                        <p className='inline-block w-2/5 font-semibold'>{property.Name} :</p>
                        <p className='inline-block text-right w-3/5'>{property.Value}</p>
                    </div>
                ))}
            </div>

            <div className='border bg-gradient-to-br text-sm from-teal-300 to-lime-300 flex justify-center items-center w-[90%] h-[3rem]'>
                {discount<=0?(
                    <span className='font-semibold text-gray-600'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                ):(
                    <p className='font-semibold'>
                        <span className='text-gray-600 pr-2 line-through'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                        <span className='text-red-600'>{(price-price*discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </p>
                )}
            </div>

            <Link href={`${urlButton}`} className="relative inline-flex items-center justify-center px-7 py-2.5 overflow-hidden 
            font-medium text-cyan-400 transition duration-300 ease-out border-2 border-cyan-400 divide-solid rounded-full shadow-md group h-[3rem]">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:translate-x-0 ease">
                    <ShoppingCartIcon className='w-[1.2rem] h-[1.2rem]'></ShoppingCartIcon>
                </span>

                <span className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                    {titleButton}
                </span>

                <span className="relative text-base font-semibold invisible">{titleButton}</span>
            </Link>

            <div className='absolute top-1 left-2 h-[2rem] w-[11rem] flex justify-center items-center bg-gradient-to-br from-pink-500 to-orange-400'>
                <span className='font-semibold text-sm text-white'>MS: {code}</span>
            </div>

            {
                type!=AccGameDetailType.Regular && (
                    <div className='absolute -top-6 -right-4'>
                        <Image alt='' src={urlImageType} height={70} width={70} className='animate-zoomShake'></Image>
                    </div>
                )
            }

            {discount>0 && (
                <div className="absolute z-50 top-[40%] -left-1 w-[1.5rem]">
                    <div className="flex items-center justify-center">
                        <div className="relative transform rotate-12 p-2 bg-red-500 text-white rounded-lg shadow-lg border-4 group border-gradient-to-br">
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                            <Image alt='' src={'/img/IconPin.png'} width={30} height={30} className="absolute -top-[15px] -right-[14px]"></Image>
                            <div className="text-center">
                                <div className="text-[8px] font-bold text-white flex justify-center">
                                    <span className="animate-letter opacity-0" style={{ animationDelay: '0s' }}>S</span>
                                    <span className="animate-letter opacity-0" style={{ animationDelay: '0.5s' }}>A</span>
                                    <span className="animate-letter opacity-0" style={{ animationDelay: '1s' }}>L</span>
                                    <span className="animate-letter opacity-0" style={{ animationDelay: '1.5s' }}>E</span>
                                </div>

                                <div className="text-xs font-bold text-white animate-popUp opacity-0">
                                    {discount}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default CardGameDetail