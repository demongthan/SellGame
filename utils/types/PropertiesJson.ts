import { ModeAction } from "./ModeAction"
import { ItemSelect } from "./SelectItem"

export interface ValueKey{
    Id:string,
    Name:string,
    Status:ModeAction
}

export interface PropertiesJson{
    Id:string,
    Status:ModeAction,
    Name:string,
    IsOnly:boolean,
    Value:ValueKey[]
}

export interface ValueItemKey{
    Id:string,
    Status:ModeAction,
    IdValue:string,
    Value:string
}

export interface PropertiesItemJson{
    Id:string
    IdName:string,
    Name:string,
    Value:ValueItemKey[],
    Status:ModeAction,
    IsShow:boolean,
    Description?:string
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