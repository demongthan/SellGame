import { Button } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    closeModal:()=>void,
    title:string,
    eventDeleteItem:()=>Promise<void>
}

const DeleteModalUI = ({closeModal, title, eventDeleteItem}:Props) => {
  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 bg-model left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <Button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                    event.preventDefault();
                    
                    closeModal();
                }}>
                    <XMarkIcon className="w-6 h-6"></XMarkIcon>
                    <span className="sr-only">Close modal</span>
                </Button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{`Bạn có chắc chắn muốn xóa ${title} này?`}</h3>

                    <Button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
                    focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();
                        
                        eventDeleteItem();
                    }}>
                        Vâng, tôi chắc chắn
                    </Button>

                    <Button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
                    focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 
                    focus:ring-gray-100" onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                        event.preventDefault();
                        
                        closeModal();
                    }}>Không, hủy</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModalUI