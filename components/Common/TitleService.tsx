import React from 'react'

interface Props{
    title:string
}

const TitleService = ({title}:Props) => {
  return (
    <div className='flex flex-col items-center justify-center text-black text-3xl font-semibold py-1'>
        <h2>{title}</h2>
        <div className='w-20 h-1 bg-cyan-450 mt-1'></div>
    </div>
  )
}

export default TitleService