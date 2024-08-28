export interface PriceSearchValue{
    Name:string,
    MaxValue?:number,
    MinValue?:number
}

export const priceSearch:PriceSearchValue[]=[
    {
        Name:"Dưới 50K",
        MaxValue:50000,
    },
    {
        Name:"Từ 50K - 200K",
        MaxValue:200000,
        MinValue:50000
    },
    {
        Name:"Từ 200K - 500K",
        MaxValue:500000,
        MinValue:200000
    },
    {
        Name:"Từ 500K - 1 Triệu",
        MaxValue:1000000,
        MinValue:500000
    },
    {
        Name:"Trên 1 Triệu",
        MinValue:1000000
    },
    {
        Name:"Trên 5 Triệu",
        MinValue:5000000
    },
    {
        Name:"Trên 10 Triệu",
        MinValue:10000000
    }

]