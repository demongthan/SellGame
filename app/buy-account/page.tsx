"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { LoadingUI } from '@/components';
import CardGame from '@/components/Common/CardGame'
import { CategoryType } from '@/utils/types/CategoryType';

import React, { useEffect, useState } from 'react'

interface Props{
  title:string
}

const BuyAccount = ({title}:Props) => {
  const [games, setGames]=useState<CategoryDto[] |null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCategoryGames=async():Promise<void>=>{
    try{
      const res=await categoryApiRequest.getGame(CategoryType.Game);

      const categoryGames:CategoryDto[]=res.payload.data.map(({...game})=>({
        Name: game.Name,
        TotalSale:game.TotalSale,
        PathUrl: game.PathUrl?game.PathUrl:'',
        Rating: game.Rating
      }));

      setGames(categoryGames);

      setIsLoading(false);
    }
    catch(error){
        console.error(error);

        setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoryGames();
  }, [setGames])

  return (
    <>
      {isLoading?(<div className="h-[85vh]"><LoadingUI></LoadingUI></div>):(
        <div className='grid grid-cols-4 gap-4 w-full'>
          {games && games?.map((game, index)=>(
            <CardGame key={index} isDiscount={false} isButtonImage={false} isHot={false} 
            totalSale={game.TotalSale} 
            rating={game.Rating} 
            name={game.Name} 
            urlImage={game.PathUrl}></CardGame>
          ))}
        </div>
    )}
    </>
  )
}

export default BuyAccount