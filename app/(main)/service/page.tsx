import { ButtonSearchUI, InputUI } from '@/components'
import CardGame from '@/components/Common/CardGame'
import React from 'react'

const Service = () => {
  return (
    <div className='flex flex-col gap-10'>
        <div className='flex flex-row gap-5 w-full'>
            <InputUI value={undefined} isBlockLabel={true} label={"Tìm kiếm"}
            classDiv={"w-1/4"} classInput={"w-full"}></InputUI>
            <ButtonSearchUI isSearch={true} isAll={true}
            classDiv={"w-1/5 h-[2.3rem] relative top-[2.2rem]"}></ButtonSearchUI>
        </div>

        <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
            <CardGame isDiscount={true} isButtonImage={true}></CardGame>
            <CardGame isDiscount={true} isButtonImage={true}></CardGame>
            <CardGame isDiscount={true} isButtonImage={true}></CardGame>
            <CardGame isDiscount={true} isButtonImage={true}></CardGame>
        </div>
    </div>
  )
}

export default Service