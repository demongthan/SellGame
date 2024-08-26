import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertiesItemJson } from '@/utils/types/PropertiesJson'

interface Props{
    urlImage: string,
    properties:PropertiesItemJson[],
    discount: number,
    titleButton:string,
    price:number,
    code:string,
    urlButton:string,
}

const CardGameDetail = ({urlImage,
    properties,
    discount,
    titleButton,
    price,
    code,
    urlButton
}:Props) => {
  return (
    <div className='p-2'>
        <div className='relative flex flex-col w-full h-full max-h-[25rem] border rounded-md divide-solid border-red-600 p-0.5 items-center justify-center gap-3 pb-3 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='h-[40%] w-full'>
                <Image src={urlImage} 
                alt="" width={0} height={0} className='rounded-t-md' sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>

            <div className='flex flex-col w-full h-[30%] gap-2 px-3'>
                {properties && properties.map((property, index)=>(
                    <div key={index} className='w-full'>
                        <p className='inline-block w-2/5'>{property.Name} :</p>
                        <p className='inline-block text-right w-3/5'>{property.Value}</p>
                    </div>
                ))}
            </div>

            <div className='h-[15%] border border-red-600 flex justify-center items-center w-[90%]'>
                {discount<=0?(
                    <span className='font-semibold text-gray-600'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                ):(
                    <p className='font-semibold'>
                        <span className='text-gray-600 pr-2 line-through'>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                        <span className='text-red-600'>{(price-price*discount/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </p>
                )}
            </div>
                
            <div className='h-[15%] flex justify-center items-center'>
                <Link href={`${urlButton}`} className='border-2 divide-solid rounded-full border-red-400 text-red-400 font-normal text-base px-7 py-2 hover:border-s2cyan1 hover:text-s2cyan1'>
                    {titleButton}
                </Link>
            </div>

            <div className='absolute top-1 left-2 h-[2rem] w-[11rem] flex justify-center items-center bg-red-600'>
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