import { MenuRecharge } from '@/components'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-row w-[90%] sm:w-[70%] h-[85vh] mx-auto pb-20 gap-10'>
        <div className='w-1/5'>
            <MenuRecharge></MenuRecharge>
        </div>
        <div className='w-4/5'>
            {children}
        </div>
    </div>
  )
}

export default layout