import { ButtonSearchUI, FromToDateUI, InputUI, SelectUI, TitleRecharge } from '@/components'
import React from 'react'

const DepositHistory = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Lịch sử đặt cọc'}></TitleRecharge>

        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-row gap-5'>
                <InputUI value={undefined} isBlockLabel={true} label={"Mã tài khoản"}
                classDiv={"w-[33%]"} classInput={"w-full"}></InputUI>

                <FromToDateUI startDate={null} endDate={null} label={"Từ ngày ~ Đến ngày"} isBlockLabel={true}
                classDiv={"w-[68%]"} classDateTime={"w-full"}></FromToDateUI>
            </div>

            <div className='flex flex-row gap gap-5 w-full'>
                <SelectUI value={undefined} isBlockLabel={true} label={"Trạng thái"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Giá tiền"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>

                <SelectUI value={undefined} isBlockLabel={true} label={"Game"}
                classDiv={"w-2/6"} classSelect={"w-full"}></SelectUI>
            </div>

            <ButtonSearchUI isSearch={true} isAll={true} classDiv={"w-[25%] h-9"}></ButtonSearchUI>
        </div>
    </div>
  )
}

export default DepositHistory