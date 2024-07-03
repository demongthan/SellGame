import { ButtonSearchUI, FromToDateUI, InputUI, TitleRecharge } from '@/components'
import React from 'react'

const PurchasedScratchCard = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Tài khoản đã mua'}></TitleRecharge>

        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-row gap-5'>
                <InputUI value={undefined} isBlockLabel={true} label={"Mã tài khoản"}
                classDiv='w-2/6' classInput='w-full'></InputUI>

                <FromToDateUI startDate={null} endDate={null} label={"Từ ngày ~ Đến ngày"} isBlockLabel={true}
                classDiv='w-4/6' classDateTime='w-full'></FromToDateUI>
            </div>

            <ButtonSearchUI classDiv={'w-[12%] h-9'} isAll={false} isSearch={true}></ButtonSearchUI>
        </div>
    </div>
  )
}

export default PurchasedScratchCard