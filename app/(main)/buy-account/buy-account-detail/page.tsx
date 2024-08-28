"use client"

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { ButtonSearchUI, CardGameDetail, DefaultPagination, DescriptionDisplay, InputUI, LoadingUI, SelectUI, TitleService } from '@/components'
import { orderSearch, OrderSearchValue } from '@/utils/constant/Search/OrderSearch';
import { priceSearch, PriceSearchValue } from '@/utils/constant/Search/PriceSearch';
import { PropertiesItemJson, PropertiesJson, ValueKey } from '@/utils/types/PropertiesJson';
import { isNullOrEmpty } from '@/utils/utils';

import { useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'


const BuyAccountDetail = () => {
    const params = useSearchParams();
    const idCategory:string | undefined= params.get("id")?.split(',')[1];
    const pathTitles:any= params.get("title")?.split(',');
    const [fields]=useState<string>("Fields=PathUrl%2CProperties%2CDiscount%2CPrice%2CCode");

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

    const [searchConditions, setSearchConditions]=useState<string[]>([])

    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
    const [accGameDetails, setAccGameDetails]=useState<AccGameDetailDto[]>([]);
    const [propertySearches, setPropertySearches]= useState<PropertiesJson[]>([]);
    const [description, setDescription]=useState<string>("");

    const [code, setCode]=useState<string>("");
    const [money, setMoney]=useState<PriceSearchValue>();
    const [order, setOrder]=useState<OrderSearchValue>();
    const [propertyItems, setPropertyItems]=useState<ValueKey[]>([]);

    const getAllAccGameDetail=async()=>{
        setIsLoadingSearch(true);

        try{
            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:idCategory, search:'', pageNumber:1, fields:fields}).then((res)=>{
                setAccGameDetails(res.payload.data.accGameDetails); 
                setMetaData(res.payload.data.metaData);
                setIsLoadingSearch(false);
            })
        }
        catch(error){
            setIsLoadingSearch(false);
            console.log(error);
        }
    }

    const getAllAccGameDetailByPageNumber=async(pageNumber:number)=>{
        setIsLoadingSearch(true);

        try{
            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:idCategory, search:searchConditions.join('&'), pageNumber:pageNumber, fields:fields}).then((res)=>{
                setAccGameDetails(res.payload.data.accGameDetails); 
                setMetaData(res.payload.data.metaData);
                setIsLoadingSearch(false);
            })
        }
        catch(error){
            setIsLoadingSearch(false);
            console.log(error);
        }
    }

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoadingSearch(true);

        try{
            const formData = new FormData(event.currentTarget);
            let searches:string[]=[];

            if(!isNullOrEmpty(formData.get("Code")?.toString())){
                searches.push("Code="+formData.get("Code")?.toString());
            }

            if(!isNullOrEmpty(formData.get("Price")?.toString())){
                const price=priceSearch.find(_=>_.Name==formData.get("Price")?.toString());

                if(price?.MaxValue!=null){
                    searches.push("MaxPrice="+price.MaxValue.toString());
                }

                if(price?.MinValue!=null){
                    searches.push("MinPrice="+price.MinValue.toString());
                }
            }

            if(!isNullOrEmpty(formData.get("Order")?.toString())){
                const order=orderSearch.find(_=>_.Name==formData.get("Order")?.toString())
                
                searches.push("Order="+order?.Value);
            }

            if(propertySearches.length>0){
                let properties:PropertiesItemJson[]=[];

                propertySearches.forEach((property)=>{
                    if(!isNullOrEmpty(formData.get(property.Key)?.toString())){
                        properties.push({Name: property.Key, Value: formData.get(property.Key)?.toString()})
                    }
                })
                
                if(properties.length>0){
                    searches.push("Properties="+JSON.stringify(properties));
                }
            }

            setSearchConditions(searches);

            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:idCategory, search:searches.join('&'), pageNumber:1, fields:fields}).then((res)=>{
                setAccGameDetails(res.payload.data.accGameDetails); 
                setMetaData(res.payload.data.metaData);
            })

            setIsLoadingSearch(false);
        }
        catch(error){
            setIsLoadingSearch(false);
            console.log(error);
        }
    }

    const getAllAccGameDetailInit=async():Promise<void>=>{
        try{
            await accGameDetailApiRequest.getAllAccGamesDetailInit(idCategory).then((res)=>{
                const properties:PropertiesJson[]=JSON.parse(res.payload.data.properties);

                setPropertyItems(new Array(properties.length).fill({Name:""}));
                setPropertySearches(properties);
                setAccGameDetails(res.payload.data.accGameDetails); 
                setMetaData(res.payload.data.metaData);
                setDescription(res.payload.data.description);
                setIsLoading(false);
            })
        }
        catch(error){
            setIsLoadingSearch(false);
            console.log(error);
        }
    }

    const handleChange = (name:string, index: number) => (e: any) => {
        switch (name) {
            case "code":
                setCode(e.target.value);
                break;
            case "money":
                setMoney(e);
                break;
            case "order":
                setOrder(e);
                break;
            case "property":
                propertyItems[index]=e;
                setPropertyItems([...propertyItems]);
                break;
            default:
              break;
          }
    }

    useEffect(()=>{
        getAllAccGameDetailInit();
    }, [setPropertySearches, setAccGameDetails, setMetaData, setIsLoading, setDescription])

    if(isLoading){
        return (
            <div className='h-[73vh]'>
                <LoadingUI></LoadingUI>
            </div>
        )
    }

  return (
    <div className='flex flex-col gap-10 w-full float-none overflow-hidden pb-4'>
        <TitleService title={pathTitles?pathTitles[pathTitles.length-1]:""} ></TitleService>

        <DescriptionDisplay content={description}></DescriptionDisplay>

        <form className='flex flex-col gap-5 w-full' onSubmit={onSubmit}>
            <div className='grid grid-cols-4 gap-x-5 w-full'>
                <InputUI value={code} name={"Code"} isBlockLabel={true} label={"Mã số"} 
                classInput={"w-full"} onChangeEvent={handleChange("code", 0)}></InputUI>
            
                <SelectUI selected={money} label={"Giá tiền"} name={"Price"} data={priceSearch}
                onChangeEvent={handleChange("money", 0)}></SelectUI>

                {propertySearches && propertySearches.map((property, index)=>(
                    <SelectUI selected={propertyItems[index]} key={index} label={property.Name} data={property.Value} name={property.Key}
                    onChangeEvent={handleChange("property", index)}></SelectUI>
                ))}

                <SelectUI selected={order} label={"Sắp xếp theo"} name={"Order"} data={orderSearch}
                onChangeEvent={handleChange("order", 0)}></SelectUI>
            </div>
            
            <ButtonSearchUI classDiv={"w-[23.5%] h-9"} eventButtonAllClick={getAllAccGameDetail}></ButtonSearchUI>
        </form>
        
        {isLoadingSearch ?(<div className='h-[50rem]'><LoadingUI></LoadingUI></div>):(
            <>
                <div className='grid grid-cols-4 gap-4 w-full'>
                    {accGameDetails && accGameDetails.map((accGameDetail, index)=>(
                        <CardGameDetail key={index}
                        urlImage={accGameDetail.PathUrl ? accGameDetail.PathUrl : ''}
                        properties={JSON.parse(accGameDetail.Properties)}
                        discount={accGameDetail.Discount}
                        titleButton={'Mua ngay'}
                        price={accGameDetail.Price}
                        code={accGameDetail.Code} 
                        urlButton={`/buy-account/buy-account-detail/pay-account?title=${params.get("title")},Thanh toán&id=${params.get("id")},${accGameDetail.Id}`}>
                        </CardGameDetail>
                    ))}
                </div>
            </>
        )}
        
        <DefaultPagination currentPage={metaData.currentPage}
          totalPages={metaData.totalPages}
          hasPrevious={metaData.hasPrevious}
          hasNext={metaData.hasNext} EventClickSwitchPage={getAllAccGameDetailByPageNumber}
          ></DefaultPagination>
    </div>
  )
}

export default BuyAccountDetail