import { CategoryType } from "@/utils/types/CategoryType";

export interface CreateCategoryDto{
    Name:string,
    Code:string,
    Description?: string,
    Active:boolean,
    Type:CategoryType | undefined,
    Properties?:string
}