import { AccGameDetailType } from "@/utils/constant/AccGameDetail/AccGameDetailType";

export interface CreateAccGameDetailDto{
    IdCategory:string | undefined,
    Description?: string,
    Price:number,
    Discount:number,
    Deposit:number,
    Active:boolean,
    Properties?:string,
    ReturnProperties?:string,
    Type:AccGameDetailType
}