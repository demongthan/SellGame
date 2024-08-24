"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import Link from 'next/link'
import { authApiRequest } from '@/apiRequests/auth'
import LoadingUI from '@/components/Common/LoadingUI'
import TitleService from '@/components/Common/TitleService'
import { menuOutstandingService } from '@/utils/constant/Menu/MenuOutstandingService'

const OutstandingService = () => {
    const [urlImgs, setUrlImgs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getImageUrls= async():Promise<void>=>{
        try{
            const res=await authApiRequest.getAllImageUrl("OUTSTANDING-SERVICE").then((res)=>{
                const urls:string[]=res.payload.data.map(url => url.PathUrl);
                setUrlImgs(urls);
                setIsLoading(false);
            });
        }
        catch(error){
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getImageUrls();
    }, [setUrlImgs]);

  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ nổi bật'} ></TitleService>
        </div>

        {isLoading?(<LoadingUI></LoadingUI>):(
            <div className='flex flex-row gap-10 w-full'>
                {urlImgs.map((url, index)=>(
                    <div key={index} className='h-full w-full'>
                        <Link href={menuOutstandingService[index]} className='hover:opacity-20'>
                            <Image src={url} 
                            alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                        </Link>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default OutstandingService