"use client"

import { AccGameDetailModalUI, AccGameDetailStatusDisplay, AccGameDetailTypeDisplay, ButtonAddItemUI, ButtonSearchUI, Card, CheckboxUI, DefaultPagination, DeleteWarningModalUI, ImageModal, InputUI, LoadingUI, SelectUI, UploadImageForAccGameDetailModalUI } from '@/components'
import { HeaderItem } from '@/utils/constant/TitleTable/types';
import { displayDateTime, isNullOrEmpty, truncateString } from '@/utils/utils';
import { adminAccGameDetailTable } from '@/utils/constant/TitleTable/AdminAccGameDetailTable';
import { accGameDetailApiRequest } from '@/apiRequests/acc-game-detail';
import { showToast } from '@/utils/showToast';
import { ItemSelect } from '@/utils/types/SelectItem';
import { AdminContextProps, useAdminState } from '@/AppProvider/AdminProvider';
import { AdminDisplay } from '@/utils/types/AdminDisplay';
import { DecodedToken } from '@/utils/types/DecodedToken';
import {accGameDetailStatus } from '@/utils/constant/AccGameDetail/AccGameDetailStatus';
import { AccGameDetailDto } from '@/apiRequests/DataDomain/AccGameDetail/AccGameDetailDto';
import envConfig from '@/config';

import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";
import Image from 'next/image'
import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import jwt from 'jsonwebtoken';
import { accGameDetailType } from '@/utils/constant/AccGameDetail/AccGameDetailType';

