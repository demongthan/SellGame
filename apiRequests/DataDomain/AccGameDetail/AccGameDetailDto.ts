import { AccGameDetailStatus } from "@/utils/constant/AccGameDetail/AccGameDetailStatus"
import { AccGameDetailType } from "@/utils/constant/AccGameDetail/AccGameDetailType"

export interface AccGameDetailDto{
    Id:string,
    Code:string,
    Status:AccGameDetailStatus,
    Type:AccGameDetailType,
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