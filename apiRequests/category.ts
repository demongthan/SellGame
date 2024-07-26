import http from "./http";

export const categoryApiRequest = {
    getGame:(type:number)=>
        http.get<ApiReponse<CategoryDto[]>>(`/Category/GetAllCategory?Fields=Id%2C%20Name%2C%20TotalSale%2C%20Rating%2C%20PathUrl&CategoryType=${type}&Active=true`, false),

    getCategoryPropertiesById:(id:string | null)=>
        http.get<ApiReponse<CategoryDto>>(`/Category/GetCategoryById/${id}?fileds=Properties`, false),
}