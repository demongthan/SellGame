import { MethodCalculate } from "@/utils/types/Enum/MethodCalculate";

export interface ServiceDetailDto{
    Id:string,
    Name:string,
    Transaction:number,
    Method:MethodCalculate,
    UnitPrice:number,
    Unit:string,
    Rating:number,
    Active:boolean,
    Description:string,
    PathUrl:string,
    Properties:string,
    CreatedDateUtc:Date,
    UpdatedDateUtc:Date
}