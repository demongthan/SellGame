import React from 'react'
import TitleService from './Common/TitleService'
import CardGame from './Common/CardGame'

const GameService = () => {
  return (
    <div className='flex flex-col gap-5 h-full w-full'>
        <div>
            <TitleService title={'Dịch vụ game'} ></TitleService>
        </div>
        <div className='flex flex-row gap-10 w-full float-none overflow-hidden'>
            <CardGame></CardGame>
            <CardGame></CardGame>
            <CardGame></CardGame>
            <CardGame></CardGame>
        </div>
    </div>
  )
}

export default GameService