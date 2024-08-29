export enum AccGameDetailStatus{
    Free=1,
    Sold=2,
    Deposit=3
}

export interface AccGameDetailStatusItem{
    Name:string,
    Value:AccGameDetailStatus
}

export const accGameDetailStatus:AccGameDetailStatusItem[]=[
    {
        Name:"Chưa bán",
        Value:AccGameDetailStatus.Free
    },
    {
        Name:"Đã bán",
        Value:AccGameDetailStatus.Sold
    },
    {
        Name:"Đã đặt cọc",
        Value:AccGameDetailStatus.Deposit
    }
]