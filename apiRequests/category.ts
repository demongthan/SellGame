import envConfig from "@/config";
import http from "./http";
import { CategoryDto } from "./DataDomain/Category/CategoryDto";
import { CategorySearchDto } from "./DataDomain/Category/CategorySearchDto";
import { CreateCategoryDto } from "./DataDomain/Category/CreateCategoryDto";

export const categoryApiRequest = {
    createCategory:(body:CreateCategoryDto)=>
        http.post<ApiReponse<boolean>>(`/Category/CreateCategory`, false, body),

    updateCategory:(input:{id:string, body:UpdateCategoryDto})=>
        http.put<ApiReponse<boolean>>(`/Category/UpdateCategory/${input.id}`, false, input.body),

    getGame:(type:number)=>
        http.get<ApiReponse<CategoryDto[]>>(`/Category/GetAllCategory?Fields=Id%2C%20Name%2C%20TotalSale%2C%20Rating%2C%20PathUrl&CategoryType=${type}&Active=true`, false),

    getCategoryById:(id:string | null)=>
        http.get<ApiReponse<CategoryDto>>(`/Category/GetCategoryById/${id}?fileds=Name%2CDescription%2CActive%2CProperties`, false),

    getAllCategory:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<CategorySearchDto>>(`/Category/GetAllCategory?Fields=Id%2CCode%2CName%2CType%2CDescription%2CTotal%2CTotalSale%2CRating%2CActive%2CPathUrl%2CCreatedDateUtc%2CUpdatedDateUtc&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false)
}