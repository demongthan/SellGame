"use client"

import React, { useEffect, useState } from 'react'

import { categoryApiRequest } from '@/apiRequests/category'
import { CategoryType } from '@/utils/types/CategoryType'
import LoadingUI from '@/components/Common/LoadingUI'
import CardGame from '@/components/Common/CardGame'
import TitleService from '@/components/Common/TitleService'

const GameCategory = () => {
  const [games, setGames]=useState<CategoryDto[] |null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCategoryGames=async():Promise<void>=>{
    try{
      const res=await categoryApiRequest.getGame(CategoryType.Game);

      const categoryGames:CategoryDto[]=res.payload.data.map(({...game})=>({
        Name: game.Name,
        TotalSale:game.TotalSale,
        PathUrl: game.PathUrl?game.PathUrl:'',
        Rating: game.Rating,
        Id: game.Id,
        Properties:game.Properties
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
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Danh mục game'} ></TitleService>
        </div>

        {isLoading?(<div className='h-[30vh]'><LoadingUI></LoadingUI></div>):(
          <div className='grid grid-cols-4 gap-4 w-full'>
            {games && games?.map((game, index)=>(
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

export default GameCategory