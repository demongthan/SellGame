import envConfig from "@/config";
import http from "./http";
import { PayAccGameInitDto } from "./DataDomain/AccGameDetail/PayAccGameInitDto";

export const accGameDetailApiRequest={
    getAllAccGameDetailForAdminInit:()=>
        http.get<ApiReponse<AccGameDetailAdminInit>>(`/AccGameDetail/GetAllAccGameDetailForAdminInit?PageNumber=1&Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`),

    getAllAccGamesDetailInit:(idCategory:string | undefined)=>
        http.get<ApiReponse<AccGameDetailInitDto>>(
            `/AccGameDetail/GetAllAccGameDetailInit/${idCategory}
            ?Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CPathUrl%2CProperties&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`),

    createAccGameDetail:(body:CreateAccGameDetailDto)=>
        http.post<ApiReponse<boolean>>(`/AccGameDetail/CreateAccGameDetail`, body),

    uploadImageForAccGameDetail:(input:{id:string | null, body: FormData})=>
        http.put<ApiReponse<boolean>>(`/AccGameDetail/UpdateUrlAccGameDetail/${input.id}`, input.body),

    updateAccGameDetail:(input:{id:string | null, body:UpdateAccGameDetailDto})=>
        http.put<ApiReponse<boolean>>(`/AccGameDetail/UpdateAccGameDetail/${input.id}`, input.body),

    getAccGameDetailById:(input:{id:string | null, fields: string})=>
        http.get<ApiReponse<AccGameDetailDto>>(`/AccGameDetail/GetAccGameDetailById/${input.id}${input.fields}`),

    deleteAccGameDetail:(id:string | null)=>
        http.delete<ApiReponse<boolean>>(`/AccGameDetail/DeleteAccGameDetail/${id}`),

    getPayAccGameInit:(input:{id:string | undefined, fields: string})=>
        http.get<ApiReponse<PayAccGameInitDto>>(`/AccGameDetail/GetPayAccGameInit/${input.id}${input.fields}`),

    getAllAccGamesDetail:(input:{idCategory:string | undefined, search:string, pageNumber:number, fields:string})=>
        http.get<ApiReponse<AccGameDetailSearchDto>>(
            `/AccGameDetail/GetAllAccGameDetail/${input.idCategory}?Active=true&Fields=${input.fields}&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`)
}