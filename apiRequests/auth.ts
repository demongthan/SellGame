import http from "./http";

export const authApiRequest = {
    register: (body: RegisterDto) => 
        http.post<ApiReponse<LoginModelDto>>('/Authentication/register', body),

    login: (body: AccountSignInDto) =>
        http.post<ApiReponse<LoginModelDto>>('/Authentication/login', body),

    logout:(userName:string |undefined)=>
        http.put<ApiReponse<string>>(`/Authentication/revoke/${userName}`, {})
}