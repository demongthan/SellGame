import React from 'react'
import CardMenuRecharge from '../Common/CardMenuRecharge'
import { menuRechargeAccount, menuRechargeTransaction } from '@/utils/MenuAccount'

const MenuRecharge = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div>
            <CardMenuRecharge title={menuRechargeAccount.title} itemMenus={menuRechargeAccount.item}></CardMenuRecharge>
        </div>

        <div>
        <CardMenuRecharge title={menuRechargeTransaction.title} itemMenus={menuRechargeTransaction.item}></CardMenuRecharge>
        </div>
    </div>
  )
}

export default MenuRecharge