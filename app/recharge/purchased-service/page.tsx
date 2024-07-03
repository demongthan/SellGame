"use client"

import { ButtonSearchUI, FromToDateUI, InputUI, SelectUI, TableShowData, TitleRecharge } from '@/components'
import { titleTableRecharge_PurchasedService } from '@/utils/TitleTableRecharge';
import React from 'react'

const PurchasedService = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Dịch vụ đã mua'}></TitleRecharge>

        <div className='flex flex-col gap-5 w-full'>
            <FromToDateUI startDate={null} endDate={null} label={"Từ ngày ~ Đến ngày"} isBlockLabel={true}
            classDiv={'w-[66%]'} classDateTime={"w-full"}></FromToDateUI>

            <div className='flex flex-row gap gap-5 w-full'>
                <InputUI value={undefined} isBlockLabel={true} label={"Mã tài khoản"}
                classDiv={"w-2/6"} classInput={"w-full"}></InputUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Giá tiền"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Game"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>
            </div>

            <ButtonSearchUI isSearch={true} isAll={true} classDiv={"w-[25%] h-9"}></ButtonSearchUI>
        </div>

        <TableShowData thItems={titleTableRecharge_PurchasedService} trItems={[]}></TableShowData>
    </div>
  )
}

export default PurchasedService