"use client"

import TitleService from '@/components/Common/TitleService'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { ButtonV1UI, CardGame, InputUI, LoadingUI, SelectUI } from '@/components';
import { ServiceDetailDto } from '@/apiRequests/DataDomain/ServiceDetail/ServiceDetailDto';
import { useSearchParams } from 'next/navigation';
import { serviceDetailApiRequest } from '@/apiRequests/service-detail';
import { ServiceDetailPrice, ServiceDetailProperties } from '@/utils/types/PropertiesJson';
import { MethodCalculate } from '@/utils/types/MethodCalculate';
import { isNullOrEmpty } from '@/utils/utils';

const PayService = () => {
    const [serviceDetail, setServiceDetail]=useState<ServiceDetailDto>();
    const [services, setServices]=useState<ServiceDetailDto[] |null>(null);
    const [properties, setProperties]=useState<ServiceDetailProperties[]>([]);
    const [price, setPrice]=useState<number>(0);

    const params = useSearchParams();
    const pathTitles:any= params.get("title")?.split(',');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pathIds:any= params.get("id")?.split(',');

    const [serviceDetailPrice, setServiceDetailPrice]=useState<ServiceDetailPrice>(
        {
            Price:0, 
            Coefficient:0, 
            SelectPrice:{Name:"", Value:""},
            TitleCoefficient:{Name:""},
            SelectCoefficient:{Name:""}
        }
    );

    const [isInput, setIsInput]=useState<boolean>(false);
    const [isInputCoefficient, setIsInputCoefficient]=useState<boolean>(false);
    const [isSelectCoefficient, setIsSelectCoefficient]=useState<boolean>(false);
    const [isSelect, setIsSelect]=useState<boolean>(false);

    const getServiceDetailInit=async (): Promise<void> => {
        try{
            await serviceDetailApiRequest.getPayServiceInit({id:pathIds.at(-1), fields:"?fields=Name%2CMethod%2CUnitPrice%2CUnit%2CPathUrl%2CProperties"}).then((res)=>{
                setServiceDetail(res.payload.data.serviceDetail);
                setProperties(JSON.parse(res.payload.data.serviceDetail.Properties));

                const method:MethodCalculate=res.payload.data.serviceDetail.Method;

                setIsInput(method!=MethodCalculate.Input);
                setIsInputCoefficient(method==MethodCalculate.InputCoefficient);
                setIsSelectCoefficient(method==MethodCalculate.InputSelectCoefficient);
                setIsSelect(method==MethodCalculate.Select);

                let calPrice:number=0;
                switch(method) {
                    case MethodCalculate.Input:
                        serviceDetailPrice.Price=FindServiceDetailProperties("Input").MinValue;
                        setServiceDetailPrice({...serviceDetailPrice});

                        calPrice=(serviceDetailPrice.Price?serviceDetailPrice.Price:0)/(serviceDetail?serviceDetail.UnitPrice:1);
                        setPrice(calPrice);
                        break;
                    case MethodCalculate.InputCoefficient:
                        serviceDetailPrice.Price=FindServiceDetailProperties("Input").MinValue;
                        serviceDetailPrice.Coefficient=FindServiceDetailProperties("InputCoefficient").Coefficient;
                        setServiceDetailPrice({...serviceDetailPrice});

                        calPrice=((serviceDetailPrice.Price?serviceDetailPrice.Price:0)*(serviceDetailPrice.Coefficient?serviceDetailPrice.Coefficient:0))/(serviceDetail?serviceDetail.UnitPrice:1);
                        setPrice(calPrice);
                        break;
                    case MethodCalculate.InputSelectCoefficient:
                        serviceDetailPrice.Price=FindServiceDetailProperties("Input").MinValue;
                        serviceDetailPrice.Coefficient=Number(FindServiceDetailProperties("SelectCoefficient").SelectCoefficient?.at(0)?.Name);
                        serviceDetailPrice.SelectCoefficient=FindServiceDetailProperties("SelectCoefficient").SelectCoefficient?.at(0);
                        serviceDetailPrice.TitleCoefficient=FindServiceDetailProperties("SelectCoefficient").TitleCoefficient?.at(0);
                        setServiceDetailPrice({...serviceDetailPrice});

                        calPrice=((serviceDetailPrice.Price?serviceDetailPrice.Price:0)*(serviceDetailPrice.Coefficient?serviceDetailPrice.Coefficient:0))/(serviceDetail?serviceDetail.UnitPrice:1);
                        setPrice(calPrice);
                        break;
                    case MethodCalculate.Select:
                        serviceDetailPrice.Price=Number(FindServiceDetailProperties("Select").SelectPrice?.at(0)?.Value);
                        serviceDetailPrice.SelectPrice=FindServiceDetailProperties("Select").SelectPrice?.at(0);
                        setServiceDetailPrice({...serviceDetailPrice});

                        calPrice=(serviceDetailPrice.Price?serviceDetailPrice.Price:0)/(serviceDetail?serviceDetail.UnitPrice:1);
                        setPrice(calPrice);
                        break;
                    default:
                        break;
                }

                setServices(res.payload.data.ServiceDetails);
                setIsLoading(false);
            });
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const FindServiceDetailProperties=(key:string):ServiceDetailProperties=>{
        const index=properties.findIndex(_=>_.Key==key);
        return properties[index];
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "priceInput":
                if (/^\d*\.?\d*$/.test(e.target.value.replace(",", ""))) {
                    serviceDetailPrice.Price=e.target.value.replace(",", "");
                    setServiceDetailPrice({...serviceDetailPrice})
                }
                break;
            case "selectCoefficient":
                serviceDetailPrice.TitleCoefficient=e;

                const index=FindServiceDetailProperties("SelectCoefficient").TitleCoefficient?.findIndex(_=>_.Name==e.Name);
                serviceDetailPrice.SelectCoefficient=index?FindServiceDetailProperties("SelectCoefficient").SelectCoefficient?.at(index):{Name:""};

                setServiceDetailPrice({...serviceDetailPrice})
                break;
            case "selectPrice":
                serviceDetailPrice.SelectPrice=e;
                setServiceDetailPrice({...serviceDetailPrice});
                break;
            default:
                break;
        }
    }

    const handleBlur =(e:any)=>{
        if(isNullOrEmpty(e.target.value)){
            serviceDetailPrice.Price=FindServiceDetailProperties("Input").MinValue;
            setServiceDetailPrice({...serviceDetailPrice})
        }
    }

    useEffect(() => {
        getServiceDetailInit();
    }, [setServiceDetail])

  return (
    <div className='flex flex-col gap-10'>
        <TitleService title={`Dịch vụ ${pathTitles.at(-1)}`}></TitleService>

        {isLoading?(<div className='h-[56vh]'><LoadingUI></LoadingUI></div>):(
            <>
                <div className='flex flex-row gap-10 h-[12rem]'>
                    <div className='w-2/5'>
                        <Image src={serviceDetail?.PathUrl?serviceDetail.PathUrl:""} 
                        alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
                        <div className='pt-3'>
                            <CalendarDaysIcon className='w-[1.5rem] h-[1.5rem] inline-block'></CalendarDaysIcon>
                            <strong className='pl-3 relative top-1'>{serviceDetail?.Name}</strong>
                        </div>  
                    </div>

                    <div className='flex flex-col w-[30%] gap-3'>
                        {isSelectCoefficient && (
                            <SelectUI 
                                data={FindServiceDetailProperties("SelectCoefficient").TitleCoefficient} 
                                label={FindServiceDetailProperties("SelectCoefficient").Name}
                                selected={serviceDetailPrice.TitleCoefficient}
                                onChangeEvent={handleChange("selectCoefficient")}
                                classDiv='w-full'>
                            </SelectUI>
                        )}

                        {isSelect && (
                            <SelectUI 
                                data={FindServiceDetailProperties("Select").SelectPrice}
                                label={FindServiceDetailProperties("Select").Name}
                                selected={handleChange("selectPrice")}
                            ></SelectUI>
                        )}

                        {isInput && (
                            <div>
                                <InputUI value={serviceDetailPrice.Price?.toLocaleString('en')} isBlockLabel={true} label={"Nhập số tiền cần mua"}
                                classDiv={"w-full"} classInput={"w-[85%] text-right"} onChangeEvent={handleChange("priceInput")} onBlurEvent={handleBlur}
                                unit='VND' classUint='w-[15%] text-s2cyan1' classDivUnit='w-full'></InputUI>
                                <span className='text-xs'>Số tiền thanh toán phải từ 
                                    <strong> {FindServiceDetailProperties("Input").MinValue?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong> đến 
                                    <strong> {FindServiceDetailProperties("Input").MaxValue?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</strong>
                                </span>
                            </div>
                        )}

                        {isInputCoefficient && (
                            <InputUI value={serviceDetailPrice.Coefficient} isBlockLabel={true} label={"Hệ số"} classDiv='w-full' classInput='w-full' isDisabled={true}></InputUI>
                        )}

                        {isSelectCoefficient && (
                            <SelectUI data={FindServiceDetailProperties("SelectCoefficient").SelectCoefficient} 
                                label={FindServiceDetailProperties("SelectCoefficient").Name}
                                selected={serviceDetailPrice.SelectCoefficient}
                                classDiv='w-full'>
                            </SelectUI>
                        )}
                    </div>

                    <div className='flex flex-col w-[30%] gap-5'>
                        <div className='w-full h-[4rem] bg-s2red4 text-lg font-semibold text-white rounded-md flex justify-center items-center'><span>Tổng: {price.toLocaleString('en')} {serviceDetail?.Unit}</span></div>
                        <ButtonV1UI className={"flex items-center justify-center w-full h-[4rem] bg-s2cyan1"} title='Mua ngay' isIconCard={true}></ButtonV1UI>
                    </div>
                </div>

                <div className='border-t mt-5 pt-5'>
                    <p className='text-2xl font-semibold'>Mô tả</p>
                </div>

                <div>
                    <TitleService title={'Dịch vụ khác'}></TitleService>

                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {services && services?.map((service, index)=>(
                            <CardGame 
                                key={index}
                                totalSale={service.Transaction}
                                rating={service.Rating}
                                name={service.Name}
                                urlImage={service.PathUrl}
                                titleButton={"Mua ngay"}
                                urlButton={`/service/pay-service?title=Dịch vụ`}
                                id={service.Id} 
                                isGame={false}>
                            </CardGame>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default PayService