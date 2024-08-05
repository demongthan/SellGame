"use client"

import { accountInformationApiRequest } from '@/apiRequests/account-information';
import { Card, CheckboxUI, DefaultPagination } from '@/components'
import { adminMemberTable } from '@/utils/constant/TitleTable/AdminMemberTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';

import React, { useEffect, useMemo, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";

const Member = () => {
    const [columnsData]=useState<HeaderItem[]>(adminMemberTable);
    const [tableData, setTableData]=useState<AccountInformationDto[]>([]);
    const [metaData, setMetaData]=useState<MetaData>({currentPage:0, totalPages:1, pageSize:0, totalCount:0, hasNext:false, hasPrevious:false});

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

    const getAllAccountInformationSearch=async ():Promise<void> => {
    }

    const getAllAccountInformation=async ():Promise<void>=>{
      try{
        await accountInformationApiRequest.getAllAccountInformation({search:'', pageNumber:1}).then((res)=>{
          setTableData(res.payload.data.accountInformations);
          
          setMetaData(res.payload.data.metaData);
        })
      }
      catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      getAllAccountInformation();
    }, [setTableData])

  return (
    <Card className={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700">
          
        </div>
      </header>

      <div className="mt-8 h-full overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
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
                        <p className="text-sm font-bold text-navy-700 text-right">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.Header === "ACOINBALANCE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 text-right">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.Header === "PROMOTIONALBALANCE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 text-right">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.Header === "ACTIVE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          <CheckboxUI disabled={true} isChecked={cell.value}></CheckboxUI>
                        </p>
                      );
                    }
                    else if (cell.column.Header === "REGISTERDATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {cell.value}
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

      <DefaultPagination 
          currentPage={metaData.currentPage}
          totalPages={metaData.totalPages}
          hasPrevious={metaData.hasPrevious}
          hasNext={metaData.hasNext} 
          EventClickSwitchPage={function (numberPage: number): void {
        throw new Error('Function not implemented.');
      } }></DefaultPagination>

    </Card>
  )
}

export default Member