"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryDto } from '@/apiRequests/DataDomain/Category/CategoryDto';
import { LoadingUI } from '@/components'
import CardGame from '@/components/Common/CardGame'
import { CategoryType } from '@/utils/types/CategoryType';
import React, { useEffect, useState } from 'react'

const Service = () => {
  const [services, setServices]=useState<CategoryDto[] |null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getAllServices=async():Promise<void>=>{
        try{
            const res=await categoryApiRequest.getAllCategoryByType(CategoryType.Service);
            setServices(res.payload.data);
            setIsLoading(false);
        }
        catch(error){
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
      getAllServices();
    }, [setServices])

    return (
        <>
            {isLoading?(<div className="h-[85vh]"><LoadingUI></LoadingUI></div>):(
              <div className='grid grid-cols-4 gap-4 w-full'>
                {services && services?.map((service, index)=>(
                    <CardGame key={index}
                    totalSale={service.TotalSale}
                    rating={service.Rating}
                    name={service.Name}
                    urlImage={service.PathUrl} 
                    titleButton={"Chi tiết"} 
                    urlButton={`/buy-account/buy-account-detail?title=Mua tài khoản`} 
                    id={service.Id}>
                    </CardGame>
                ))}
              </div>
            )}
        </>
    )
}

export default Service