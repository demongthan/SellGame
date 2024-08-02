"use client"

import { Card } from '@/components'
import { adminMemberTable } from '@/utils/constant/TitleTable/AdminMemberTable';
import { HeaderItem } from '@/utils/constant/TitleTable/types';

import React, { useMemo, useState } from 'react'
import {useGlobalFilter,usePagination,useSortBy,useTable,} from "react-table";

const Member = () => {
    const [columnsData]=useState<HeaderItem[]>(adminMemberTable);
    const [tableData, setTableData]=useState<any[]>([
        {
          "name": "Marketplace",
          "quantity": 2458,
          "date": "12.Jan.2021",
          "progress": 75.5
        },
        {
          "name": "Venus DB PRO",
          "quantity": 1485,
          "date": "21.Feb.2021",
          "progress": 35.4
        },
        {
          "name": "Venus DS",
          "quantity": 1024,
          "date": "13.Mar.2021",
          "progress": 25
        },
        {
          "name": "Venus 3D Asset",
          "quantity": 858,
          "date": "24.Jan.2021",
          "progress": 100
        },
        {
          "name": "Marketplace",
          "quantity": 258,
          "date": "Oct 24, 2022",
          "progress": 75
        }
      ]
      );

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

  return (
    <Card className={"w-full pb-10 p-4 h-full"}>
        <header className="relative flex items-center justify-between">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
            4-Columns Table
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
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
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
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {cell.value}%
                        </p>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
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

    </Card>
  )
}

export default Member