export enum TransactionStatus{
    Success=1,
    Fail=2,
    Process=3
}

export interface TransactionStatusItem{
    Name:string,
    Value:TransactionStatus
}

export const transactionStatus:TransactionStatusItem[]=[
    {
        Name:"Thành công",
        Value:TransactionStatus.Success
    },
    {
        Name:"Thất bại",
        Value:TransactionStatus.Fail
    },
    {
        Name:"Đang xử lý",
        Value:TransactionStatus.Process
    }
]