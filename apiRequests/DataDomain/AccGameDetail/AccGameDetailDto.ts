import { AccGameDetailStatus } from "@/utils/constant/AccGameDetailStatus"

export interface AccGameDetailDto{
    Id:string,
    Code:string,
    Status:AccGameDetailStatus,
    Description?: string,
    Price:number,
    Discount:number,
    Deposit:number,
    Active:boolean,
    PathUrl:string,
    Properties:string,
    ReturnProperties?:string,
    CreatedDateUtc:Date,
    UpdatedDateUtc:Date
}