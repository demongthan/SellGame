import http from "./http";

export const categoryApiRequest = {
    getGame:(type:number)=>
        http.get<ApiReponse<CategoryDto[]>>(`/Category/GetAllCategory?Fields=Name%2C%20TotalSale%2C%20Rating%2C%20PathUrl&CategoryType=${type}&Active=true`),
}