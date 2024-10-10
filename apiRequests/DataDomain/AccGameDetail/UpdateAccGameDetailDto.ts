import { AccGameDetailType } from "@/utils/constant/AccGameDetail/AccGameDetailType";

export interface UpdateAccGameDetailDto{
    Price:number,
    Description?: string,
    DescriptionDetail?: string,
    Discount:number,
    Deposit:number,
    Active:boolean,
    Properties?:string,
    ReturnProperties?:string,
    Type:AccGameDetailType
}