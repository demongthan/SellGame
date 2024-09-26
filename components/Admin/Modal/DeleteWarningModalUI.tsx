import { Button } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    closeModal:()=>void,
    title:string,
    description:string,
    eventDeleteItem:()=>Promise<void>,
    isDelete:boolean
}

const DeleteWarningModalUI = ({closeModal, title, eventDeleteItem, description, isDelete}:Props) => {
  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 bg-model left-0 z-[300] justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto px-8 py-6 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                <div className="md:flex items-center">
                    <div className={`rounded-full border ${isDelete?"border-red-600":"border-orange-400"} flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto`}>
                        <ExclamationTriangleIcon className={`w-[2rem] h-[2rem] ${isDelete?"text-red-600":"text-orange-400"}`}></ExclamationTriangleIcon>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="font-bold text-base">{title}</p>
                        <p className="text-sm text-gray-700 mt-2">{description} Không thể hoàn tác hành động này?
                        </p>
                    </div>
                </div>

                <div className="text-center md:text-right mt-8 md:flex md:justify-end">
                    <Button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-600 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();
                        eventDeleteItem();
                    }}>
                        Xác nhận
                    </Button>

                    <Button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();
                        closeModal();
                    }}>
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteWarningModalUI