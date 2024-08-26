"use client"

import React from 'react'
import CardMenuRecharge from '../CardMenuRecharge'
import { menuRechargeAccount, menuRechargeTransaction } from '@/utils/constant/Menu/MenuAccount'
import { usePathname } from 'next/navigation'

const MenuRecharge = () => {
  const pathname:string =usePathname();

  return (
    <div className='flex flex-col gap-5'>
        <div>
          <CardMenuRecharge title={menuRechargeAccount.title} itemMenus={menuRechargeAccount.item} url={pathname}></CardMenuRecharge>
        </div>

        <div>
          <CardMenuRecharge title={menuRechargeTransaction.title} itemMenus={menuRechargeTransaction.item} url={pathname}></CardMenuRecharge>
        </div>
    </div>
  )
}

export default MenuRecharge