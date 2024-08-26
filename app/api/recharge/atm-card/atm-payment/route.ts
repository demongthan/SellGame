import axios from "axios";
import moment from "moment";
import { NextResponse } from "next/server";
import envConfig from "@/config";
import { CreateTransactionHistoryBankingDto } from "@/apiRequests/DataDomain/TransactionHistoryBanking/CreateTransactionHistoryBankingDto";
import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";
import { TransactionBankingType } from "@/utils/constant/Transaction/TransactionBankingType";

export const POST=async (request: any)=> {
    const { amount, code, bankCodeName, bankSubAccId } = await request.json();
    const date = moment(new Date()).format('YYYY-MM-DD');

    try{
        const response = await axios.get(`https://oauth.casso.vn/v2/transactions?sort=DESC&fromDate=${date}`, {
            headers: {
                'Authorization': `Apikey ${envConfig.NEXT_PUBLIC_CASSO_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if(response.status==200){
            const records:any=response.data.transactions;
            const index:number=records.findIndex((_:any)=>_.amount==amount && _.description.includes(code));

            if(index>-1){
                const record:any=records[index];

                const dataReturn:CreateTransactionHistoryBankingDto={
                    Code: code,
                    Status: TransactionStatus.Success,
                    Type: TransactionBankingType.ATM,
                    Amount: amount,
                    BankCodeName: bankCodeName,
                    BankSubAccId: bankSubAccId,
                    WhenTransaction: record.transactionDate,
                    TransactionID:record.transactionID
                }
                return NextResponse.json(
                    {isSuccess:true, data:dataReturn, data1:records[index], index, data2:records}
                )
            }
            else{
                const dataReturn:CreateTransactionHistoryBankingDto={
                    Code: code,
                    Status: TransactionStatus.Fail,
                    Type: TransactionBankingType.ATM,
                    Amount: amount,
                    BankCodeName: bankCodeName,
                    BankSubAccId: bankSubAccId
                }

                const records:any=response.data.data.records;
                return NextResponse.json(
                    {isSuccess:true, data:dataReturn, data1:records[1], data2:records, index}
                )
            }
        }
        else{
            return NextResponse.json(
                {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
            )
        }

    }
    catch{
        return NextResponse.json(
            {isSuccess:false, message:"Lỗi Server. Vui lòng liên hệ Quản trị viên."}
        )
    }
}