export enum TransactionType{
    Account=1,
    Service=2,
    Card=3,
    ATM=4,
    BuyCard=5,
    Deposit=6
}

export interface TransactionTypeItem{
    Name:string,
    Value:TransactionType
}

export const transactionType:TransactionTypeItem[]=[
    {
        Name:"Nạp thẻ tự động",
        Value:TransactionType.Card
    },
    {
        Name:"Nạp tiền từ ATM",
        Value:TransactionType.ATM
    },
    {
        Name:"Mua tài khoản",
        Value:TransactionType.Account
    },
    {
        Name:"Mua dịch vụ",
        Value:TransactionType.Service
    },
    {
        Name:"Mua thẻ cào",
        Value:TransactionType.BuyCard
    },
    {
        Name:"Đặt cọc",
        Value:TransactionType.Deposit
    }
]