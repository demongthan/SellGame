import React from 'react'
import Image from 'next/image'

import TitleService from '../Common/TitleService'
import Link from 'next/link'

const OutstandingService = () => {
    const urlImg:string[]=[
        "https://cdn.upanh.info/storage/upload/images/D%E1%BB%8Bch%20v%E1%BB%A5/nap-tien.jpg",
        "https://cdn.upanh.info/storage/upload/images/D%E1%BB%8Bch%20v%E1%BB%A5/mua-the(1).jpg",
        "https://cdn.upanh.info/storage/upload/images/a1(2).jpg"
    ]

  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ nổi bật'} ></TitleService>
        </div>
        <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
            {urlImg.map((url, index)=>(
                <div key={index} className='h-full w-full'>
                    <Link href={"/like"}>
                        <Image src={url} 
                        alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default OutstandingService