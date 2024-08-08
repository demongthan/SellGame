import envConfig from "@/config";
import http from "./http";
import { CategoryDto } from "./DataDomain/Category/CategoryDto";
import { CategorySearchDto } from "./DataDomain/Category/CategorySearchDto";
import { CreateCategoryDto } from "./DataDomain/Category/CreateCategoryDto";
import { CategoryType } from "@/utils/types/CategoryType";

export const categoryApiRequest = {
    createCategory:(body:CreateCategoryDto)=>
        http.post<ApiReponse<boolean>>(`/Category/CreateCategory`, false, body),

    updateCategory:(input:{id:string, body:UpdateCategoryDto})=>
        http.put<ApiReponse<boolean>>(`/Category/UpdateCategory/${input.id}`, false, input.body),

    getAllCategoryByType:(type:CategoryType)=>
        http.get<ApiReponse<CategoryDto[]>>(`/Category/GetAllCategoryByType/${type}?Fields=Id%2C%20Name%2C%20TotalSale%2C%20Rating%2C%20PathUrl`, false),

    getCategoryById:(input:{id:string | null, fields: string})=>
        http.get<ApiReponse<CategoryDto>>(`/Category/GetCategoryById/${input.id}${input.fields}`, false),

    uploadImageCategory:(input:{id:string | null, body: FormData})=>
        http.put<ApiReponse<boolean>>(`/Category/UpdateUrlCategory/${input.id}`, false, input.body),

    deleteCategory:(id:string | null)=>
        http.delete<ApiReponse<boolean>>(`/Category/DeleteCategory/${id}`, false),

    getAllCategory:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<CategorySearchDto>>(`/Category/GetAllCategory?Fields=Id%2CCode%2CName%2CType%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false)
}