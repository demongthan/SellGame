import { TransactionStatus } from "@/utils/constant/Transaction/TransactionStatus";

export interface CreateTransactionHistoryCardDto{
    Code:string,
    Status:TransactionStatus,
    DeclaredValue:number,
    Amount:number,
    Telco:string,
    CodeCard:string,
    SerialNumber:string,
    SecurityCode:string
}