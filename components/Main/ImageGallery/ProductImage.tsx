"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "./Slider";
import Fancybox from './Fancybox';
import Link from "next/link";
import { Button } from "@headlessui/react";

interface Props{
    gallery:string[],
    thumbsSwiper:any,
}

export const ProductImage=({ gallery, thumbsSwiper }:Props)=> {
  return (
    <div className="relative h-[19rem]">
        <Fancybox options={{Carousel: {infinite: false,},}}>
            <Swiper loop={true} spaceBetween={10}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                autoplay={{ delay: 3000 }}
                thumbs={{
                    swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[Autoplay, Navigation, Thumbs]}>
                    {gallery?.map((item, index) => (
                        <SwiperSlide
                            key={`product-gallery-${index}`}
                            className="flex justify-center items-center !h-[18rem]">
                                <Link href={item} data-fancybox="gallery">
                                    <Image
                                      src={item}
                                      alt={`Product gallery ${index}`}
                                      width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}>
                                    </Image>
                                </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
            
            <Button className="custom-prev absolute left-3 top-1/2 transform -translate-y-1/2 bg-blue-500 
            text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out z-10">
              <svg className="h-3 w-3 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Button>

            <Button className="custom-next absolute right-3 top-1/2 transform -translate-y-1/2 
            bg-blue-500 text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out z-10">
              <svg className="h-3 w-3 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.99984 4.00012L10 8.00029L5.99748 12.0028" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Button>
        </Fancybox>
    </div>
  );
}