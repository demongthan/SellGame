import { TransactionBankingType } from "@/utils/constant/Transaction/TransactionBankingType";
import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";

export interface CreateTransactionHistoryBankingDto{
    Code:string,
    Status:TransactionStatus,
    Type:TransactionBankingType,
    Amount:number,
    BankCodeName:string,
    BankName?:string,
    BankSubAccId:string,
    WhenTransaction?:Date,
    TransactionID?:string,
    FromBankCodeName?:string,
    FromBankName?:string,
    FromBankSubAccId?:string
}