"use client"

import { AccGameDetailModalUI, ButtonAddItemUI, ButtonSearchUI, Card, CheckboxUI, DefaultPagination, InputUI, LoadingUI, SelectUI } from '@/components'
import { HeaderItem } from '@/utils/constant/TitleTable/types';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";
import Image from 'next/image'
import { displayDateTime, isNullOrEmpty } from '@/utils/utils';
import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { adminAccGameDetailTable } from '@/utils/constant/TitleTable/AdminAccGameDetailTable';
import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';

const AccGameDetail = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
    const [columnsData]=useState<HeaderItem[]>(adminAccGameDetailTable);
    const [tableData, setTableData]=useState<AccGameDetailDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchConditions, setSearchConditions]=useState<string[]>([]);
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false);

    const [active, setActive] = useState<boolean>(true);
    const [category, setCategory]=useState<any>({Name:"", Value:""});
    const [categorySearch, setCategorySearch]=useState<ItemSelect[]>([]);
    const [code, setCode]=useState<string>();
    

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

    const openModal=()=>
        setIsOpenModel(!isOpenModel);

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

            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:category.Value, search:searches.join('&'), pageNumber:1, 
                fields:"Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc"}).then((res)=>{
                setTableData(res.payload.data.accGameDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllAccGameDetailByPageNumber=async (pageNumber:number):Promise<void> => {
        setIsLoading(true);

        try{
            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:category.Value, search:searchConditions.join('&'), pageNumber:pageNumber, 
                fields:"Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc"}).then((res)=>{
                setTableData(res.payload.data.accGameDetails);
                setMetaData(res.payload.data.metaData);
                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllAccGameDetail=async ():Promise<void> => {
        setIsLoading(true);

        try{
            setActive(true);
            setCode('');
            setSearchConditions([]);
            setCategory(categorySearch[0]);

            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:categorySearch[0].Value, search:searchConditions.join('&'), pageNumber:1, 
                fields:"Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc"}).then((res)=>{
                setTableData(res.payload.data.accGameDetails);
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
            case "category":
                setCategory(e);
                break;
            case "code":
                setCode(e.target.value);
                break;
            default:
                break;
        }
    }

    const getAllAccGameDetailInit=async ():Promise<void>=>{
        try{
            await accGameDetailApiRequest.getAllAccGameDetailForAdminInit().then((res)=>{
                setTableData(res.payload.data.accGameDetails);
                setMetaData(res.payload.data.metaData);

                const itemSelects:ItemSelect[]=res.payload.data.selectSearchItems.map(({...item})=>({
                    Name:item.name,
                    Value:item.value
                }))
                setCategorySearch(itemSelects);
                setCategory(itemSelects?itemSelects[0]:{Name:"", Value:""});

                setIsLoading(false);
            })
        }
        catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getAllAccGameDetailInit();
    }, [setTableData, setMetaData, setCategorySearch, setIsLoading])

    return (
        <>
            {isOpenModel && (<AccGameDetailModalUI closeModal={openModal} idAccGameDetail={undefined} idCategory={category.Value} 
            refreshAllAccGameDetailCreate={getAllAccGameDetail}></AccGameDetailModalUI>)}

            <Card className={"w-full pb-10 p-4 h-full"}>
                <header className="relative">
                    <form className='flex flex-col gap-5' onSubmit={onSubmit} ref={ref}>
                        <div className='flex flex-row w-full gap-10'>
                            <SelectUI isBlockLabel={false} label={"Loại :"} name={"Category"} data={categorySearch} selected={category}
                            classDiv={"w-[30%]"} classLabel={"w-[20%]"} classSelect={"w-[80%]"} onChangeEvent={setCategory}></SelectUI>

                            <InputUI name='Code' value={code} onChangeEvent={handleChange("code")} isBlockLabel={false} label={"Mã số :"} classDiv={"w-[30%]"} classInput={"w-[80%]"} classLabel={"w-[20%]"}></InputUI>

                            <CheckboxUI name='Active' isChecked={active} label={"Hiệu lực :"} classDiv={"w-[16%]"} classLabel={"w-2/5"}
                            onChangeEvent={handleChange("active")}></CheckboxUI>
                        </div>

                        <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllAccGameDetail}></ButtonSearchUI>
                    </form>
                </header>

                {isLoading?(<div className='mt-8 h-[58vh]'><LoadingUI></LoadingUI></div>):(
                    <>
                        <div className='mt-8 flex justify-end'>
                            <ButtonAddItemUI titleButton={'Tạo'} eventButtonClicked={openModal} ></ButtonAddItemUI>
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
                                                            <p className="text-sm text-navy-700 pr-4 w-[15rem]">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "PRICE") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[12rem] pr-4">
                                                                {cell.value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                                            </p>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "DISCOUNT") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[7rem] pr-4">
                                                                {cell.value}%
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "DEPOSIT") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[12rem] pr-4">
                                                                {cell.value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
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
                        EventClickSwitchPage={getAllAccGameDetailByPageNumber}>                    
                    </DefaultPagination>
                </footer>
            </Card>
        </>
    )
}

export default AccGameDetail