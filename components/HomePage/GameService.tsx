"use client"

import React, { useEffect, useState } from 'react'

import TitleService from '../Common/TitleService'
import CardGame from '../Common/CardGame'
import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryType } from '@/utils/types/CategoryType';

const GameService = () => {
  const [services, setservices]=useState<CategoryDto[] |null>(null);

  const getCategoryServices=async():Promise<void>=>{
    try{
      const res=await categoryApiRequest.getGame(CategoryType.Service);

      const categoryServices:CategoryDto[]=res.payload.data.map(({...service})=>({
        Name: service.Name,
        TotalSale:service.TotalSale,
        PathUrl: service.PathUrl?service.PathUrl:'',
        Rating: service.Rating
      }));

      console.log(categoryServices);

      setservices(categoryServices);
    }
    catch(error){
        console.error(error);
    }
  }

  useEffect(() => {
    getCategoryServices();
  }, [setservices])

  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ game'} ></TitleService>
        </div>
        <div className='grid grid-cols-4 gap-4 w-full'>
          {services && services?.map((game, index)=>(
            <CardGame key={index} isDiscount={false} isButtonImage={false} isHot={false} 
            totalSale={game.TotalSale} 
            rating={game.Rating} 
            name={game.Name} 
            urlImage={game.PathUrl}></CardGame>
          ))}
        </div>
    </div>
  )
}

export default GameService