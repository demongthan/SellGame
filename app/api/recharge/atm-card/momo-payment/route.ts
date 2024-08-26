import axios from "axios";
import { NextResponse } from "next/server";
import envConfig from "@/config";
import { CreateTransactionHistoryBankingDto } from "@/apiRequests/DataDomain/TransactionHistoryBanking/CreateTransactionHistoryBankingDto";
import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";
import { TransactionBankingType } from "@/utils/constant/Transaction/TransactionBankingType";
import { convertStringToDate } from "@/utils/utils";

export const POST=async (request: any)=> {
    const { amount, code, bankCodeName, bankSubAccId, bankName } = await request.json();

    try{
        const response = await axios.get(`${envConfig.NEXT_PUBLIC_WEB2M_MOMO_URL}/${envConfig.NEXT_PUBLIC_WEB2M_MOMO_TOKEN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status==200){
            const records:any=response.data.momoMsg.tranList;
            const index:number=response.data.momoMsg.tranList.findIndex((_:any)=>_.amount==amount && _.comment.includes(code));

            if(index>-1){
                const record:any=records[index];

                const dataReturn:CreateTransactionHistoryBankingDto={
                    Code: code,
                    Status: TransactionStatus.Success,
                    Type: TransactionBankingType.ATM,
                    Amount: amount,
                    BankCodeName: bankCodeName,
                    BankName:bankName,
                    BankSubAccId: bankSubAccId,
                    WhenTransaction: new Date(),
                    TransactionID:record.ID,
                    FromBankCodeName:record.partnerCode,
                    FromBankName:record.partnerName,
                    FromBankSubAccId:record.partnerId
                }
                return NextResponse.json(
                    {isSuccess:true, data:dataReturn, data1:records[index], index, data2:records}
                )
            }
            else{
                return NextResponse.json(
                    {isSuccess:false, data1:records, data2:response.data, amount, code, index}
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