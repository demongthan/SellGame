"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { systemParameterApiRequest } from '@/apiRequests/system-parameter';
import { ButtonSearchUI, InputUI, SelectUI } from '@/components'

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const BuyAccountDetail = () => {
    const params = useSearchParams();
    const idCategory:string | null= params.get("id");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [properties, setProperties]= useState<PropertiesJson[]>([{Key:"", Name:"", Value:[{Name:"Không có dữ liệu"}]}]);
    const [priceSearch, setPriceSearch]=useState<PropertiesJson>({Key:"Price", Name:"Giá tiền", Value:[{Name:"Không có dữ liệu"}]});
    const [orderSearch, setOrderSearch]=useState<PropertiesJson>({Key:"Order", Name:"Sắp xếp theo", Value:[{Name:"Không có dữ liệu"}]});


    const getProperties=async():Promise<void>=>{
        try{
            await categoryApiRequest.getCategoryPropertiesById(idCategory).then((res)=>{
                setProperties(JSON.parse(res.payload.data.Properties));
            })

            await systemParameterApiRequest.getSystemParameterByCode("SELECTVALUEPRICE").then((res)=>{
                setPriceSearch(JSON.parse(res.payload.data.Content))
            });

            await systemParameterApiRequest.getSystemParameterByCode("SELECTVALUEORDER").then((res)=>{
                setOrderSearch(JSON.parse(res.payload.data.Content));
            });
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getProperties();
    }, [setOrderSearch, setProperties, setPriceSearch])

  return (
    <div className='flex flex-col gap-10 w-full float-none overflow-hidden'>
        <form className='grid grid-cols-4 gap-5 w-full'>
            <InputUI name={"Code"} isBlockLabel={true} label={"Mã số"} classInput={"w-full"}></InputUI>
        
            {priceSearch && <SelectUI label={priceSearch.Name} name={priceSearch.Key} data={priceSearch.Value}></SelectUI>}

            {properties && properties.map((property, index)=>(
                <SelectUI key={index} label={property.Key}
                data={property.Value}></SelectUI>
            ))
            }

            {orderSearch && <SelectUI label={orderSearch.Name} name={orderSearch.Key} data={orderSearch.Value}></SelectUI>}
        </form>

        <ButtonSearchUI classDiv={"w-[23.5%] h-9"}></ButtonSearchUI>
    </div>
  )
}

export default BuyAccountDetail