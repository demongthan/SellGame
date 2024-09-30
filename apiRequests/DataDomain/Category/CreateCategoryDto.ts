import { CategoryType } from "@/utils/types/Enum/CategoryType";

export interface CreateCategoryDto{
    Name:string,
    Description?: string,
    Active:boolean,
    Properties?:string
}