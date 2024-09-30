export interface OrderSearchValue{
    Name:string,
    Value:string
}

export const orderSearch:OrderSearchValue[] = [
    {
        Name:"",
        Value:""
    },
    {
        Name:"Giá tiền từ cao đến thấp",
        Value:"Price desc"
    },
    {
        Name:"Giá tiền từ thấp đến cao",
        Value:"Price asc"
    },
    {
        Name:"Mới nhất",
        Value:"CreatedDateUtc desc"
    },
    {
        Name:"Cũ nhất",
        Value:"CreatedDateUtc asc"
    }
]