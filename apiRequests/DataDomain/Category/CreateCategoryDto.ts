import { CategoryType } from "@/utils/types/CategoryType";

export interface CreateCategoryDto{
    Name:string,
    Description?: string,
    Active:boolean,
    Properties?:string
}