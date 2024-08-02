import { ButtonV1UI, InputUI, SelectUI, TitleService } from '@/components'
import React from 'react'
import Image from "next/image";

const BuyCard = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleService title={'Dịch vụ ROBOX 120H GamePass'}></TitleService>

        <div className='flex flex-row gap-10 h-[15rem]'>
            <div className='w-1/4'>
                <Image src={"https://nick.vn/assets/frontend/theme_1/images/store-card.jpg"} 
                alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '85%' }}></Image>
            </div>

            <div className='flex flex-col w-[37.5%] gap-5'>
                <div>
                    <SelectUI value={undefined} isBlockLabel={true} label={"Chọn nhà mạng"}
                    classDiv={"w-full"} classSelect={"w-full"}></SelectUI>
                </div>

                <SelectUI value={undefined} isBlockLabel={true} label={"Mệnh giá"}
                    classDiv={"w-full"} classSelect={"w-full"}></SelectUI>

                <InputUI value={undefined} isBlockLabel={true} label={"Số lượng"}
                classDiv='w-full' classInput='w-full'></InputUI>
            </div>

            <div className='flex flex-col w-[37.5%] gap-5'>
                <div className='w-full h-[4rem] bg-s2red4 text-lg font-semibold text-white rounded-md flex justify-center items-center'><span>Tổng: 85 Rox</span></div>
                <ButtonV1UI className={"flex items-center justify-center w-full h-[4rem] bg-s2cyan1"} title='Thanh toán' isIconCard={true}></ButtonV1UI>
            </div>
        </div>

        <div className='w-full pt-3rem flex items-center justify-center'>
            <ButtonV1UI className={"flex items-center justify-center w-1/6 h-[2.5rem] bg-s2cyan1"} title='Xem thêm nội dung' isIconCard={false}></ButtonV1UI>
        </div>

        <div>
            <TitleService title={'Dịch vụ khác'}></TitleService>
        </div>
    </div>
  )
}

export default BuyCard