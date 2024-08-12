import { MethodCalculate } from "@/utils/types/MethodCalculate";

export interface CreateServiceDetailDto{
    Name:string,
    Method:MethodCalculate,
    UnitPrice:number,
    Unit:string,
    Active:boolean,
    Description:string,
    Properties:string
}