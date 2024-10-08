import http from "./http"
import { ChangePasswordDto } from "./DataDomain/Account/ChangePasswordDto"
import envConfig from "@/config"

export const accountInformationApiRequest = {
    getAccountInformation:(input:{id?:string, fields:string, token?:string})=>
        http.get<ApiReponse<AccountInformationDto>>(`/Account/GetAccountInformation/${input.id}${input.fields}`, input.token),

    changePassword:(input:{id?:string, body:ChangePasswordDto})=>
        http.put<ApiReponse<boolean>>(`/Account/ChangePassword/${input.id}`, input.body),

    getAllAccountInformation:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<AccountInformationSearchDto>>(`/Account/GetAllAccountInformation?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}&${input.search}`)
}