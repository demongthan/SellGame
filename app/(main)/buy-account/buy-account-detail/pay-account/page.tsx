'use client'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from 'next/navigation'
import React, {useEffect, useState } from 'react'
import parse from 'html-react-parser';

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail'
import { AccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/AccGameDetailDto'
import { ButtonV2UI, CardGameDetail, CarouselThumbs, LoadingUI, ProductImage, TitleService } from '@/components'
import { PropertyAccGameDetail } from '@/utils/types/Json/PropertyAccGameDetail'

const PayAccount = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [properties, setProperties]=useState<PropertyAccGameDetail[]>([]);
    const [accGameDetail, setAccGameDetail] = useState<AccGameDetailDto>();
    const [accGameDetails, setAccGameDetails] = useState<AccGameDetailDto[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useSearchParams();
    const idAccGameDetail:string | undefined= params.get("id")?.split(',').at(-1);
    const title:string | undefined= params.get("title")?.split(',').at(-2);
    const [fields]=useState<string>("&fields=PathUrl%2CProperties%2CDiscount%2CPrice%2CCode%2CDescription%2CDescriptionDetail%2CId%2CType%2CDeposit");

    const getPayAccGameInit=async (): Promise<void>=>{
        try{
            await accGameDetailApiRequest.getPayAccGameInit({id:idAccGameDetail, fields:fields}).then((res)=>{
                setAccGameDetail(res.payload.data.accGameDetail);
                setProperties(JSON.parse(res.payload.data.accGameDetail.Properties));
                setGallery(res.payload.data.urlImages);
                setAccGameDetails(res.payload.data.accGameDetails);
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
                    <div className='flex flex-row gap-10'>
                        <div className='flex flex-col w-2/5'>
                            <ProductImage gallery={gallery} thumbsSwiper={thumbsSwiper} />
                            <CarouselThumbs gallery={gallery} setThumbsSwiper={setThumbsSwiper} />
                        </div>

                        <div className='flex flex-col w-3/5 gap-5'>
                            <div className='bg-s2cyan1 p-3 mx-3'>
                                <p className='text-lg font-medium text-stone-950'>Mã số: <span className='text-white pl-2 text-base font-bold'>{accGameDetail?.Code}</span></p>
                                <p className='text-base font-medium text-stone-950'>Danh mục: <span className='text-white pl-2 text-sm font-bold'>{title}</span></p>
                            </div>

                            <div className='mx-3'>
                                <table className='table-fixed border w-full'>
                                    <thead>
                                        <tr className='bg-s2blue3 leading-6 w-full'>
                                            {(accGameDetail && accGameDetail.Discount==0)?(
                                                <th className='text-left p-3 w-[45%] text-stone-600 text-base'>Giá chỉ <br></br> <strong>{accGameDetail.Price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong></th>
                                            ):(
                                                <th className='text-left p-3 w-[45%]'>
                                                    <span className='text-lg font-medium text-stone-600'>Giá chỉ</span> <br></br> 
                                                    <span className='line-through text-base font-medium text-black'>{accGameDetail?.Price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                                    <span className='pl-2 text-red-500 text-base font-medium'>{(accGameDetail?(accGameDetail.Price*(100-accGameDetail.Discount)/100):0).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                                </th>
                                            )}
                                            <th className='p-3 w-[10%] text-base font-medium text-stone-600'>Hoặc</th>
                                            <th className='text-right p-3 w-[45%] text-base font-medium text-stone-600'>Đặt cọc <br></br> <p className='text-base font-medium text-black'>{accGameDetail?.Deposit.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p></th>
                                        </tr>
                                    </thead>
                                </table>

                                <div className='overflow-y-auto scrollbar-hide h-[100px]'>
                                    <table className='table-fixed w-full border'>
                                        <tbody>
                                            {properties && properties.map((property, index)=>(
                                                <tr key={index} className='text-black border-b w-full'>
                                                    <td className='p-3 flex flex-row w-1/2'><ChevronRightIcon className='w-[1.2rem] h-[1.2rem] mt-[3px]'></ChevronRightIcon> <span className='inline-block font-semibold'>{property.Name}</span></td>
                                                    <td colSpan={2} className='w-1/2'>{property.Value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            

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
                    
                    <div className='grid grid-cols-4 w-full'>
                        {accGameDetails && accGameDetails.map((accGame, index)=>(
                            <CardGameDetail key={index}
                            urlImage={accGame.PathUrl ? accGame.PathUrl : ''}
                            properties={JSON.parse(accGame.Properties)}
                            discount={accGame.Discount}
                            titleButton={'Mua ngay'}
                            price={accGame.Price}
                            code={accGame.Code}
                            description={accGame.Description}
                            urlButton={`/buy-account/buy-account-detail/pay-account?title=${params.get("title")},Thanh toán&id=${params.get("id")},${accGame.Id}`} 
                            type={accGame.Type}>
                            </CardGameDetail>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default PayAccount