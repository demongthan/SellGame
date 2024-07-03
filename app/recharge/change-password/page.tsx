import { ButtonV1UI, InputUI, TitleRecharge } from '@/components'
import React from 'react'

const ChangePassword = () => {
  return (
    <div className='flex flex-col gap-10'>
        <TitleRecharge title={'Đổi mật khẩu'}></TitleRecharge>
        
        <form className="space-y-6 w-1/2" action="#" method="POST">
            <InputUI value={undefined} isBlockLabel={true} label={"Mật khẩu"} placeholder={"Nhập mật khẩu"}
            classInput={"w-full"}></InputUI>

            <InputUI value={undefined} isBlockLabel={true} label={"Mật khẩu mới"}
            classInput={"w-full"} placeholder={"Nhập mật khẩu mới"}></InputUI>

            <InputUI value={undefined} isBlockLabel={true} label={"Xác nhận mật khẩu mới"}
            classInput={"w-full"} placeholder={"Xác nhận mật khẩu mới"}></InputUI>

            <div>
                <ButtonV1UI title={'Xác nhận'} className={"w-full"}></ButtonV1UI>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword