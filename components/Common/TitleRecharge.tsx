import React from 'react'

interface Props{
    title:string
}

const TitleRecharge = ({title}:Props) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='text-3xl font-semibold text-gray-760'>
            {title}
        </div>
        <div className='w-28 h-1 bg-red-750'>  
        </div>
    </div>
  )
}

export default TitleRecharge