"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryDto } from '@/apiRequests/DataDomain/Category/CategoryDto';
import { LoadingUI } from '@/components';
import CardGame from '@/components/Main/CardGame'

import React, { useEffect, useState } from 'react'

const BuyAccount = () => {
    const [games, setGames]=useState<CategoryDto[] |null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCategoryGames=async():Promise<void>=>{
        try{
            const res=await categoryApiRequest.getAllCategoryByActive("?Fields=Id%2C%20Name%2C%20Total%2C%20TotalSale%2C%20Rating%2C%20PathUrl");
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
                        total={game.Total}
                        rating={game.Rating}
                        name={game.Name}
                        urlImage={game.PathUrl?game.PathUrl:""}
                        titleButton={"Xem tất cả"}
                        urlButton={`/buy-account/buy-account-detail?title=Mua tài khoản`}
                        id={game.Id} isGame={true}>
                        </CardGame>
                    ))}
                </div>
            )}
        </>
    )
}

export default BuyAccount