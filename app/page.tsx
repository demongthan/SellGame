"use client"

import { ContentBannerSlide, GameCategory, GameService, LoadingUI, OutstandingService } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, [setIsLoading])

  return (
    <div className='flex flex-col w-[90%] sm:w-[65%] mx-auto gap-10'>

      {isLoading?(<div className="h-[85vh]"><LoadingUI></LoadingUI></div>):(
        <>
          <div className="w-full h-[23rem]">
            <ContentBannerSlide className={"w-full h-full"}></ContentBannerSlide>
          </div>

          <div className="w-full h-[20rem]">
            <OutstandingService></OutstandingService>
          </div>

          <div>
            <GameCategory></GameCategory>
          </div>

          <div>
            <GameService></GameService>
          </div>

          <div></div>
        </>
      )}
    </div>
  );
}
