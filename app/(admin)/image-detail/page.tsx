"use client"

import { ButtonAddItemUI, ButtonSearchUI, Card, CheckboxUI, DefaultPagination, DeleteModalUI, ImageDetailModalUI, InputUI, LoadingUI, UploadImageForImageDetailModalUI } from '@/components'
import { adminImageDetailTable } from '@/utils/constant/TitleTable/AdminImageDetailTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';

import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";
import Image from 'next/image'
import { displayDateTime, isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { imageDetailApiRequest } from '@/apiRequests/image-detail';
import { showToast } from '@/utils/showToast';
import { ImageDetailDto } from '@/apiRequests/DataDomain/ImageDetail/ImageDetailDto';

const ImageDetail = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [columnsData]=useState<HeaderItem[]>(adminImageDetailTable);
    const [tableData, setTableData]=useState<ImageDetailDto[]>([]);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchConditions, setSearchConditions]=useState<string[]>(["Active=true"]);
    const [active, setActive] = useState<boolean>(true);
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
    const [idImageDetail, setIdImageDetail] = useState<string>('');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenImageModel, setIsOpenImageModel] = useState<boolean>(false);

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 5;

    const openModel=()=>
        setIsOpenModel(!isOpenModel);

    const openDeleteModal=()=>
        setIsOpenDeleteModal(!isOpenDeleteModal);

    const openImageModel=()=>
        setIsOpenImageModel(!isOpenImageModel);

    const openCreateModal=()=>{
        setIdImageDetail('');

        openModel();
    }
    
    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoading(true);

        try{
            const formData:FormData = new FormData(event.currentTarget);
            let searches:string[]=[];

            if(!isNullOrEmpty(formData.get("Active")?.toString())){
                searches.push("Active=true");
            }
            else{
                searches.push("Active=false");
            }
        
            if(!isNullOrEmpty(formData.get("Code")?.toString())){
                searches.push("Code="+formData.get("Code")?.toString());
            }
        
            setSearchConditions(searches);

            await imageDetailApiRequest.getAllImageDetail({search:searches.join('&'), pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.imageDetails);
                
                setMetaData(res.payload.data.metaData);
        
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
        }
    }

    const getAllImageDetailInit=async ():Promise<void> => {
        setIsLoading(true);
        try{
            ref.current?.reset();
            setActive(true);
            setSearchConditions(["Active=true"]);
      
            await imageDetailApiRequest.getAllImageDetail({search:'Active=true', pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.imageDetails);
                
                setMetaData(res.payload.data.metaData);
        
                setIsLoading(false);
            })
        }catch(error){
            console.log(error);
    
            setIsLoading(false);
        }
    }

    const refreshAllImageDetail=async (): Promise<void> =>{
        setIsLoading(true);

        try{
            await imageDetailApiRequest.getAllImageDetail({search:searchConditions.join('&'), pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.imageDetails); 
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllImageDetailByPageNumber=async (pageNumber:number):Promise<void> => {
        setIsLoading(true);
        
        try{
            await imageDetailApiRequest.getAllImageDetail({search:searchConditions.join('&'), pageNumber:pageNumber}).then((res)=>{
                setTableData(res.payload.data.imageDetails); 
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleChange = ()=> {
        setActive(!active);
    }

    const deleteImageDetail=async ():Promise<void> => {
        setIsLoading(true);
    
        try{
            await imageDetailApiRequest.deleteImageDetail(idImageDetail).then((res)=>{
                if(res.payload.data){
                    showToast("success", <p>{res.payload.message.replace("{Item}", "ảnh")}</p>)
                    openDeleteModal()
                    refreshAllImageDetail();
                }
                else{
                    showToast("error", <p>{res.payload.message}</p>)
                }
        
                setIsLoading(true);
            });
        }
        catch(error){
            console.log(error);
            showToast("error", <p>Lỗi Server. Vui lòng liên hệ Quản trị viên.</p>);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getAllImageDetailInit();
    }, [setTableData])

    return (
        <>
            {isOpenDeleteModal && (<DeleteModalUI closeModal={openDeleteModal} title={'danh mục'} eventDeleteItem={deleteImageDetail}></DeleteModalUI>)}

            {isOpenImageModel && (<UploadImageForImageDetailModalUI closeModel={openImageModel} idImageDetail={idImageDetail} refreshAllImageDetailUpdate={refreshAllImageDetail}></UploadImageForImageDetailModalUI>)}

            {isOpenModel && (<ImageDetailModalUI closeModal={openModel} idImageDetail={idImageDetail} 
            refreshAllCategoryCreate={getAllImageDetailInit} refreshAllCategoryUpdate={refreshAllImageDetail}></ImageDetailModalUI>)}

            <Card className={"w-full pb-10 p-4 h-full"}>
                <header className="relative">
                    <form className='flex flex-col gap-5' onSubmit={onSubmit} ref={ref}>
                        <div className='flex flex-row w-full gap-10'>
                            <InputUI name='Code' isBlockLabel={false} label={"Mã số :"} classDiv={"w-[30%]"} classInput={"w-[80%]"} classLabel={"w-[20%]"}></InputUI>

                            <CheckboxUI name='Active' isChecked={active} label={"Hiệu lực :"} classDiv={"w-[16%]"} classLabel={"w-2/5"}
                            onChangeEvent={handleChange}></CheckboxUI>
                        </div>

                        <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllImageDetailInit}></ButtonSearchUI>
                    </form>
                </header>

                {isLoading?(<div className='mt-8 h-[58vh]'><LoadingUI></LoadingUI></div>):(
                    <>
                        <div className='mt-8 flex justify-end'>
                            <ButtonAddItemUI titleButton={'Tạo'} eventButtonClicked={openCreateModal} ></ButtonAddItemUI>
                        </div>

                        <div className="mt-8 w-full h-[50vh] overflow-auto">
                            <table {...getTableProps()} className='w-full'>
                                <thead className='sticky top-0 z-10 bg-white shadow-custom'>
                                    {headerGroups.map((headerGroup:any, index:number) => (
                                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                            {headerGroup.headers.map((column:any, index:any) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    key={index}
                                                    className="border-b border-gray-200 pr-4 pb-[10px] text-start"
                                                >
                                                    <div className="flex w-full justify-between pr-4 text-base tracking-wide text-gray-600">
                                                        {column.render("TitleHeader")}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody {...getTableBodyProps()}>
                                    {page.map((row:any, index:number) => {
                                        prepareRow(row);

                                        return (
                                            <tr {...row.getRowProps()} key={index}>
                                                {row.cells.map((cell:any, index:any) => {
                                                    let data;

                                                    if (cell.column.Header === "CODE") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 pr-4 w-[12rem]">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "DESCRIPTION") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[15rem] pr-4">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "ACTIVE") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[7rem] flex justify-center items-center">
                                                                <CheckboxUI disabled={true} isChecked={cell.value}></CheckboxUI>
                                                            </p>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "PATHURL") {
                                                        data = (
                                                            <div className='w-[10rem] pr-4'>
                                                                {cell.value && <Image alt='' src={cell.value} width={0} height={0} sizes="100vw" 
                                                                style={{ width: '100%', height: '100%' }}></Image>}
                                                            </div>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "CREATEDDATEUTC") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[10rem]">
                                                                {displayDateTime(cell.value)}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "UPDATEDDATEUTC") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[10rem]">
                                                                {displayDateTime(cell.value)}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "ACTION") {
                                                        data = (
                                                            <div className='flex flex-row w-[7rem] gap-3'>
                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();                                       
                                                                    setIdImageDetail(cell.value);
                                                                    openImageModel();
                                                                }}>
                                                                    <ArrowUpTrayIcon className='h-[25px] w-[25px] text-blue-600'></ArrowUpTrayIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    setIdImageDetail(cell.value);
                                                                    openModel();
                                                                }}>
                                                                    <PencilSquareIcon className='h-[25px] w-[25px] text-green-500'></PencilSquareIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    setIdImageDetail(cell.value);
                                                                    openDeleteModal();
                                                                }}>
                                                                    <TrashIcon className='h-[25px] w-[25px] text-red-600'></TrashIcon>
                                                                </Button>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                    <td
                                                        className="pt-[14px] pb-[20px] sm:text-[14px]"
                                                        {...cell.getCellProps()}
                                                        key={index}
                                                    >
                                                        {data}
                                                    </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <footer className='pt-5 border-t border-gray-200'>
                    <DefaultPagination 
                        currentPage={metaData.currentPage}
                        totalPages={metaData.totalPages}
                        hasPrevious={metaData.hasPrevious}
                        hasNext={metaData.hasNext} 
                        EventClickSwitchPage={getAllImageDetailByPageNumber}>                    
                    </DefaultPagination>
                </footer>
            </Card>
        </>
    )
}

export default ImageDetail