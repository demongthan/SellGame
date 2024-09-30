import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { PropertiesItemJson } from '@/utils/types/Json/PropertiesItemJson';

interface Props{
    urlImage: string,
    properties:PropertiesItemJson[],
    discount: number,
    titleButton:string,
    price:number,
    code:string,
    urlButton:string,
    description?:string
}

const CardGameDetail = ({urlImage,
    properties,
    discount,
    titleButton,
    price,
    code,
    urlButton,
    description
}:Props) => {
  return (
    <div className='p-2'>
        <div className='relative flex flex-col w-full h-full max-h-[45rem] border-2 rounded-md divide-solid border-red-500 items-center justify-center gap-6 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='w-full h-[14rem] flex flex-col'>
                <Image src={urlImage} 
                alt="" width={0} height={0} className='rounded-t-md' sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                
                {description && (<div className='flex justify-center items-center !text-xs font-semibold truncate text-gray-900 bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-2 h-[2rem]'>
                    {parse(description)}
                </div>)}
            </div>

            <div className='flex flex-col w-full gap-2 px-8 text-sm'>
                {properties && properties.map((property:PropertiesItemJson, index)=>(
                    <div key={index} className='w-full'>
                        <p className='inline-block w-2/5 font-semibold'>{property.Name} :</p>
                        <p className='inline-block text-right w-3/5'>{property.Name}</p>
                    </div>
                ))}
            </div>

            <div className='border bg-gradient-to-br from-teal-300 to-lime-300 flex justify-center items-center w-[90%] h-[2.5rem]'>
                {discount<=0?(
                    <span className='font-semibold text-gray-600'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                ):(
                    <p className='font-semibold'>
                        <span className='text-gray-600 pr-2 line-through'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                        <span className='text-red-600'>{(price-price*discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </p>
                )}
            </div>

            <Link href={`${urlButton}`} className="relative inline-flex items-center justify-center px-7 py-2.5 overflow-hidden font-medium text-cyan-400 transition duration-300 ease-out border-2 border-cyan-400 divide-solid rounded-full shadow-md group">
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

            {discount>0 && (
                <div className="absolute -top-2 right-3 w-[2.5rem]">
                    <div className='bg-s2red3 border-l-2 border-r-2 border-white text-center'>
                        <span className='text-white font-semibold text-sm relative top-1'>-{discount}%</span>
                    </div>
                    <div className="w-[2.5rem] h-[2.1rem] overflow-hidden inline-block">
                        <div className="h-[1.8rem] w-[1.8rem] bg-s2red3 border-2 border-white -rotate-45 transform origin-top-left"></div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default CardGameDetail