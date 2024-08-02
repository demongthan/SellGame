"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "./Slider";

interface Props{
    gallery:string[],
    setThumbsSwiper:any,
}


export const CarouselThumbs=({ gallery, setThumbsSwiper }:Props)=> {
  return (
    <div className="max-w-md mt-5 lg:mt-8 mx-auto relative lg:pb-2">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={4}
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
              width={80}
              height={80}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
