export enum AccGameDetailType{
    Regular=1,
    Hot=2,
    Limited=3,
    Special = 4
}

export interface AccGameDetailTypeItem{
    Name:string,
    Value:AccGameDetailType
}

export const accGameDetailType:AccGameDetailTypeItem[]=[
    {
        Name:"Thường",
        Value:AccGameDetailType.Regular
    },
    {
        Name:"Hot",
        Value:AccGameDetailType.Hot
    },
    {
        Name:"Giới hạn",
        Value:AccGameDetailType.Limited
    },
    {
        Name:"Đặc biệt",
        Value:AccGameDetailType.Special
    }
]