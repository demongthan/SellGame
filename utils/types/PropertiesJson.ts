import { ItemSelect } from "./SelectItem"

export interface ValueKey{
    Name:string
}

export interface PropertiesJson{
    Key:string,
    Name:string,
    Only:boolean,
    Value:ValueKey[]
}

export interface PropertiesItemJson{
    Name:string,
    Value?:string
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