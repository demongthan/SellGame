import envConfig from "@/config";
import http from "./http";
import { CategoryDto } from "./DataDomain/Category/CategoryDto";
import { CategorySearchDto } from "./DataDomain/Category/CategorySearchDto";
import { CreateCategoryDto } from "./DataDomain/Category/CreateCategoryDto";

export const categoryApiRequest = {
    createCategory:(input:{body:CreateCategoryDto, token:string|undefined})=>
        http.post<ApiReponse<boolean>>(`/Category/CreateCategory`, input.body, input.token),

    updateCategory:(input:{id:string, body:UpdateCategoryDto, token:string|undefined})=>
        http.put<ApiReponse<boolean>>(`/Category/UpdateCategory/${input.id}`, input.body, input.token),

    getAllCategoryByActive:(fields:string)=>
        http.get<ApiReponse<CategoryDto[]>>(`/Category/GetAllCategoryByActive${fields}`),

    getCategoryById:(input:{id:string | null, fields: string, token:string|undefined})=>
        http.get<ApiReponse<CategoryDto>>(`/Category/GetCategoryById/${input.id}${input.fields}`, input.token),

    uploadImageCategory:(input:{id:string | null, body: FormData, token:string|undefined})=>
        http.put<ApiReponse<boolean>>(`/Category/UpdateUrlCategory/${input.id}`, input.body, input.token),

    deleteCategory:(input:{id:string | null, token:string|undefined})=>
        http.delete<ApiReponse<boolean>>(`/Category/DeleteCategory/${input.id}`, input.token),

    getAllCategory:(input:{search:string, fields:string, pageNumber:number, token:string|undefined})=>
        http.get<ApiReponse<CategorySearchDto>>(`/Category/GetAllCategory${input.fields}&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, input.token)
}