import { ButtonV1UI, InputUI, SelectUI, TableShowData, TitleRecharge } from '@/components'
import { titleTableRecharge_AutoRecharge } from '@/utils/constant/TitleTableRecharge'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React from 'react'

const AutoRecharge = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp thẻ tự động'}></TitleRecharge>

        <div className='flex flex-col items-center gap-5'>
            <SelectUI value={undefined} isBlockLabel={false} label={"Loại thẻ:"} classDiv='w-3/5'
            classLabel='w-1/5' classSelect='w-4/5'></SelectUI>

            <SelectUI value={undefined} isBlockLabel={false} label={"Mệnh giá:"} classDiv='w-3/5'
            classLabel='w-1/5' classSelect='w-4/5'></SelectUI>

            <InputUI value={undefined} isBlockLabel={false} label={"Mã số thẻ:"} classDiv={"w-3/5"}
            classLabel={"w-1/5"} classInput={"w-4/5"}></InputUI>

            <InputUI value={undefined} isBlockLabel={false} label={"Số serial:"}
            classDiv={"w-3/5"} classLabel={"w-1/5"} classInput={"w-4/5"}></InputUI>

            <div className='flex flex-row w-3/5'>
                <InputUI value={undefined} isBlockLabel={false} label={"Số serial:"} classDiv={"w-4/5"} classLabel={"w-1/4"} classInput={"w-3/4"}></InputUI>
                <div className='w-1/5 relative'>
                    <p></p>
                    <button className='float-right h-full'><ArrowPathIcon className='w-[1.5rem] h-[1.5rem] text-black'></ArrowPathIcon></button>
                </div>
            </div>

            <ButtonV1UI title={'Nạp thẻ'} className={"w-3/5"}></ButtonV1UI>
        </div>

        <TableShowData thItems={titleTableRecharge_AutoRecharge} trItems={[]}></TableShowData>
    </div>
  )
}

export default AutoRecharge