"use client"

import { ButtonV1UI, InputUI, SelectUI, TableShowData, TitleRecharge } from '@/components'
import { cardTypeSelect } from '@/utils/constant/CardTypeSelect'
import { faceValueCardSelect } from '@/utils/constant/FaceValueCardSelect'
import { titleTableRecharge_AutoRecharge } from '@/utils/constant/TitleTableRecharge'
import { ItemSelect } from '@/utils/types/SelectItem'
import { generateThreeDigitNumber } from '@/utils/utils'
import { Button, Input } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

const AutoRecharge = () => {
  const [cardType, setCardType] = useState<ItemSelect>(cardTypeSelect[0]);
  const [valueCardType, setValueCardType] = useState<ItemSelect>(faceValueCardSelect[0]);
  const [cardNumber, setCardNumber]=useState<string>("");
  const [serialNumber, setSerialNumber]=useState<string>("");
  const [securityCode, setSecurityCode]=useState<string>("");
  const [autoSecurityCode, setAutoSecurityCode]=useState<string>(generateThreeDigitNumber().toString())

  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Nạp thẻ tự động'}></TitleRecharge>

        <div className='flex flex-col items-center gap-5'>
          <SelectUI selected={cardType} data={cardTypeSelect} isBlockLabel={false} label={"Loại thẻ:"} classDiv='w-3/5'
          classLabel='w-1/5' classSelect='w-4/5'></SelectUI>

          <SelectUI selected={valueCardType} data={faceValueCardSelect} isBlockLabel={false} label={"Mệnh giá:"} classDiv='w-3/5'
          classLabel='w-1/5' classSelect='w-4/5'></SelectUI>

          <InputUI value={undefined} isBlockLabel={false} label={"Mã số thẻ:"} classDiv={"w-3/5"}
          classLabel={"w-1/5"} classInput={"w-4/5"}></InputUI>

          <InputUI value={undefined} isBlockLabel={false} label={"Số serial:"}
          classDiv={"w-3/5"} classLabel={"w-1/5"} classInput={"w-4/5"}></InputUI>

          <div className='flex flex-row w-3/5 gap-3'>
              <InputUI value={undefined} isBlockLabel={false} label={"Mã bảo vệ:"} classDiv={"w-4/5"} classLabel={"w-1/4"} classInput={"w-3/4"}></InputUI>
              <Input value={autoSecurityCode} className={"w-[15%] flex justify-center h-9 px-auto"}></Input>
              <Button className='flex justify-center items-center -mt-2 w-[5%]'><ArrowPathIcon className='w-[1.5rem] h-[1.5rem] text-black'></ArrowPathIcon></Button>
          </div>
          <ButtonV1UI title={'Nạp thẻ'} className={"w-3/5 h-9"}></ButtonV1UI>
        </div>

        <TableShowData thItems={titleTableRecharge_AutoRecharge} trItems={[]}></TableShowData>
    </div>
  )
}

export default AutoRecharge