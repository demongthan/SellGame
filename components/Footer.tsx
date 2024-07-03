import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDaysIcon, ChartBarIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/20/solid'

const Footer = () => {
  return (
    <div className='bg-black h-[50rem]'>
        <div className='flex flex-col w-[90%] sm:w-[70%] mx-auto pt-14 gap-40'>
            <div className='flex flex-auto flex-row gap-10 pd-[10%]'>
                <div className='border p-4 rounded-md bg-[#373535] w-1/3 h-[50%]'>
                    <div className='flex items-center justify-center h-1/5 pb-5'>
                        <Image src={"https://cdn.upanh.info/storage/upload/images/LOGO-NICK-VN.png"} 
                        alt="" width={0} height={0} sizes="100vw" style={{ width: '50%', height: '100%' }}></Image>
                    </div>

                    <div>
                        <p className='text-base'>
                            <span className='text-s2yellow1'>Chào Mừng Bạn Đến Với <Link href={"/"}>Nick.vn</Link></span>
                            <br></br>
                            <strong className='text-[#66ff00]'>
                                <span>* Shop mua bán nick Liên Quân, Tốc chiến, Đột Kích, Roblox, FiFa, Ngọc Rồng, Liên Minh, Ninja School uy tín, giá rẻ</span>
                                <br></br>
                                <span>* Làm nhiệm vụ, cày thuê tự động</span>
                                <br></br>
                                <span>* Mua xu, Nạp kim cương, quân huy giá rẻ, chiết khấu cao</span>
                                <br></br>
                                <span className='text-white'>&nbsp;Thời Gian Làm Việc: <span className='text-[#66ff00]'>8h-12h</span> & <span className='text-[#66ff00]'>13h30-22h</span></span>
                            </strong>
                            <Image src={"https://images.dmca.com/Badges/_dmca_premi_badge_4.png?ID=a76b2905-32bf-4460-8b80-2c5caa6b7ab7"} 
                            alt="" width={0} height={0} sizes="100vw" className='pl-2' style={{ width: '30%', height: '10%' }}></Image>
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 w-1/3'>
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-row w-1/2'>
                            <CalendarDaysIcon className='text-[#66ff00] w-14 h-14 border'></CalendarDaysIcon>
                            <strong className='p-1 pl-3 text-center'>
                                <span className='text-s2yellow1 text-base'>2 năm</span>
                                <br></br>
                                <span className='text-[#66ff00] text-base'>Hoạt động</span>
                            </strong>
                        </div>

                        <div className='flex flex-row w-1/2'>
                            <UserGroupIcon className='text-[#66ff00] w-14 h-14 border'></UserGroupIcon>
                            <strong className='p-1 pl-3 text-center'>
                                <span className='text-s2yellow1 text-base'>224.333</span>
                                <br></br>
                                <span className='text-[#66ff00] text-base'>Thành viên</span>
                            </strong>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-row w-1/2'>
                            <ShoppingBagIcon className='text-[#66ff00] w-14 h-14 border'></ShoppingBagIcon>
                            <strong className='p-1 pl-3 text-center'>
                                <span className='text-s2yellow1 text-base'>110.865</span>
                                <br></br>
                                <span className='text-[#66ff00] text-base'>Nick đã bán</span>
                            </strong>
                        </div>

                        <div className='flex flex-row w-1/2'>
                            <ChartBarIcon className='text-[#66ff00] w-14 h-14 border'></ChartBarIcon>
                            <strong className='p-1 pl-3 text-center'>
                                <span className='text-s2yellow1 text-base'>1.358.696</span>
                                <br></br>
                                <span className='text-[#66ff00] text-base'>Lượt vào shop</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div>
                    <strong>
                        <span className='text-s2yellow1'>Menu Shop Game</span>
                        <p className='text-s2blue1'>
                            <span>* Bán Acc Roblox</span>
                        </p>
                    </strong>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center text-white border-t pt-3 gap-3'>
                <p>© Copyright 2023 - <Link href={"/"}>Privacy Policy</Link> - <Link href={"/"}> Terms of Service</Link></p>
                <p>Operated by <Link className='text-s2cyan1' href={"/"}>Kitio</Link>, All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer