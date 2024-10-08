"use client"

import { categoryApiRequest } from '@/apiRequests/category';
import { CategoryDto } from '@/apiRequests/DataDomain/Category/CategoryDto';
import { AdminContextProps, useAdminState } from '@/AppProvider/AdminProvider';
import { ButtonAddItemUI, 
  ButtonSearchUI, 
  Card, 
  CategoryModalUI, 
  CheckboxUI, 
  DefaultPagination, 
  DeleteWarningModalUI, 
  InputUI, LoadingUI, 
  RatingDisplay, 
  UploadImageModalUI 
} from '@/components'
import { adminCategoryTable } from '@/utils/constant/TitleTable/AdminCategoryTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';
import { showToast } from '@/utils/showToast';
import { AdminDisplay } from '@/utils/types/Auth/AdminDisplay';
import { displayDateTime, isNullOrEmpty, truncateString } from '@/utils/utils';
import { DecodedToken } from '@/utils/types/Auth/DecodedToken';

import { Button } from '@headlessui/react';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import Image from 'next/image'
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";
import jwt from 'jsonwebtoken';

const Category = () => {
  const [columnsData]=useState<HeaderItem[]>(adminCategoryTable);
  const [tableData, setTableData]=useState<CategoryDto[]>([]);
  const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const [isOpenImageModel, setIsOpenImageModel] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const [name, setName]=useState<string>('');
  const [code, setCode]=useState<string>('');
  const [active, setActive] = useState<boolean>(true);

  const {adminDisplay, setAdmin}=useAdminState() as AdminContextProps;
  
  const [searchConditions, setSearchConditions]=useState<string[]>([]);
  const [idCategory, setIdCategory] = useState<string>('');

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

  const openImageModel=()=>
    setIsOpenImageModel(!isOpenImageModel);

  const openDeleteModal=()=>
    setIsOpenDeleteModal(!isOpenDeleteModal);

  const openModalCreate=()=>{
    setIdCategory('');
    openModel();
  }

  const getAllCategoryTotal=async():Promise<void>=>{
    try{
      setSearchConditions([]);
      setActive(true);
      setCode("");
      setName("");

      await categoryApiRequest.getAllCategory({
        search:'', 
        fields:"?Fields=Id%2CCode%2CName%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc", 
        pageNumber:1,
        token:adminDisplay?.token
      }).then((res)=>{
        setTableData(res.payload.data.categories);
        setMetaData(res.payload.data.metaData);
        setIsLoading(false);
      })
    }
    catch(error){
      console.log(error);
      setIsLoading(false);
    }
  }

  const getAllCategoryByPageNumber=async (pageNumber:number):Promise<void>=>{
    setIsLoading(false);

    try{
      await categoryApiRequest.getAllCategory({
        search:searchConditions.join('&'), 
        fields:"?Fields=Id%2CCode%2CName%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc", 
        pageNumber:pageNumber,
        token:adminDisplay?.token
      }).then((res)=>{
        setTableData(res.payload.data.categories);
        setMetaData(res.payload.data.metaData);
        setIsLoading(false);
      })
    }
    catch(error){
      console.log(error);
      setIsLoading(false);
    }
  }

  const refreshAllCategory=async ():Promise<void>=>{
    try{
      await categoryApiRequest.getAllCategory({
        search:searchConditions.join('&'), 
        fields:"?Fields=Id%2CCode%2CName%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc", 
        pageNumber:metaData.currentPage,
        token:adminDisplay?.token
      }).then((res)=>{
        setTableData(res.payload.data.categories);
        setMetaData(res.payload.data.metaData);
        setIsLoading(false);
      })
    }
    catch(error){
      console.log(error);
      setIsLoading(false);
    }
  } 

  const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true);

    try{
      const formData = new FormData(event.currentTarget);
      let searches:string[]=[];

      if(!isNullOrEmpty(name)){
        searches.push("Name="+name);
      }

      searches.push(active?"Active=true":"Active=false");

      if(!isNullOrEmpty(code)){
        searches.push("Code="+code);
      }

      setSearchConditions(searches);

      await categoryApiRequest.getAllCategory({
        search:searches.join('&'), 
        fields:"?Fields=Id%2CCode%2CName%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc", 
        pageNumber:1,
        token:adminDisplay?.token
      }).then((res)=>{
        setTableData(res.payload.data.categories);
        setMetaData(res.payload.data.metaData);
        setIsLoading(false);
      })
    }
    catch(error){
      console.log(error);
      setIsLoading(false);
    }
  }

  const deleteCategory=async ():Promise<void> => {
    setIsLoading(true);

    try{
      await categoryApiRequest.deleteCategory({id:idCategory, token:adminDisplay?.token}).then((res)=>{
        if(res.payload.data){
          showToast("success", <p>{res.payload.message}</p>)
          openDeleteModal()
          refreshAllCategory();
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

  const handleChange = (name:string) => (e: any) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "code":
        setCode(e.target.value);
        break;
      case "active":
        setActive(e.target.isChecked);
        break;
      default:
        break;
    }
  }

  const getAllCategoryInit=async (): Promise<void> => {
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
        await categoryApiRequest.getAllCategory({
          search:'', 
          fields:"?Fields=Id%2CCode%2CName%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc", 
          pageNumber:1, 
          token:admin.token
        }).then((res)=>{
          setTableData(res.payload.data.categories);
          setMetaData(res.payload.data.metaData);
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

  useEffect(()=>{
    getAllCategoryInit();
  }, [setTableData])
    
  return (
    <>
      {isOpenDeleteModal && (<DeleteWarningModalUI closeModal={openDeleteModal} title={'Xóa danh mục'} eventDeleteItem={deleteCategory} 
      description={'Bạn có chắc chắn xóa Danh mục.'} isDelete={true}></DeleteWarningModalUI>)}

      {isOpenImageModel && (<UploadImageModalUI closeModel={openImageModel} idCategory={idCategory} 
      refreshAllCategoryUpdate={refreshAllCategory} adminDisplay={adminDisplay}></UploadImageModalUI>)}

      {isOpenModel && (<CategoryModalUI refreshAllCategoryCreate={getAllCategoryTotal} closeModel={openModel} idCategory={idCategory} 
      refreshAllCategoryUpdate={refreshAllCategory} adminDisplay={adminDisplay} ></CategoryModalUI>)}

      <Card className={"w-full pb-6 p-4 h-full"}>
          <header className="relative">
              <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                <div className='flex flex-row w-full gap-10'>
                  <InputUI value={name} name='Name' isBlockLabel={false} label={"Danh mục :"} 
                  classDiv={"w-[28%]"} classInput={"w-[70%]"} classLabel={"w-[30%]"} onChangeEvent={handleChange("name")}></InputUI>

                  <InputUI value={code} name='Code' isBlockLabel={false} onChangeEvent={handleChange("code")}
                  label={"Mã số :"} classDiv={"w-[28%]"} classInput={"w-[70%]"} classLabel={"w-[30%]"}></InputUI>

                  <CheckboxUI name='Active' isChecked={active} isBlockLabel={false} onChangeEvent={handleChange("active")}
                  label={"Hiệu lực :"} classDiv={"w-[16%]"} classLabel={"w-2/5"}></CheckboxUI>
                </div>

                <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllCategoryTotal}></ButtonSearchUI>
              </form>
          </header>

          {isLoading?(<div className='mt-8 h-[58vh]'><LoadingUI></LoadingUI></div>):(
            <>
              <div className='flex justify-end'>
                <ButtonAddItemUI titleButton={'Thêm danh mục'} eventButtonClicked={openModalCreate} ></ButtonAddItemUI>
              </div>
              <div className="mt-4 w-full h-[56vh] overflow-auto">
                <table {...getTableProps()} className="w-[107rem]">
                  <thead className='sticky top-0 z-10 bg-white shadow-custom'>
                    {headerGroups.map((headerGroup:any, index:any) => (
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
                    {page.map((row:any, index:any) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={index}>
                          {row.cells.map((cell:any, index:any) => {
                            let data;
                            if (cell.column.Header === "NAME") {
                              data = (
                                <p className="text-sm text-slate-950 pr-4 w-[12rem] font-semibold">
                                  {cell.value}
                                </p>
                              );
                            } else if (cell.column.Header === "CODE") {
                              data = (
                                <p className="text-sm text-blue-600 w-[10rem] pr-4">
                                  {cell.value}
                                </p>
                              );
                            } else if (cell.column.Header === "DESCRIPTION") {
                              data = (
                                <p className="text-sm text-navy-700 w-[25rem] pr-4">
                                  {cell.value?truncateString(cell.value, 200):""}
                                </p>
                              );
                            }
                            else if (cell.column.Header === "TOTAL") {
                              data = (
                                <p className="text-sm text-green-700 w-[7rem] pr-4 font-semibold">
                                  {cell.value}
                                </p>
                              );
                            }
                            else if (cell.column.Header === "TOTALSALE") {
                              data = (
                                <p className="text-sm text-red-600 w-[11rem] pr-4 font-semibold">
                                  {cell.value}
                                </p>
                              );
                            }
                            else if (cell.column.Header === "RATING") {
                              data = (
                                <RatingDisplay rating={cell.value} className={"w-[8rem]"}></RatingDisplay>
                              );
                            }
                            else if (cell.column.Header === "ACTIVE") {
                              data = (
                                <p className="text-sm text-navy-700 w-[7rem] flex justify-center items-center">
                                  <CheckboxUI disabled={true} isChecked={cell.value}></CheckboxUI>
                                </p>
                              );
                            }
                            else if (cell.column.Header === "PATHURL") {
                              data = (
                                <div className='w-[12rem] pr-4'>
                                  {cell.value && <Image alt='' src={cell.value} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>}
                                </div>
                              );
                            }
                            else if (cell.column.Header === "CREATEDDATEUTC") {
                              data = (
                                <p className="text-sm text-navy-700 w-[10rem]">
                                  {displayDateTime(cell.value)}
                                </p>
                              );
                            }
                            else if (cell.column.Header === "UPDATEDDATEUTC") {
                              data = (
                                <p className="text-sm text-navy-700 w-[10rem]">
                                  {displayDateTime(cell.value)}
                                </p>
                              );
                            }
                            else if (cell.column.Header === "ACTION") {
                              data = (
                                <div className='flex flex-row w-[7rem] gap-3'>
                                  <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                      event.preventDefault();                                       
                                      setIdCategory(cell.value);
                                      openImageModel();
                                    }}>
                                    <ArrowUpTrayIcon className='h-[25px] w-[25px] text-blue-600'></ArrowUpTrayIcon>
                                  </Button>

                                  <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                      event.preventDefault();
                                      setIdCategory(cell.value);
                                      openModel();
                                    }}>
                                    <PencilSquareIcon className='h-[25px] w-[25px] text-green-500'></PencilSquareIcon>
                                  </Button>

                                  <Button onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                      event.preventDefault();
                                      setIdCategory(cell.value);
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

          
          
          <footer className='pt-5'>
            <DefaultPagination 
              currentPage={metaData.currentPage}
              totalPages={metaData.totalPages}
              hasPrevious={metaData.hasPrevious}
              hasNext={metaData.hasNext}
              EventClickSwitchPage={getAllCategoryByPageNumber} 
              totalCount={metaData.totalCount}>
            </DefaultPagination>
          </footer>
          
      </Card>
    </>
    
  )
}

export default Category