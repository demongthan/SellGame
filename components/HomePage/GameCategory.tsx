"use client"

import React, { useEffect, useState } from 'react'

import TitleService from '../Common/TitleService'
import CardGame from '../Common/CardGame'
import { categoryApiRequest } from '@/apiRequests/category'
import { CategoryType } from '@/utils/types/CategoryType'

const GameCategory = () => {
  const [games, setgames]=useState<CategoryDto[] |null>(null);

  const getCategoryGames=async():Promise<void>=>{
    try{
      const res=await categoryApiRequest.getGame(CategoryType.Game);

      const categoryGames:CategoryDto[]=res.payload.data.map(({...game})=>({
        Name: game.Name,
        TotalSale:game.TotalSale,
        PathUrl: game.PathUrl?game.PathUrl:'',
        Rating: game.Rating
      }));

      console.log(categoryGames);

      setgames(categoryGames);
    }
    catch(error){
        console.error(error);
    }
  }

  useEffect(() => {
    getCategoryGames();
  }, [setgames])

  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Danh mục game'} ></TitleService>
        </div>
        <div className='grid grid-cols-4 gap-4 w-full'>
          {games && games?.map((game, index)=>(
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

export default GameCategory