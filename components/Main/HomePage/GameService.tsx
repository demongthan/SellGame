"use client"

import React, { useEffect, useState } from 'react'

import LoadingUI from '@/components/Common/LoadingUI';
import CardGame from '@/components/Main/CardGame';
import { ServiceDetailDto } from '@/apiRequests/DataDomain/ServiceDetail/ServiceDetailDto';
import { serviceDetailApiRequest } from '@/apiRequests/service-detail';
import TitleService from '../TitleService';

const GameService = () => {
    const [services, setServices]=useState<ServiceDetailDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCategoryServices=async():Promise<void>=>{
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
        getCategoryServices();
    }, [setServices])

    return (
        <div className='flex flex-col gap-5 h-full w-full'>
            <div>
                <TitleService title={'Dịch vụ game'} ></TitleService>
            </div>

            {isLoading?(<div className='h-[30vh]'><LoadingUI></LoadingUI></div>):(
              <div className='grid grid-cols-4 gap-4 w-full'>
                {services && services?.map((service, index)=>(
                  <CardGame key={index} isHot={false}
                    totalSale={service.Transaction}
                    rating={service.Rating}
                    name={service.Name}
                    urlImage={service.PathUrl?service.PathUrl:""} 
                    titleButton={'Xem tất cả'} 
                    urlButton={''} 
                    id={''} 
                    isGame={false}></CardGame>
                ))}
              </div>
            )}
            
        </div>
    )
}

export default GameService