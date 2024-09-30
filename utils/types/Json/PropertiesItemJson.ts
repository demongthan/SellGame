import { ModeAction } from "../Enum/ModeAction"
import { ValueItemKey } from "./ValueItemKey"

export interface PropertiesItemJson{
    Id:string
    IdName:string,
    Name:string,
    Value:ValueItemKey[],
    Status:ModeAction,
    IsShow:boolean,
    Description?:string
}