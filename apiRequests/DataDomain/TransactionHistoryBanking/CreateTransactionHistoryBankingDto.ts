import { TransactionBankingType } from "@/utils/constant/Transaction/TransactionBankingType";
import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";

export interface CreateTransactionHistoryBankingDto{
    Code:string,
    Status:TransactionStatus,
    Type:TransactionBankingType,
    Amount:number,
    BankCodeName:string,
    BankSubAccId:string,
    WhenTransaction:string,
    CorresponsiveName:string,
    CorresponsiveAccount:string,
    CorresponsiveBankId:string,
    CorresponsiveBankName:string,
    CorresponsiveId:string,
}