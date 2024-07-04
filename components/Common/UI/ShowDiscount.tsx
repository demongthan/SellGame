import React from 'react'

const ShowDiscount = () => {
  return (
    <div className="absolute -top-2 -right-2 w-[3.2rem] h-[6rem]">
        <div className='bg-s2red3 border-l-2 border-r-2 border-white text-center px-1 pt-2'>
            <span className='text-yellow-300 font-semibold text-base'>-50%</span>
        </div>
        <div className="w-[3rem] h-[3rem] overflow-hidden inline-block">
            <div className="h-[1.75rem] w-[3em] bg-s2red3 border-2 border-white -rotate-45 transform origin-top-left"></div>
        </div>
    </div>
  )
}

export default ShowDiscount