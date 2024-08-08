"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryDto } from '@/apiRequests/DataDomain/Category/CategoryDto';
import { LoadingUI } from '@/components';
import CardGame from '@/components/Common/CardGame'
import { CategoryType } from '@/utils/types/CategoryType';

import React, { useEffect, useState } from 'react'

const BuyAccount = () => {
    const [games, setGames]=useState<CategoryDto[] |null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCategoryGames=async():Promise<void>=>{
        try{
            const res=await categoryApiRequest.getAllCategoryByType(CategoryType.Game);
            setGames(res.payload.data);
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
                    <CardGame key={index}
                    totalSale={game.TotalSale}
                    rating={game.Rating}
                    name={game.Name}
                    urlImage={game.PathUrl} 
                    titleButton={"Xem tất cả"} 
                    urlButton={`/buy-account/buy-account-detail?title=Mua tài khoản`} 
                    id={game.Id}>
                    </CardGame>
                ))}
              </div>
            )}
        </>
    )
}

export default BuyAccount