"use client"

import { accountInformationApiRequest } from '@/apiRequests/account-information';
import { ButtonSearchUI, Card, DefaultPagination, InputUI, LoadingUI } from '@/components'
import { adminMemberTable } from '@/utils/constant/TitleTable/AdminMemberTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';
import { displayDateTime, isNullOrEmpty } from '@/utils/utils';

import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";

const Member = () => {
    const [columnsData]=useState<HeaderItem[]>(adminMemberTable);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tableData, setTableData]=useState<AccountInformationDto[]>([]);
    const [searchConditions, setSearchConditions]=useState<string[]>([]);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const [userName, setUserName] =useState<string>("");

    const handleChange=(name:string) =>(e:any) => {
      switch (name) {
        case "userName":
          setUserName(e.target.value);
          break;
        default:
          break;
      }
    }

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

    const onSubmit=async(event: FormEvent<HTMLFormElement>)=> {
      event.preventDefault();
      setIsLoading(true);

      try{
        let searches:string[]=[];

        if(!isNullOrEmpty(userName)){
          searches.push("UserName="+userName);
        }

        setSearchConditions(searches);

        await accountInformationApiRequest.getAllAccountInformation({search:searches.join("&"), pageNumber:1}).then((res)=>{
          setTableData(res.payload.data.accountInformations);
          setMetaData(res.payload.data.metaData);
          setIsLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setIsLoading(false);
      }
    }

    const getAllAccountInformationByNumberPage=async (numberPage:number):Promise<void> => {
      setIsLoading(true);

      try{
        await accountInformationApiRequest.getAllAccountInformation({search:'', pageNumber:numberPage}).then((res)=>{
          setTableData(res.payload.data.accountInformations);
          setMetaData(res.payload.data.metaData);
          setIsLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setIsLoading(false);
      }
    }

    const getAllAccountInformation=async ():Promise<void> => {
      setIsLoading(true);
      setUserName("");
      setSearchConditions([]);

      try{
        await accountInformationApiRequest.getAllAccountInformation({search:'', pageNumber:1}).then((res)=>{
          setTableData(res.payload.data.accountInformations);
          setMetaData(res.payload.data.metaData);
          setIsLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setIsLoading(false);
      }
    }

    const getAllAccountInformationInit=async ():Promise<void>=>{
      try{
        await accountInformationApiRequest.getAllAccountInformation({search:'', pageNumber:1}).then((res)=>{
          setTableData(res.payload.data.accountInformations);
          setMetaData(res.payload.data.metaData);
          setIsLoading(false);
        })
      }
      catch(error){
        console.log(error);
        setIsLoading(false);
      }
    }

    useEffect(()=>{
      getAllAccountInformationInit();
    }, [setTableData, setMetaData])

  return (
    <Card className={"w-full pb-10 p-4 h-full"}>
      <header className="relative">
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
          <div className='flex flex-row w-full gap-10'>
            <InputUI value={userName} name='UserName' isBlockLabel={false} label={"Tài khoản:"} 
            classDiv={"w-1/3"} classInput={"w-[70%]"} classLabel={"w-[30%]"} onChangeEvent={handleChange("userName")}></InputUI>
          </div>

          <ButtonSearchUI classDiv={"w-1/5 h-9"} eventButtonAllClick={getAllAccountInformation}></ButtonSearchUI>
        </form>
      </header>

      {isLoading?(<div className='mt-8 h-[58vh]'><LoadingUI></LoadingUI></div>):(
        <>
          <div className="mt-8 w-full h-[58vh] overflow-x-auto">
            <table {...getTableProps()} className="w-full">
              <thead className='sticky top-0 z-10 bg-white shadow-custom'>
                {headerGroups.map((headerGroup:any, index:any) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column:any, index:any) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={index}
                        className="border-b border-gray-200 pr-14 pb-[10px] text-start"
                      >
                        <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
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
                        if (cell.column.Header === "USERNAME") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "PHONE") {
                          data = (
                            <p className="mr-[10px] text-sm font-semibold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "EMAIL") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.Header === "BALANCE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        }
                        else if (cell.column.Header === "ACOINBALANCE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        }
                        else if (cell.column.Header === "PROMOTIONALBALANCE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {cell.value}
                            </p>
                          );
                        }
                        else if (cell.column.Header === "REGISTERDATE") {
                          data = (
                            <p className="text-sm font-bold text-navy-700">
                              {displayDateTime(cell.value)}
                            </p>
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
          
          <footer className='pt-5 border-t border-gray-200'>
            <DefaultPagination 
                currentPage={metaData.currentPage}
                totalPages={metaData.totalPages}
                hasPrevious={metaData.hasPrevious}
                hasNext={metaData.hasNext} 
                EventClickSwitchPage={getAllAccountInformationByNumberPage}>
            </DefaultPagination>
          </footer>
        </>
      )}
    </Card>
  )
}

export default Member