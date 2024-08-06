import envConfig from "@/config";
import http from "./http";

export const accGameDetailApiRequest={
    getAllAccGameDetailForAdminInit:()=>
        http.get<ApiReponse<AccGameDetailAdminInit>>(`/AccGameDetail/GetAllAccGameDetailForAdminInit?PageNumber=1&Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CDeposit%2CPathUrl%2CActive%2CCreatedDateUtc%2CUpdatedDateUtc&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`, false),

    getAllAccGamesDetailInit:(idCategory:string | undefined)=>
        http.get<ApiReponse<AccGameDetailInitDto>>(
            `/AccGameDetail/GetAllAccGameDetailInit/${idCategory}
            ?Active=true&Fields=Id%2CCode%2CPrice%2CDiscount%2CPathUrl%2CProperties&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`, false),

    getAllAccGamesDetail:(input:{idCategory:string | undefined, search:string, pageNumber:number, fields:string})=>
        http.get<ApiReponse<AccGameDetailSearchDto>>(
            `/AccGameDetail/GetAllAccGameDetail/${input.idCategory}?Active=true&Fields=${input.fields}&PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`, false)
}