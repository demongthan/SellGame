import { MethodCalculate } from "../types/Enum/MethodCalculate";

export interface MethodCalculateSelectValue{
    Name:string,
    Value:MethodCalculate
}

export const methodCalculateSelects:MethodCalculateSelectValue[]=[
    {
        Name:"Nhập",
        Value:MethodCalculate.Input
    },
    {
        Name:"Nhập|Hệ số",
        Value:MethodCalculate.InputCoefficient
    },
    {
        Name:"Nhập|Chọn hệ số",
        Value:MethodCalculate.InputSelectCoefficient
    },
    {
        Name:"Chọn",
        Value:MethodCalculate.Select
    }
 
]