import { BreadCrumb } from '@/components'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col w-[92%] sm:w-[70%] mx-auto pb-20 gap-10'>
    <BreadCrumb></BreadCrumb>

    <div className='w-full'>{children}</div>
    </div>
  )
}

export default layout