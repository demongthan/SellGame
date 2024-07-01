import { ContentBannerSlide, GameCategory, GameService, OutstandingService } from "@/components";

export default function Home() {
  return (
    <div className='flex flex-col w-[90%] sm:w-[65%] mx-auto gap-10'>
      <div className="w-full h-[23rem]">
        <ContentBannerSlide></ContentBannerSlide>
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
    </div>
  );
}
