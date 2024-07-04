import { ButtonSearchUI, InputUI, SelectUI } from '@/components'
import React from 'react'

interface Props{
    title:string,
    id:string
}

const BuyAccountDetail = () => {
  return (
    <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-row gap gap-5 w-full'>
                <InputUI value={undefined} isBlockLabel={true} label={"Mã số"}
                classDiv={"w-1/4"} classInput={"w-full"}></InputUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Giá tiền"}
                classDiv={"w-1/4"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Game"}
                classDiv={"w-1/4"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Gamepass"}
                    classDiv={"w-1/4"} classSelect={"w-full"}></SelectUI>
            </div>

            <SelectUI value={undefined} isBlockLabel={true} label={"Sắp xếp theo"}
                classDiv={"w-[23.5%]"} classSelect={"w-full"}></SelectUI>

            <ButtonSearchUI isSearch={true} isAll={true} classDiv={"w-[23.5%] h-9"}></ButtonSearchUI>
        </div>
    </div>
  )
}

export default BuyAccountDetail