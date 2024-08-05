import { CategoryType } from "../types/CategoryType"

export interface CategoryTypeSearchValue{
    Name:string,
    Value:CategoryType
}

export const categoryTypeSearch:CategoryTypeSearchValue[] = [
    {
        Name:"Trò chơi",
        Value:CategoryType.Game
    },
    {
        Name:"Dịch vụ",
        Value:CategoryType.Service
    },
    {
        Name:"Trạng thái",
        Value:CategoryType.Status
    },
    {
        Name:"Giao dịch",
        Value:CategoryType.Transaction
    }
]