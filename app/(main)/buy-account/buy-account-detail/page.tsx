"use client"

import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { AccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/AccGameDetailDto';
import { ButtonSearchUI, CardGameDetail, DefaultPagination, DescriptionDisplay, InputSearchUI, InputUI, LoadingUI, SelectSearchUI, SelectUI, TitleService } from '@/components'
import { orderSearch, OrderSearchValue } from '@/utils/constant/Search/OrderSearch';
import { priceSearch, PriceSearchValue } from '@/utils/constant/Search/PriceSearch';
import { PropertiesJson } from '@/utils/types/Json/PropertiesJson';
import { PropertySearch } from '@/utils/types/Json/PropertySearch';
import { ValueKey } from '@/utils/types/Json/ValueKey';
import { ItemSelect } from '@/utils/types/SelectItem';
import { isNullOrEmpty } from '@/utils/utils';
import { XMarkIcon } from '@heroicons/react/20/solid';

import { useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'


const BuyAccountDetail = () => {
    const params = useSearchParams();
    const idCategory:string | undefined= params.get("id")?.split(',')[1];
    const pathTitles:any= params.get("title")?.split(',');
    const [fields]=useState<string>("Fields=PathUrl%2CProperties%2CDiscount%2CPrice%2CCode%2CDescription%2CId");

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

    const [searchConditions, setSearchConditions]=useState<string[]>([]);
    const [propertySearchItems, setPropertySearchItems] = useState<PropertySearch[]>([]);

    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
    const [accGameDetails, setAccGameDetails]=useState<AccGameDetailDto[]>([]);
    const [propertySearches, setPropertySearches]= useState<PropertiesJson[]>([]);
    const [description, setDescription]=useState<string>("");

    const [valueSelectPrices]= useState<ItemSelect[]>(priceSearch.map((value:PriceSearchValue)=>({Name:value.Name, Value:value.Name})));
    const [valueSelectOrders]= useState<ItemSelect[]>(orderSearch.map((value:OrderSearchValue)=>({Name:value.Name, Value:value.Value})));

    const [code, setCode]=useState<string>("");
    const [money, setMoney]=useState<ItemSelect>();
    const [order, setOrder]=useState<ItemSelect>();
    const [propertyItems, setPropertyItems]=useState<ItemSelect[]>([]);

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

            if(!isNullOrEmpty(code)){
                searches.push("Code="+code);
            }

            if(!isNullOrEmpty(money?.Value)){
                const price=priceSearch.find(_=>_.Name==money?.Name);

                if(price?.MaxValue!=null){
                    searches.push("MaxPrice="+price.MaxValue.toString());
                }

                if(price?.MinValue!=null){
                    searches.push("MinPrice="+price.MinValue.toString());
                }
            }

            if(!isNullOrEmpty(order?.Value)){    
                searches.push("Order="+order?.Value);
            }

            if(propertySearches.length>0){
                let propertySearchItems:PropertySearch[]=[];

                
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
            await accGameDetailApiRequest.getAllAccGamesDetailInit({idCategory:idCategory, fields:fields}).then((res)=>{
                const properties:PropertiesJson[]=JSON.parse(res.payload.data.properties);

                setPropertyItems(new Array(properties.length).fill({Name:"", Value:""}));
                setPropertySearchItems(properties?properties.map((property:PropertiesJson)=>({IdProperty:property.Id, IdPropertyDetails:[]})):[]);
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

    const handleClickPropertyDetail=(index:number, indexItem:number)=>{
        propertySearchItems[index].IdPropertyDetails=[...propertySearchItems[index].IdPropertyDetails.slice(0, indexItem), ...propertySearchItems[index].IdPropertyDetails.slice(indexItem + 1)];
        setPropertySearchItems([...propertySearchItems]);
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

            <form className='flex flex-col gap-10 w-full' onSubmit={onSubmit}>
                <div className='grid grid-cols-3 gap-5 w-full px-2'>
                    <InputSearchUI 
                        value={code} name={"Code"} label={"Mã số"} classDiv='w-full' classLabel='w-[30%]' classInput='w-[70%]'
                        onChangeEvent={handleChange("code", 0)}>
                    </InputSearchUI>
                
                    <SelectSearchUI 
                        selected={money} label={"Giá tiền"} name={"Price"} data={valueSelectPrices} classDiv='w-full' 
                        classLabel='w-[30%]' classSelect='w-[70%]' onChangeEvent={handleChange("money", 0)}>
                    </SelectSearchUI>

                    {propertySearches && propertySearches.map((property, index)=>{
                        let data;

                        if(property.IsSearch){
                            const valueSelects:ItemSelect[]=property.Value?property.Value.map((property:ValueKey)=>({Name:property.Name, Value:property.Id, PathUrl:property.PathUrl})):[];

                            if(property.IsOnly){
                                data=(
                                    <SelectSearchUI 
                                        selected={propertyItems[index]} key={index} label={property.Name} data={[{Name:"", Value:""}, ...valueSelects]}
                                        classDiv='w-full' classLabel='w-[30%]' classSelect='w-[70%]' onChangeEvent={handleChange("property", index)}>
                                    </SelectSearchUI>
                                )
                            }
                            else{
                                data=(
                                    <div className='grid grid-cols-4 gap-4 border border-s2gray2 rounded-lg text-gray-900 text-sm 
                                    transition-input ease-in-out delay-150 focus:outline-none focus:border-s2cyan1'>
                                        {propertySearchItems[index] && propertySearchItems[index].IdPropertyDetails.map((propertyDetail:ItemSelect, indexItem:number)=>(
                                            <div key={indexItem} className='rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500 flex items-center gap-2'>
                                                {propertyDetail.Name}

                                                <div onClick=
                                                {(event: React.MouseEvent<HTMLDivElement>)=>{
                                                    event.preventDefault();
                                                    handleClickPropertyDetail(index, indexItem);
                                                }}>
                                                    <XMarkIcon className='w-[1rem] h-[1rem]'></XMarkIcon>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        }
                        else{   
                            data="";
                        }

                        return data;
                    })}

                    <SelectSearchUI selected={order} label={"Sắp xếp theo"} name={"Order"} data={valueSelectOrders} 
                    classDiv='w-full' classLabel='w-[30%]' classSelect='w-[70%]' onChangeEvent={handleChange("order", 0)}></SelectSearchUI>
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
                                description={accGameDetail.Description}
                                urlButton={`/buy-account/buy-account-detail/pay-account?title=${params.get("title")},Thanh toán&id=${params.get("id")},${accGameDetail.Id}`}>
                            </CardGameDetail>
                        ))}
                    </div>
                </>
            )}
            
            <DefaultPagination 
                currentPage={metaData.currentPage}
                totalPages={metaData.totalPages}
                hasPrevious={metaData.hasPrevious}
                hasNext={metaData.hasNext} EventClickSwitchPage={getAllAccGameDetailByPageNumber} 
                totalCount={metaData.totalCount}
            ></DefaultPagination>
        </div>
    )
}

export default BuyAccountDetail