import { ItemSelect } from "../SelectItem";
import { ValueKey } from "./ValueKey";

export interface ServiceDetailPrice{
    Price?:number,
    Coefficient?:number,
    SelectPrice?:ItemSelect,
    SelectCoefficient?:ValueKey,
    TitleCoefficient?:ValueKey,
}