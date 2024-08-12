"use client"

import { ServiceDetailDto } from '@/apiRequests/DataDomain/ServiceDetail/ServiceDetailDto';
import { serviceDetailApiRequest } from '@/apiRequests/service-detail';
import { LoadingUI } from '@/components'
import CardGame from '@/components/Common/CardGame'
import React, { useEffect, useState } from 'react'

const Service = () => {
    const [services, setServices]=useState<ServiceDetailDto[] |null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getAllServices=async():Promise<void>=>{
        try{
            const res=await serviceDetailApiRequest.getAllServiceDetailActive();
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
                      totalSale={service.Transaction}
                      rating={service.Rating}
                      name={service.Name}
                      urlImage={service.PathUrl}
                      titleButton={"Mua ngay"}
                      urlButton={`/service/pay-service?title=Dịch vụ`}
                      id={service.Id} 
                      isGame={false}>
                    </CardGame>
                ))}
              </div>
            )}
        </>
    )
}

export default Service