import envConfig from "@/config";
import http from "./http";
import { PayAccGameInitDto } from "./DataDomain/AccGameDetail/PayAccGameInitDto";

export const accGameDetailApiRequest={
    getAllAccGameDetailForAdminInit:(token?:string)=>
        http.get<ApiReponse<AccGameDetailAdminInit>>(`/AccGameDetail/GetAllAccGameDetailForAdminInit?PageNumber=1&Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`, token),

    getAllAccGamesDetailInit:(idCategory:string | undefined)=>
        http.get<ApiReponse<AccGameDetailInitDto>>(
            `/AccGameDetail/GetAllAccGameDetailInit/${idCategory}
            ?Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CPathUrl%2CProperties&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`),

    createAccGameDetail:(input:{body:CreateAccGameDetailDto, token?:string})=>
        http.post<ApiReponse<boolean>>(`/AccGameDetail/CreateAccGameDetail`, input.body, input.token),

    uploadImageForAccGameDetail:(input:{id:string | null, body: FormData, token?:string})=>
        http.put<ApiReponse<boolean>>(`/AccGameDetail/UpdateUrlAccGameDetail/${input.id}`, input.body, input.token),

    updateAccGameDetail:(input:{id:string | null, body:UpdateAccGameDetailDto, token?:string})=>
        http.put<ApiReponse<boolean>>(`/AccGameDetail/UpdateAccGameDetail/${input.id}`, input.body, input.token),

    getAccGameDetailById:(input:{id:string | null, fields: string, token?:string})=>
        http.get<ApiReponse<AccGameDetailDto>>(`/AccGameDetail/GetAccGameDetailById/${input.id}${input.fields}`, input.token),

    deleteAccGameDetail:(input:{id:string | null, token?:string})=>
        http.delete<ApiReponse<boolean>>(`/AccGameDetail/DeleteAccGameDetail/${input.id}`, input.token),

    getPayAccGameInit:(input:{id:string | undefined, fields: string})=>
        http.get<ApiReponse<PayAccGameInitDto>>(`/AccGameDetail/GetPayAccGameInit/${input.id}${input.fields}`),

    getAllAccGamesDetail:(input:{idCategory:string | undefined, search:string, pageNumber:number, fields:string})=>
        http.get<ApiReponse<AccGameDetailSearchDto>>(
            `/AccGameDetail/GetAllAccGameDetail/${input.idCategory}?Active=true&${input.fields}&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`)
}