import React from 'react'
import TitleService from '../Common/TitleService'
import CardGame from '../Common/CardGame'

const GameCategory = () => {
  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Danh mục game'} ></TitleService>
        </div>
        <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
            <CardGame isDiscount={false}></CardGame>
            <CardGame isDiscount={false}></CardGame>
            <CardGame isDiscount={false}></CardGame>
            <CardGame isDiscount={false}></CardGame>
        </div>
    </div>
  )
}

export default GameCategory