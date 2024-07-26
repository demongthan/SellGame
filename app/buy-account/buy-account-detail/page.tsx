"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { ButtonSearchUI, InputUI, SelectUI } from '@/components'

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const BuyAccountDetail = () => {
    const params = useSearchParams();
    const idCategory:string | null= params.get("id");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [properties, setProperties]= useState<PropertiesJson[]>([])


    const getProperties=async():Promise<void>=>{
        try{
            const res=await categoryApiRequest.getCategoryPropertiesById(idCategory);

            const propertiesCategoryJson:string | undefined=res.payload.data.Properties;

            setProperties(JSON.parse(propertiesCategoryJson));
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getProperties();
    }, [])

  return (
    <div className='flex flex-col gap-10 w-full float-none overflow-hidden'>
        <div className='grid grid-cols-4 gap-5 w-full'>
            <InputUI value={undefined} isBlockLabel={true} label={"Mã số"}
            classInput={"w-full"}></InputUI>
        
            <SelectUI value={undefined} isBlockLabel={true} label={"Giá tiền"}
                data={[]} selected={''} setSelected={[]}></SelectUI>

            {properties && properties.map((property, index)=>(
                <SelectUI key={index} value={undefined} isBlockLabel={true} label={property.Key}
                data={property.Value} selected={''} setSelected={[]}></SelectUI>
            ))
            }

            <SelectUI value={undefined} isBlockLabel={true} label={"Sắp xếp theo"}
                data={[]} selected={''} setSelected={[]}></SelectUI>
        </div>

        <ButtonSearchUI isSearch={true} isAll={true} classDiv={"w-[23.5%] h-9"}></ButtonSearchUI>
    </div>
  )
}

export default BuyAccountDetail