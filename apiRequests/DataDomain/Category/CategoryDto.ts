import { CategoryType } from "@/utils/types/Enum/CategoryType";

export interface CategoryDto{
    Id:string,
    Code:string,
    Name:string,
    Description?:string,
    Total:number,
    TotalSale:number,
    Rating:number,
    Active:boolean,
    PathUrl:string,
    Properties:string,
    CreatedDateUtc:Date,
    UpdatedDateUtc:Date
}