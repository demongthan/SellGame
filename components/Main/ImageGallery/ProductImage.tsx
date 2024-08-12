"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "./Slider";
import Fancybox from './Fancybox';
import Link from "next/link";

interface Props{
    gallery:string[],
    thumbsSwiper:any,
}

export const ProductImage=({ gallery, thumbsSwiper }:Props)=> {
  return (
    <div className="relative">
        <Fancybox
            options={{
            Carousel: {
                infinite: false,
            },
            }}
        >
            <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation>
                    {gallery?.map((item, index) => (
                    <SwiperSlide
                        key={`product-gallery-${index}`}
                        className="flex justify-center items-center">
                            <Link href={item} data-fancybox="gallery">
                                <Image
                                src={item}
                                alt={`Product gallery ${index}`}
                                width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}/>
                            </Link>
                    </SwiperSlide>
                    ))}
            </Swiper>
        </Fancybox>
    </div>
  );
}