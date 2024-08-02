import { ButtonSearchUI, FromToDateUI, InputUI, SelectUI, TableShowData, TitleRecharge } from '@/components'
import { titleTableRecharge_RechargeHistory } from '@/utils/constant/TitleTableRecharge'
import React from 'react'

const RechargeHistory = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp thẻ tự động'}></TitleRecharge>

        <div className='flex flex-col gap-5 w-full'>
            <FromToDateUI startDate={null} endDate={null} label={"Từ ngày ~ Đến ngày"} isBlockLabel={true}
            classDiv={'w-[66%]'} classDateTime={"w-full"}></FromToDateUI>

            <div className='flex flex-row gap gap-5 w-full'>
                <InputUI value={undefined} isBlockLabel={true} label={"Thẻ cào"}
                classDiv={"w-2/6"} classInput={"w-full"}></InputUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Loại thẻ"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Trạng thái"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>
            </div>

            <ButtonSearchUI isSearch={true} isAll={true} classDiv={"w-[25%] h-9"}></ButtonSearchUI>
        </div>

        <TableShowData thItems={titleTableRecharge_RechargeHistory} trItems={[]}></TableShowData>
    </div>
  )
}

export default RechargeHistory