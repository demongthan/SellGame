import { ItemSelect } from "../SelectItem";
import { ValueKey } from "./ValueKey";

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