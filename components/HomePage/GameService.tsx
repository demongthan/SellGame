"use client"

import React, { useEffect, useState } from 'react'

import TitleService from '../Common/TitleService'
import CardGame from '../Common/CardGame'
import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryType } from '@/utils/types/CategoryType';
import LoadingUI from '../Common/LoadingUI';

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
        Rating: service.Rating
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
              <CardGame key={index} isDiscount={false} isButtonImage={false} isHot={false} 
              totalSale={game.TotalSale} 
              rating={game.Rating} 
              name={game.Name} 
              urlImage={game.PathUrl}></CardGame>
            ))}
          </div>
        )}
        
    </div>
  )
}

export default GameService