import http from "./http";

export const authApiRequest = {
    register: (body: RegisterDto) => 
        http.post<ApiReponse<LoginModelDto>>('/Authentication/Register', body),

    auth: (body: TokenCookies) => 
        http.post('/api/auth', body, {baseUrl: '' }),
}