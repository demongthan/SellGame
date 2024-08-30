import { createArrayFromRange } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react'

interface Props{
  currentPage:number,
  totalPages:number,
  hasPrevious:boolean,
  hasNext:boolean,
  EventClickSwitchPage:(numberPage:number)=>void
}

const DefaultPagination = ({hasPrevious, hasNext, totalPages, currentPage, EventClickSwitchPage}:Props) => {
  let start:number=0;
  let end:number=0;

  if(currentPage<totalPages-4){
    start=currentPage;
    end=currentPage+3;
  }
  else{
    start=totalPages-4;
    end=totalPages-1;
  }

  const arrPages:number[]=createArrayFromRange(start,end);

  return (

    <nav className="flex justify-center items-center gap-x-3" aria-label="Pagination">
      <Button disabled={!hasPrevious} 
        onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
          event.preventDefault();
          EventClickSwitchPage(currentPage-1);
        }}
      type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center 
      gap-x-2 text-sm rounded-lg border border-cyan-400 text-gray-800 hover:bg-cyan-400 hover:text-white focus:outline-none focus:bg-cyan-400 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>Trước</span>
      </Button>

      <div className="flex items-center gap-x-3">
        {arrPages && arrPages.map((page, index) =>(
          <Button key={index} type="button" 
          onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
            event.preventDefault();
            if(page==currentPage) return;
            EventClickSwitchPage(page);
          }}
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center 
            ${page==currentPage?"bg-cyan-400 text-white":"text-gray-800 hover:bg-cyan-400 hover:text-white"}  
          py-2 px-3 text-sm rounded-lg border border-cyan-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none`} 
          aria-current={`${page==currentPage?"page":"false"}`}>{page}</Button>
        ))}

        {currentPage<totalPages-4 && (<div className="hs-tooltip inline-block">
          <Button type="button" className="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 
          hover:text-blue-600 p-2 text-sm rounded-lg focus:outline-none focus:bg-cyan-400 disabled:opacity-50 disabled:pointer-events-none">
            <span className="group-hover:hidden text-xs">•••</span>
            <svg className="group-hover:block hidden shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 17 5-5-5-5"></path>
              <path d="m13 17 5-5-5-5"></path>
            </svg>
          </Button>
        </div>)}

        <Button type="button" 
          onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
            event.preventDefault();
            EventClickSwitchPage(totalPages);
          }}
        className={`min-h-[38px] min-w-[38px] flex justify-center items-center 
        ${totalPages==currentPage?"bg-cyan-400 text-white":"text-gray-800 hover:bg-cyan-400 hover:text-white"} 
        py-2 px-3 text-sm rounded-lg border border-cyan-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none`}>{totalPages}</Button>
      </div>

      <Button disabled={!hasNext} 
        onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
          event.preventDefault();
          EventClickSwitchPage(currentPage+1);
        }}
      type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg border border-cyan-400
       text-gray-800 hover:bg-cyan-400 hover:text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
        <span>Sau</span>
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </Button>
    </nav>
  )
}

export default DefaultPagination