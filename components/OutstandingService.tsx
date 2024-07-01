import React from 'react'
import Image from 'next/image'

import TitleService from './Common/TitleService'
import Link from 'next/link'

const OutstandingService = () => {
  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ nổi bật'} ></TitleService>
        </div>
        <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
            <div className='h-full w-full'>
                <Link href={"/like"}>
                    <Image src={"https://png.pngtree.com/element_our/20190602/ourmid/pngtree-gold-coin-prop-game-image_1419352.jpg"} 
                    alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                </Link>
            </div>

            <div className='h-[100%] w-[100%]'>
                <Link href={"/like"}>
                    <Image src={"https://png.pngtree.com/png-clipart/20240518/original/pngtree-buying-with-credit-card-sale-passing-buy-photo-png-image_15129663.png"} 
                    alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                </Link>
            </div>

            <div className='h-[100%] w-[100%]'>
                <Link href={"/like"}>
                    <Image src={"https://phuongnamvina.com/img_data/images/kinh-doanh-dich-vu-la-gi-20-nganh-dich-vu-tiem-nang-nhat-2023.jpg"} 
                    alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                </Link>
            </div>

            <div className='h-[100%] w-[100%]'>
                <Link href={"/like"}>
                    <Image src={"https://img.lovepik.com/photo/50033/3095.jpg_wh860.jpg"} 
                    alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default OutstandingService