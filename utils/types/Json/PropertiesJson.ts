import { ModeAction } from "../Enum/ModeAction"
import { ValueKey } from "./ValueKey"

export interface PropertiesJson{
    Id:string,
    Status:ModeAction,
    Name:string,
    IsOnly:boolean,
    IsSearch:boolean,
    Value:ValueKey[]
}