"use client"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props{
  autoSlide?:boolean,
  autoSlideInterval?:number,
}

const ContentBannerSlide = ({autoSlide=false, autoSlideInterval=3000}:Props) => {
    const [curr, setCurr] = useState<number>(0);

    const imgUrls:string[]=[
        "https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957_1280.jpg",
        "https://c.wallhere.com/photos/9a/40/1500x1000_px_austria_Colorful_Fall_forest_lake_landscape_nature-1001649.jpg!d",
        "https://wallpaperaccess.com/full/809523.jpg"
    ]

    const prev = ():void =>
        setCurr((curr) => (curr === 0 ? imgUrls.length - 1 : curr - 1))
    const next = ():void =>
    setCurr((curr) => (curr === imgUrls.length - 1 ? 0 : curr + 1))
    

    useEffect(() => {
        if (!autoSlide) return

        const slideInterval = setInterval(next, autoSlideInterval)
        
        return () => clearInterval(slideInterval)
    }, [])

  return (
    <div className="overflow-hidden relative w-full h-full mx-auto">
        <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
        >
            {imgUrls.map((url, index)=>(
                <Image key={index} src={url} alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '50%' }}></Image>
            ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prev} className="p-1 rounded-full shadow bg-black/80 text-white hover:bg-black">
                <ChevronLeftIcon className='w-[2.2rem] h-[2.2rem]' />
            </button>

            <button onClick={next} className="p-1 rounded-full shadow bg-black/80 text-white hover:bg-black">
                <ChevronRightIcon className='w-[2.2rem] h-[2.2rem]' />
            </button>
        </div>

        <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
            {imgUrls.map((_, i) => (
                <div key={i}
                className={`
                transition-all w-1 h-1 bg-white rounded-full
                ${curr === i ? "p-1" : "bg-opacity-50"}
                `}
                />
            ))}
            </div>
        </div>
    </div>
  )
}

export default ContentBannerSlide