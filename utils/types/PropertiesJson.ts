import { ItemSelect } from "./SelectItem"

export interface ValueKey{
    Id:string,
    Name:string,
    Status:number
}

export interface PropertiesJson{
    Id:string,
    Status:number,
    Name:string,
    IsOnly:boolean,
    Value:ValueKey[]
}

export interface PropertiesItemJson{
    Name:string,
    Value:string
}

export interface ServiceDetailProperties{
    Key:string,
    Name:string,
    MaxValue?:number,
    MinValue?:number,
    SelectPrice?:ItemSelect[],
    Coefficient?:number,
    TitleCoefficient?:ValueKey[],
    SelectCoefficient?:ValueKey[],
}

export interface ServiceDetailPrice{
    Price?:number,
    Coefficient?:number,
    SelectPrice?:ItemSelect,
    SelectCoefficient?:ValueKey,
    TitleCoefficient?:ValueKey,
}