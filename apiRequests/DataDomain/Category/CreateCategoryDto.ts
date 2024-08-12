import { CategoryType } from "@/utils/types/CategoryType";

export interface CreateCategoryDto{
    Name:string,
    Code:string,
    Description?: string,
    Active:boolean,
    Properties?:string
}