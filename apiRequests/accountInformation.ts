import http from "./http"

export const accountInformationApiRequest = {
    getAccountInformation:(id?:string)=>
        http.get<ApiReponse<AccountInformationDto>>(`/Account/GetAccountInformation/${id}`, true)
}