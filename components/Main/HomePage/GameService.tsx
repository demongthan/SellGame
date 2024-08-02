"use client"

import React, { useEffect, useState } from 'react'

import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryType } from '@/utils/types/CategoryType';
import LoadingUI from '@/components/Common/LoadingUI';
import CardGame from '@/components/Common/CardGame';
import TitleService from '@/components/Common/TitleService';

const GameService = () => {
  const [services, setServices]=useState<CategoryDto[] |null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCategoryServices=async():Promise<void>=>{
    try{
      const res=await categoryApiRequest.getGame(CategoryType.Service);

      const categoryServices:CategoryDto[]=res.payload.data.map(({...service})=>({
        Name: service.Name,
        TotalSale:service.TotalSale,
        PathUrl: service.PathUrl?service.PathUrl:'',
        Rating: service.Rating,
        Id:service.Id,
        Properties:service.Properties
      }));

      setServices(categoryServices);

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
            {services && services?.map((game, index)=>(
              <CardGame key={index} isHot={false}
              totalSale={game.TotalSale}
              rating={game.Rating}
              name={game.Name}
              urlImage={game.PathUrl} titleButton={''} urlButton={''} id={''}></CardGame>
            ))}
          </div>
        )}
        
    </div>
  )
}

export default GameService