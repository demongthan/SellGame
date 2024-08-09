"use client"

import { ServiceDetailDto } from '@/apiRequests/DataDomain/ServiceDetail/ServiceDetailDto';
import { serviceDetailApiRequest } from '@/apiRequests/service-detail';
import { ButtonAddItemUI, ButtonSearchUI, Card, CheckboxUI, DefaultPagination, InputUI, LoadingUI, MethodCalculateDisplay, RatingDisplay, ServiceDetailModalUI } from '@/components'
import { adminServiceDetailTable } from '@/utils/constant/TitleTable/AdminServiceDetailTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';
import { displayDateTime, isNullOrEmpty } from '@/utils/utils';

import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import Image from 'next/image'
import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";

const ServiceDetail = () => {
    const [columnsData]=useState<HeaderItem[]>(adminServiceDetailTable);
    const [tableData, setTableData]=useState<ServiceDetailDto[]>([]);

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

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [idServiceDetail, setIdServiceDetail] = useState<string>('');
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
    const [searchConditions, setSearchConditions]=useState<string[]>(["Active=true"]);

    const [active, setActive] = useState<boolean>(true);
    const [name, setName] = useState<string>("");

    const openModel=()=>
        setIsOpenModel(!isOpenModel);

    const openCreateModal=()=>{
        setIdServiceDetail('');

        openModel();
    }
    
    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoading(true);

        try{
            let searches:string[]=[];
            
            searches.push(active?"Active=true":"Active=false");
        
            if(!isNullOrEmpty(name)){
                searches.push("Name="+name);
            }
        
            setSearchConditions(searches);

            await serviceDetailApiRequest.getAllServiceDetail({search:searches.join("&"), pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.serviceDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleChange = (name:string) => (e: any) => {
        switch (name) {
            case "active":
                setActive(e.target.isChecked);
                break;
            case "name":
                setName(e.target.value);
                break;
            default:
                break;
        }
    }

    const getAllServiceDetailTotal=async ():Promise<void>=>{
        setIsLoading(true);
        try{
            setName("");
            setActive(true);
            setSearchConditions([]);

            await serviceDetailApiRequest.getAllServiceDetail({search:"", pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.serviceDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllServiceDetailByPageNumber=async (pageNumber:number):Promise<void>=>{
        setIsLoading(true);
        try{
            await serviceDetailApiRequest.getAllServiceDetail({search:searchConditions.join("&"), pageNumber:pageNumber}).then((res)=>{
                setTableData(res.payload.data.serviceDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllServiceDetailInit=async ():Promise<void>=>{
        try{
            await serviceDetailApiRequest.getAllServiceDetail({search:"", pageNumber:1}).then((res)=>{
                setTableData(res.payload.data.serviceDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        getAllServiceDetailInit();
    },[setTableData, setMetaData, setIsLoading])
    
    return (
        <>
            <ServiceDetailModalUI closeModal={function (): void {
                throw new Error('Function not implemented.');
            } } idServiceDetail={''} refreshAllServiceDetailCreate={function (): Promise<void> {
                throw new Error('Function not implemented.');
            } } refreshAllServiceDetailUpdate={function (): Promise<void> {
                throw new Error('Function not implemented.');
            } }></ServiceDetailModalUI>

            <Card className={"w-full pb-10 p-4 h-full"}>
                <header className="relative">
                    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                        <div className='flex flex-row w-full gap-10'>
                            <InputUI value={name} name='Code' isBlockLabel={false} label={"Mã số :"} classDiv={"w-[30%]"} 
                            classInput={"w-[80%]"} classLabel={"w-[20%]"} onChangeEvent={handleChange("name")}></InputUI>

                            <CheckboxUI name='Active' isChecked={active} label={"Hiệu lực :"} classDiv={"w-[16%]"} classLabel={"w-2/5"}
                            onChangeEvent={handleChange("active")}></CheckboxUI>
                        </div>

                        <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllServiceDetailTotal}></ButtonSearchUI>
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

                                                    if (cell.column.Header === "NAME") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 pr-4 w-[20rem]">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "TRANSACTION") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[10rem] pr-4">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "METHOD") {
                                                        data = (
                                                            <MethodCalculateDisplay methodCalculate={cell.value}></MethodCalculateDisplay>
                                                        );
                                                    }else if (cell.column.Header === "UNITPRICE") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[10rem] pr-4">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "UNIT") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[6rem] pr-4">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "RATING") {
                                                        data = (
                                                          <RatingDisplay rating={cell.value} className={"w-[8rem]"}></RatingDisplay>
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
                                                                    
                                                                }}>
                                                                    <ArrowUpTrayIcon className='h-[25px] w-[25px] text-blue-600'></ArrowUpTrayIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    
                                                                }}>
                                                                    <PencilSquareIcon className='h-[25px] w-[25px] text-green-500'></PencilSquareIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    
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
                        EventClickSwitchPage={getAllServiceDetailByPageNumber}>                    
                    </DefaultPagination>
                </footer>
            </Card>
        </>
    )
}

export default ServiceDetail