const AccGameDetail = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [columnsData]=useState<HeaderItem[]>(adminAccGameDetailTable);
    const [tableData, setTableData]=useState<AccGameDetailDto[]>([]);
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const [flieds]=useState<string>("Fields=Id%2CCode%2CStatus%2CType%2CDescription%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc")

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
    initialState.pageSize = envConfig.NEXT_PUBLIC_PAGE_SIZE;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
    const [isOpenImageModel, setIsOpenImageModel] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    const [active, setActive] = useState<boolean>(true);
    const [category, setCategory]=useState<any>({Name:"", Value:""});
    const [categorySearch, setCategorySearch]=useState<ItemSelect[]>([]);
    const [code, setCode]=useState<string>();
    const [status, setStatus]=useState<any>(accGameDetailStatus[0]);
    const [type, setType]=useState<any>(accGameDetailType[0]);

    const [idAccGameDetail, setIdAccGameDetail]=useState<string>("");
    const [searchConditions, setSearchConditions]=useState<string[]>(["Active=true&Status=1"]);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});

    const {adminDisplay, setAdmin}=useAdminState() as AdminContextProps;


    const openModal=()=>
        setIsOpenModel(!isOpenModel);

    const openDeleteModal=()=>
        setIsOpenDeleteModal(!isOpenDeleteModal);

    const openModelCreate=()=>{
        setIdAccGameDetail("");
        openModal();
    }

    const openImageModel=()=>
        setIsOpenImageModel(!isOpenImageModel);

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        setIsLoading(true);

        try{
            let searches:string[]=[];

            searches.push(active?"Active=true":"Active=false");

            if(!isNullOrEmpty(code)){
                searches.push("Code="+code);
            }

            searches.push("Status="+status.Value);

            setSearchConditions(searches);

            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:category.Value, search:searches.join('&'), pageNumber:1, 
                fields:flieds}).then((res)=>{
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
                fields:flieds}).then((res)=>{
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

    const refreshAllAccGameDetail=async (): Promise<void> => {
        setIsLoading(true);

        try{
            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:category.Value, search:searchConditions.join('&'), pageNumber:metaData.currentPage, 
                fields:flieds}).then((res)=>{
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

            await accGameDetailApiRequest.getAllAccGamesDetail({idCategory:category.Value, search:searchConditions.join('&'), pageNumber:1, 
                fields:flieds}).then((res)=>{
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
            case "status":
                setStatus(e);
                break;
            case "type":
                setType(e);
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
            let admin:AdminDisplay|null;
      
            if(!adminDisplay){
                const response=await fetch('/api/auth/admin',{
                    method: 'GET'
                })
      
                const res= await response.json();
      
                if(res.data){
                    const jwtData=jwt.decode(res.data, { complete: true })?.payload as DecodedToken;
                  
                    admin={
                        displayName:jwtData.sub,
                        token:res.data
                    }
                }
                else{
                    admin=null;
                }
      
                setAdmin(admin);
            }
            else{
              admin=adminDisplay;
            }
      
            if(admin){
                await accGameDetailApiRequest.getAllAccGameDetailForAdminInit({
                    fields:flieds, 
                    token:admin?.token}).then((res)=>{
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
            else{
                setIsLoading(false);
            }
        }catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }

    const deleteAccGameDetail=async ():Promise<void> => {
        setIsLoading(true);
    
        try{
            await accGameDetailApiRequest.deleteAccGameDetail({id:idAccGameDetail, token:adminDisplay?.token}).then((res)=>{
                if(res.payload.data){
                    showToast("success", <p>{res.payload.message.replace("{Item}", "ảnh")}</p>)
                    openDeleteModal()
                    refreshAllAccGameDetail();
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
        getAllAccGameDetailInit();
    }, [setTableData, setMetaData, setCategorySearch, setIsLoading])

    return (
        <>
            {isOpenModel && (<AccGameDetailModalUI closeModal={openModal} idAccGameDetail={idAccGameDetail} idCategory={category.Value}
            refreshAllAccGameDetailCreate={getAllAccGameDetail} refreshAllAccGameDetailUpdate={refreshAllAccGameDetail} adminDisplay={adminDisplay}></AccGameDetailModalUI>)}

            {isOpenDeleteModal && (<DeleteWarningModalUI closeModal={openDeleteModal} title={'Xóa tài khoản game'} 
            eventDeleteItem={deleteAccGameDetail} description={'Bạn có chắn chắn xóa Tài khoản Game.'} isDelete={true}></DeleteWarningModalUI>)}

            {isOpenImageModel && (<UploadImageForAccGameDetailModalUI closeModel={openImageModel} idAccGameDetail={idAccGameDetail}
            refreshAllAccGameDetailUpdate={refreshAllAccGameDetail} adminDisplay={adminDisplay}></UploadImageForAccGameDetailModalUI>)}

            <Card className={"w-full pb-6 p-4 h-full"}>
                <header className="relative">
                    <form className='flex flex-col gap-5' onSubmit={onSubmit} ref={ref}>
                        <div className='flex flex-row w-full gap-10'>
                            <SelectUI isBlockLabel={false} label={"Danh mục :"} name={"Category"} data={categorySearch} selected={category}
                            classDiv={"w-1/3"} classLabel={"w-[20%]"} classSelect={"w-[80%]"} onChangeEvent={handleChange("category")}></SelectUI>

                            <SelectUI isBlockLabel={false} label={"Trạng thái :"} name={"AccGameDetailStatus"} data={accGameDetailStatus} selected={status}
                            classDiv={"w-1/3"} classLabel={"w-[20%]"} classSelect={"w-[80%]"} onChangeEvent={handleChange("status")}></SelectUI>

                            <SelectUI isBlockLabel={false} label={"Loại :"} name={"AccGameDetailType"} data={accGameDetailType} selected={type}
                            classDiv={"w-1/3"} classLabel={"w-[20%]"} classSelect={"w-[80%]"} onChangeEvent={handleChange("type")}></SelectUI>
                        </div>

                        <div className='flex flex-row w-full gap-10'>
                            <InputUI name='Code' value={code} onChangeEvent={handleChange("code")} isBlockLabel={false} label={"Mã số :"} 
                            classDiv={"w-1/3"} classInput={"w-[80%]"} classLabel={"w-[20%]"}></InputUI>

                            <CheckboxUI name='Active' isChecked={active} label={"Hiệu lực :"} classDiv={"w-1/3"} classLabel={"w-1/5"}
                            onChangeEvent={handleChange("active")}></CheckboxUI>

                            <div className='w-1/3'></div>
                        </div>

                        <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllAccGameDetail}></ButtonSearchUI>
                    </form>
                </header>

                {isLoading?(<div className='h-[58vh]'><LoadingUI></LoadingUI></div>):(
                    <>
                        <div className='flex justify-end'>
                            <ButtonAddItemUI titleButton={'Tạo'} eventButtonClicked={openModelCreate} ></ButtonAddItemUI>
                        </div>

                        <div className="mt-4 w-full h-[49vh] overflow-auto">
                            <table {...getTableProps()} className='w-full'>
                                <thead className='sticky top-0 z-10 bg-white shadow-custom'>
                                    {headerGroups.map((headerGroup:any, index:number) => (
                                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                            {headerGroup.headers.map((column:any, index:any) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    key={index}
                                                    className="border-b border-gray-200 pr-4 pb-[15px] pt-[10px] text-start"
                                                >
                                                    <div className="flex w-full justify-between pr-4 text-sm tracking-wide text-gray-600">
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
                                                            <p className="text-sm text-blue-600 pr-4 w-[15rem]">
                                                                {cell.value}
                                                            </p>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "STATUS") {
                                                        data = (
                                                            <AccGameDetailStatusDisplay accGameDetailStatus={cell.value}></AccGameDetailStatusDisplay>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "TYPE") {
                                                        data = (
                                                            <AccGameDetailTypeDisplay accGameDetailType={cell.value}></AccGameDetailTypeDisplay>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "DESCRIPTION") {
                                                        data = (
                                                            <p className="text-sm text-navy-700 w-[25rem] pr-4">
                                                                {cell.value?truncateString(cell.value, 200):""}
                                                            </p>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "PRICE") {
                                                        data = (
                                                            <p className="text-sm text-green-700 w-[7rem] pr-4">
                                                                {cell.value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                                            </p>
                                                        );
                                                    }
                                                    else if (cell.column.Header === "DISCOUNT") {
                                                        data = (
                                                            <p className="text-sm text-red-500 w-[7rem] pr-4">
                                                                {cell.value}%
                                                            </p>
                                                        );
                                                    }else if (cell.column.Header === "DEPOSIT") {
                                                        data = (
                                                            <p className="text-sm text-yellow-400 w-[7rem] pr-4">
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
                                                            <div className='w-[12rem] pr-4'>
                                                                {cell.value && <ImageModal src={cell.value}></ImageModal>}
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
                                                                    setIdAccGameDetail(cell.value);
                                                                    openImageModel();
                                                                }}>
                                                                    <ArrowUpTrayIcon className='h-[25px] w-[25px] text-blue-600'></ArrowUpTrayIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    setIdAccGameDetail(cell.value);
                                                                    openModal();
                                                                    
                                                                }}>
                                                                    <PencilSquareIcon className='h-[25px] w-[25px] text-green-500'></PencilSquareIcon>
                                                                </Button>

                                                                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                                                    event.preventDefault();
                                                                    setIdAccGameDetail(cell.value);
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
                        EventClickSwitchPage={getAllAccGameDetailByPageNumber} 
                        totalCount={metaData.totalCount}>                    
                    </DefaultPagination>
                </footer>
            </Card>
        </>
    )
}

export default AccGameDetail