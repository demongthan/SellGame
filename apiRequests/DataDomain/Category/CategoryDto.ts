import { CategoryType } from "@/utils/types/CategoryType";

export interface CategoryDto{
    Id:string,
    Code:string,
    Name:string,
    Type:CategoryType,
    Description:string,
    Total:number,
    TotalSale:number,
    Rating:number,
    Active:boolean,
    PathUrl:string,
    Properties:string,
    CreatedDateUtc:Date,
    UpdatedDateUtc:Date
}