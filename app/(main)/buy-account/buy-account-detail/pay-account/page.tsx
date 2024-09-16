'use client'

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail'
import { AccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/AccGameDetailDto'
import { ButtonV1UI, ButtonV2UI, CarouselThumbs, LoadingUI, ProductImage, TitleService } from '@/components'
import { PropertiesItemJson } from '@/utils/types/PropertiesJson'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from 'next/navigation'
import React, {useEffect, useState } from 'react'
import parse from 'html-react-parser';

const PayAccount = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [properties, setProperties]=useState<PropertiesItemJson[]>([]);
    const [accGameDetail, setAccGameDetail] = useState<AccGameDetailDto>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useSearchParams();
    const idAccGameDetail:string | undefined= params.get("id")?.split(',').at(-1);
    const title:string | undefined= params.get("title")?.split(',').at(-2);

    const getPayAccGameInit=async (): Promise<void>=>{
        try{
            await accGameDetailApiRequest.getPayAccGameInit({id:idAccGameDetail, fields:"?fields=Code%2CPrice%2CDiscount%2CDeposit%2CProperties%2CDescription"}).then((res)=>{
                setAccGameDetail(res.payload.data.accGameDetail);
                setProperties(JSON.parse(res.payload.data.accGameDetail.Properties));
                setGallery(res.payload.data.urlImages);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPayAccGameInit();
    },[setAccGameDetail, setGallery, setProperties, setIsLoading])


    return (
        <div className='flex flex-col gap-10 w-full float-none overflow-hidden'>
            {isLoading?(<LoadingUI></LoadingUI>):(
                <>
                    <div className='flex flex-row gap-20'>
                        <div className='flex flex-col w-2/5'>
                            <ProductImage gallery={gallery} thumbsSwiper={thumbsSwiper} />
                            <CarouselThumbs gallery={gallery} setThumbsSwiper={setThumbsSwiper} />
                        </div>

                        <div className='flex flex-col w-3/5 gap-3'>
                            <div className='bg-s2cyan1 text-black p-3'>
                                <strong className='text-xl'>Mã số: <span className='text-white pl-2'>{accGameDetail?.Code}</span></strong><br></br>
                                <strong>Danh mục: <span className='text-white pl-2'>{title}</span></strong>
                            </div>

                            <table className='table-fixed border'>
                                <thead>
                                    <tr className='bg-s2blue3 text-base leading-6 w-full'>
                                        {(accGameDetail && accGameDetail.Discount==0)?(
                                            <th className='text-left p-3 w-[45%]'>Giá chỉ <br></br> <strong>{accGameDetail.Price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong></th>
                                        ):(
                                            <th className='text-left p-3 w-[45%]'>
                                                Giá chỉ <br></br> 
                                                <strong className='line-through'>{accGameDetail?.Price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
                                                <strong className='pl-2 text-red-500'>{(accGameDetail?(accGameDetail.Price*(100-accGameDetail.Discount)/100):0).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
                                            </th>
                                        )}
                                        <th className='p-3 w-[10%]'>Hoặc</th>
                                        <th className='text-right p-3 w-[45%]'>Đặt cọc <br></br> <strong>{accGameDetail?.Deposit.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties && properties.map((property, index)=>(
                                        <tr key={index} className='text-black border-b w-full'>
                                            <td className='p-3 flex flex-row w-1/2'><ChevronRightIcon className='w-[1.2rem] h-[1.2rem] mt-[3px]'></ChevronRightIcon> <span className='inline-block font-semibold'>{property.Name}</span></td>
                                            <td colSpan={2} className='w-1/2'>{property.Value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='flex flex-row gap-5 px-3'>
                                <ButtonV2UI className='w-1/2' title='Mua ngay'></ButtonV2UI>
                                <ButtonV2UI className='w-1/2' title='Đặt cọc'></ButtonV2UI>
                            </div>
                        </div>
                    </div>

                    <TitleService title={'Chi Tiết'}></TitleService>
                    <div>
                        {accGameDetail?.Description&& (parse(accGameDetail.Description))}
                    </div>

                    <TitleService title={'Tài khoản liên quan'} ></TitleService>
                </>
            )}
        </div>
    )
}

export default PayAccount