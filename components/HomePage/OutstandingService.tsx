"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import TitleService from '../Common/TitleService'
import Link from 'next/link'
import { authApiRequest } from '@/apiRequests/auth'

const OutstandingService = () => {
    const [urlImgs, seturlImgs] = useState<string[]>([]);

    const getImageUrls= async():Promise<void>=>{
        try{
            const res=await authApiRequest.getAllImageUrl("OUTSTANDINGSERVICE");

            const urls:string[]=res.payload.data.map(url => url.PathUrl);
            seturlImgs(urls);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        getImageUrls();
    }, [seturlImgs]);

  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ nổi bật'} ></TitleService>
        </div>
        <div className='flex flex-row gap-5 w-full float-none overflow-hidden'>
            {urlImgs.map((url, index)=>(
                <div key={index} className='h-full w-full'>
                    <Link href={"/"}>
                        <Image src={url} 
                        alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default OutstandingService