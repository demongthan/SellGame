"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "./Slider";

interface Props{
    gallery:string[],
    setThumbsSwiper:any,
}


export const CarouselThumbs=({ gallery, setThumbsSwiper }:Props)=> {
  return (
    <div className="w-full relative">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={6}
        watchSlidesProgress={true}
        freeMode={true}
        observer={true}
        observeParents={true}
      >
        {gallery?.map((item, index) => (
          <SwiperSlide
            key={`product-thumb-gallery-${index}`}
            className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
          >
            <Image
              src={item}
              alt={`Product thumb gallery ${index}`}
              width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
