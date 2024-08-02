import ChangePassword from "@/app/(main)/recharge/change-password/page"
import http from "./http"
import { ChangePasswordDto } from "./DataDomain/Account/ChangePasswordDto"

export const accountInformationApiRequest = {
    getAccountInformation:(id?:string)=>
        http.get<ApiReponse<AccountInformationDto>>(`/Account/GetAccountInformation/${id}`, true),

    changePassword:(input:{id?:string, body:ChangePasswordDto})=>
        http.put<ApiReponse<boolean>>(`/Account/ChangePassword/${input.id}`, true, input.body)
}