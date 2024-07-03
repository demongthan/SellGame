"use client"

import { ButtonSearchUI, FromToDateUI, SelectUI, TableShowData, TitleRecharge } from '@/components';
import { titleTableRecharge_TransactionHistory } from '@/utils/TitleTableRecharge';
import React from 'react'

const TransactionHistory = () => {
    return (
        <div className='flex flex-col gap-10'>
            <TitleRecharge title={'Lịch sử giao dịch'}></TitleRecharge>
            
            <div className='flex flex-col gap-5 w-full'>
                <FromToDateUI startDate={null} endDate={null} label={"Từ ngày ~ Đến ngày"} isBlockLabel={true}
                classDiv={"w-[62%]"} classDateTime={"w-full"}></FromToDateUI>

                <div className='flex flex-row gap gap-5 w-full'>
                    <SelectUI value={undefined} isBlockLabel={true} label={"Giao dịch"}
                    classDiv={"w-[30%]"} classSelect={"w-full"}></SelectUI>

                    <SelectUI value={undefined} isBlockLabel={true} label={"Trạng thái"}
                    classDiv={"w-[30%]"} classSelect={"w-full"}></SelectUI>

                    <ButtonSearchUI isSearch={true} isAll={true}
                    classDiv={"w-[25%] h-[2.3rem] relative top-[2.2rem]"}></ButtonSearchUI>
                </div>
            </div>

            <TableShowData thItems={titleTableRecharge_TransactionHistory} trItems={[]}></TableShowData>
        </div>
    );
}

export default TransactionHistory