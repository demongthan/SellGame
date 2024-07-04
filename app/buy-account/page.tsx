import CardGame from '@/components/Common/CardGame'
import React from 'react'

interface Props{
  title:string
}

const BuyAccount = ({title}:Props) => {
  return (
    <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
      <CardGame isDiscount={true} isButtonImage={true}></CardGame>
      <CardGame isDiscount={true} isButtonImage={true}></CardGame>
      <CardGame isDiscount={true} isButtonImage={true}></CardGame>
      <CardGame isDiscount={true} isButtonImage={true}></CardGame>
    </div>
  )
}

export default BuyAccount