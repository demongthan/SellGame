import http from "./http"
import { ChangePasswordDto } from "./DataDomain/Account/ChangePasswordDto"
import envConfig from "@/config"

export const accountInformationApiRequest = {
    getAccountInformation:(id?:string)=>
        http.get<ApiReponse<AccountInformationDto>>(`/Account/GetAccountInformation/${id}`, true),

    changePassword:(input:{id?:string, body:ChangePasswordDto})=>
        http.put<ApiReponse<boolean>>(`/Account/ChangePassword/${input.id}`, true, input.body),

    getAllAccountInformation:(input:{search:string, pageNumber:number})=>
        http.get<ApiReponse<AccountInformationSearchDto>>(`/Account/GetAllAccountInformation?PageNumber=${input.pageNumber}&PageSize=${envConfig.NEXT_PUBLIC_PAGE_SIZE}`, false)
}