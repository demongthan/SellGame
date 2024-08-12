'use client'

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail'
import { ButtonV1UI, CarouselThumbs, LoadingUI, ProductImage } from '@/components'
import { PropertiesItemJson } from '@/utils/types/PropertiesJson'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from 'next/navigation'
import React, {useEffect, useState } from 'react'

const PayAccount = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [properties, setProperties]=useState<PropertiesItemJson[]>([]);
    const [accGameDetail, setAccGameDetail] = useState<AccGameDetailDto>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useSearchParams();
    const idAccGameDetail:string | undefined= params.get("id")?.split(',').at(-1);

    const getPayAccGameInit=async (): Promise<void>=>{
        try{
            await accGameDetailApiRequest.getPayAccGameInit({id:idAccGameDetail, fields:"?fields=Code%2CPrice%2CDiscount%2CDeposit%2CProperties"}).then((res)=>{
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
        <div className='flex flex-col gap-10 w-full float-none overflow-hidden h-[66vh]'>
            {isLoading?(<LoadingUI></LoadingUI>):(
                <>
                    <div className='flex flex-row gap-20'>
                        <div className='flex flex-col w-2/5'>
                            <ProductImage gallery={gallery} thumbsSwiper={thumbsSwiper} />
                            <CarouselThumbs gallery={gallery} setThumbsSwiper={setThumbsSwiper} />
                        </div>

                        <div className='flex flex-col w-3/5 gap-3'>
                            <div className='bg-s2cyan1 text-white p-3'>
                                <strong className='text-2xl'>Mã số: {accGameDetail?.Code}</strong><br></br>
                                <strong>Danh mục: </strong>
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
                                                <strong>{(accGameDetail?(accGameDetail.Price*(100-accGameDetail.Discount)/100):0).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
                                            </th>
                                        )}
                                        <th className='p-3 w-[10%]'>Hoặc</th>
                                        <th className='text-right p-3 w-[45%]'>Đặt cọc <br></br> <strong>{accGameDetail?.Deposit.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties && properties.map((property, index)=>(
                                        <tr key={index} className='text-black border-b w-full'>
                                            <td className='p-3 flex flex-row w-1/2'><ChevronRightIcon className='w-[1.2rem] h-[1.2rem]'></ChevronRightIcon> <span className='inline-block'>{property.Name}</span></td>
                                            <td colSpan={2} className='w-1/2'>{property.Value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className='flex flex-row gap-5'>
                                <ButtonV1UI className={"flex items-center justify-center w-full h-[2.5rem] bg-s2cyan1"} title='Mua ngay' isIconCard={true}></ButtonV1UI>
                                <ButtonV1UI className={"flex items-center justify-center w-full h-[2.5rem] bg-s2cyan1"} title='Đặt cọc' isIconCard={false}></ButtonV1UI>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default PayAccount